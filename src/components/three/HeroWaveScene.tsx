"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPixelRatio;
  attribute float aRandom;
  varying float vGlow;
  varying float vDepth;

  void main() {
    vec3 p = position;
    float t = uTime * 0.35;
    // Two crossing sine bands give the flowing "data wave" from the design
    float wave = sin(p.x * 0.55 + t * 1.6) * 0.55
               + sin(p.x * 0.23 - p.z * 0.45 + t) * 0.85
               + cos(p.z * 0.7 + t * 1.2) * 0.25;
    // Lift the surface under the cursor
    float d = distance(p.xz, uMouse * vec2(9.0, 4.0));
    wave += smoothstep(3.5, 0.0, d) * 0.6;
    p.y += wave;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    vGlow = smoothstep(-1.2, 1.6, wave);
    vDepth = clamp(-mv.z / 22.0, 0.0, 1.0);
    float size = mix(1.8, 4.2, vGlow) * (0.7 + aRandom * 0.6);
    gl_PointSize = size * uPixelRatio * (14.0 / -mv.z);
  }
`;

const fragmentShader = /* glsl */ `
  varying float vGlow;
  varying float vDepth;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float soft = smoothstep(0.5, 0.0, r);
    vec3 deep = vec3(0.02, 0.32, 0.78);
    vec3 bright = vec3(0.62, 0.86, 1.0);
    vec3 color = mix(deep, bright, vGlow);
    float alpha = soft * mix(0.5, 1.0, vGlow) * (1.0 - vDepth * 0.6);
    gl_FragColor = vec4(color, alpha);
  }
`;

function Wave({ animate }: { animate: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const { gl } = useThree();

  const { positions, randoms } = useMemo(() => {
    const cols = 220;
    const rows = 70;
    const positions = new Float32Array(cols * rows * 3);
    const randoms = new Float32Array(cols * rows);
    let i = 0;
    for (let z = 0; z < rows; z++) {
      for (let x = 0; x < cols; x++) {
        positions[i * 3] = (x / (cols - 1) - 0.5) * 34;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = (z / (rows - 1) - 0.5) * 14;
        // Deterministic per-point jitter so renders stay stable
        randoms[i] = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
        i++;
      }
    }
    return { positions, randoms };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
    }),
    [gl],
  );

  useFrame((state, delta) => {
    if (!material.current) return;
    if (animate) material.current.uniforms.uTime.value += delta;
    mouse.current.lerp(state.pointer, 0.05);
    material.current.uniforms.uMouse.value.set(mouse.current.x, -mouse.current.y);
  });

  return (
    <points rotation={[0.12, 0, -0.06]} position={[0, -2.4, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroWaveScene({ active, animate }: { active: boolean; animate: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 2]}
      camera={{ position: [0, 2.2, 11], fov: 50 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      <Wave animate={animate} />
    </Canvas>
  );
}
