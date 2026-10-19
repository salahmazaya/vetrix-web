"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

// Frosted glass shell: pale continents with embossed coastlines and glowing lat/long lines
const shellFragment = /* glsl */ `
  uniform sampler2D uLand;
  uniform float uBack;
  uniform vec2 uLight;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vView;

  float gridLine(float x, float step, float width) {
    float d = abs(fract(x / step + 0.5) - 0.5) * step;
    return exp(-pow(d / width, 2.0));
  }

  void main() {
    vec3 n = normalize(vNormal) * (gl_FrontFacing ? 1.0 : -1.0);
    float facing = abs(dot(n, vView));
    float fres = pow(1.0 - facing, 2.0);

    vec3 tex = texture2D(uLand, vUv).rgb;
    float land = tex.r;
    float coast = tex.g;

    // Milky glass, a touch darker toward the lower half like the artwork
    float shade = smoothstep(-0.8, 0.9, n.y);
    vec3 glass = mix(vec3(0.74, 0.81, 0.89), vec3(0.88, 0.92, 0.97), shade);
    vec3 color = mix(glass, vec3(0.96, 0.98, 1.0), land * 0.7);
    float alpha = 0.40 + land * 0.30 + fres * 0.45;

    // Coastline: a dark steel edge with a thin bright lip, like cut glass
    color = mix(color, vec3(0.32, 0.42, 0.56), coast * 0.9);
    alpha = mix(alpha, 0.95, coast * 0.9);

    // Glowing meridians (every 60 degrees) and parallels (equator and +/-35 degrees)
    float meridian = gridLine(vUv.x, 1.0 / 6.0, 0.0016);
    float lat = (vUv.y - 0.5) * 180.0;
    float parallel = exp(-pow(lat / 0.35, 2.0)) + exp(-pow((abs(lat) - 35.0) / 0.35, 2.0));
    float grid = clamp(meridian + parallel, 0.0, 1.0);
    vec3 glow = vec3(0.55, 0.86, 1.0);
    color = mix(color, glow, grid * 0.85);
    alpha = max(alpha, grid * 0.9);

    // Bright rim and a soft key light
    color = mix(color, vec3(0.92, 0.97, 1.0), fres * 0.6);
    vec3 l = normalize(vec3(uLight, 1.0));
    float spec = pow(max(dot(n, normalize(l + vView)), 0.0), 40.0);
    color += spec * 0.35;

    // The far side reads faintly through the glass
    alpha *= mix(1.0, 0.28, uBack);
    gl_FragColor = vec4(color, alpha);
  }
`;

// Blue data core with scrolling binary digits, seen through the glass
const coreFragment = /* glsl */ `
  uniform sampler2D uDigits;
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    float facing = max(dot(normalize(vNormal), vView), 0.0);
    float fres = pow(1.0 - facing, 1.6);
    vec3 color = mix(vec3(0.24, 0.44, 0.78), vec3(0.62, 0.80, 0.96), fres);
    float digits = texture2D(uDigits, vec2(vUv.x * 2.0 + uTime * 0.02, vUv.y * 1.2)).r;
    color += vec3(0.50, 0.95, 1.0) * digits * smoothstep(0.2, 0.75, facing) * 0.75;
    gl_FragColor = vec4(color, 0.92);
  }
`;

function useDigitsTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "500 20px ui-monospace, Menlo, Consolas, monospace";
    ctx.textBaseline = "top";
    // Deterministic pseudo-random values so the pattern is stable between renders
    const rand = (n: number) => Math.abs(Math.sin(n * 12.9898) * 43758.5453) % 1;
    let n = 1;
    for (let row = 0; row < 16; row++) {
      let x = rand(n++) * 80;
      while (x < canvas.width) {
        const len = 5 + Math.floor(rand(n++) * 12);
        let text = "";
        for (let i = 0; i < len; i++) text += rand(n++) > 0.5 ? "1" : "0";
        ctx.globalAlpha = 0.25 + rand(n++) * 0.75;
        ctx.fillStyle = "#fff";
        ctx.fillText(text, x, row * 32 + 6);
        x += ctx.measureText(text).width + 30 + rand(n++) * 90;
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, []);
}

function Globe({ animate, onReady }: { animate: boolean; onReady?: () => void }) {
  const group = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const coreMesh = useRef<THREE.Mesh>(null);
  const light = useRef(new THREE.Vector2(-0.4, 0.6));
  const coreMaterial = useRef<THREE.ShaderMaterial>(null);
  const frontMaterial = useRef<THREE.ShaderMaterial>(null);
  const land = useLoader(THREE.TextureLoader, "/images/globe-land.webp");
  const digits = useDigitsTexture();

  const shellFront = useMemo(
    () => ({ uLand: { value: land }, uBack: { value: 0 }, uLight: { value: new THREE.Vector2(-0.4, 0.6) } }),
    [land],
  );
  const shellBack = useMemo(
    () => ({ uLand: { value: land }, uBack: { value: 1 }, uLight: { value: new THREE.Vector2(-0.4, 0.6) } }),
    [land],
  );
  const core = useMemo(() => ({ uDigits: { value: digits }, uTime: { value: 0 } }), [digits]);

  // Runs once the land texture has loaded, so the static image only fades out when the globe can show
  useEffect(() => {
    onReady?.();
  }, [onReady]);

  useFrame((state, delta) => {
    if (!group.current || !spin.current) return;
    // Full 360 degree turn about every 20 seconds (slower when the visitor asks for reduced motion)
    const speed = animate ? 0.31 : 0.1;
    spin.current.rotation.y += delta * speed;
    // The inner data core turns the other way
    if (coreMesh.current) coreMesh.current.rotation.y -= delta * speed * 2;
    if (animate) {
      if (coreMaterial.current) coreMaterial.current.uniforms.uTime.value += delta;
    }
    // Lean gently toward the pointer
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0.18 - state.pointer.y * 0.08, 0.04);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -state.pointer.x * 0.05, 0.04);
    light.current.lerp(new THREE.Vector2(-0.4 + state.pointer.x * 0.4, 0.6 + state.pointer.y * 0.3), 0.05);
    frontMaterial.current?.uniforms.uLight.value.copy(light.current);
  });

  return (
    <group ref={group} position={[0, -0.35, 0]}>
      <group ref={spin} rotation={[0, -1.2, 0]}>
        <mesh ref={coreMesh} renderOrder={0}>
          <sphereGeometry args={[0.6, 64, 64]} />
          <shaderMaterial ref={coreMaterial} vertexShader={vertexShader} fragmentShader={coreFragment} uniforms={core} transparent />
        </mesh>
        <mesh renderOrder={1}>
          <sphereGeometry args={[1, 128, 128]} />
          <shaderMaterial
            vertexShader={vertexShader}
            fragmentShader={shellFragment}
            uniforms={shellBack}
            side={THREE.BackSide}
            transparent
            depthWrite={false}
          />
        </mesh>
        <mesh renderOrder={2}>
          <sphereGeometry args={[1, 128, 128]} />
          <shaderMaterial
            ref={frontMaterial}
            vertexShader={vertexShader}
            fragmentShader={shellFragment}
            uniforms={shellFront}
            side={THREE.FrontSide}
            transparent
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function GlobeScene({
  active,
  animate,
  onReady,
}: {
  active: boolean;
  animate: boolean;
  onReady?: () => void;
}) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 3.18], fov: 30 }}
      gl={{ antialias: true, alpha: true }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      <Globe animate={animate} onReady={onReady} />
    </Canvas>
  );
}
