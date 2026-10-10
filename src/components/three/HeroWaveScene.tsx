"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const waveVertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPixelRatio;
  uniform float uAmp;
  uniform float uPhase;
  uniform float uSize;
  attribute float aRandom;
  varying float vGlow;
  varying float vDepth;
  varying float vRibbon;

  void main() {
    vec3 p = position;
    float t = uTime * 0.32 + uPhase;

    // Layered swells: a long ocean roll, a crossing band and fine ripples
    float wave = sin(p.x * 0.42 + t * 1.5) * 0.6
               + sin(p.x * 0.19 - p.z * 0.42 + t * 0.9) * 0.95
               + cos(p.z * 0.65 + p.x * 0.08 + t * 1.25) * 0.3
               + sin(p.x * 1.3 + p.z * 1.1 + t * 2.6) * 0.07;
    wave *= uAmp;

    // Ripple rings spreading from the cursor
    float d = distance(p.xz, uMouse * vec2(9.0, 4.0));
    wave += sin(d * 2.2 - uTime * 3.0) * 0.18 * smoothstep(5.0, 0.0, d);
    p.y += wave;

    // A bright ribbon of light that sweeps diagonally across the surface
    float sweep = mod(uTime * 3.2 + uPhase * 7.0, 70.0) - 35.0;
    vRibbon = exp(-pow((p.x + p.z * 0.9 - sweep) / 1.6, 2.0));

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    vGlow = smoothstep(-1.3, 1.7, wave);
    vDepth = clamp(-mv.z / 24.0, 0.0, 1.0);
    float twinkle = 0.75 + 0.25 * sin(uTime * 2.0 + aRandom * 40.0);
    float size = mix(1.6, 4.0, vGlow) * (0.7 + aRandom * 0.6) * twinkle * (1.0 + vRibbon * 0.9);
    gl_PointSize = size * uSize * uPixelRatio * (14.0 / -mv.z);
  }
`;

const waveFragment = /* glsl */ `
  uniform vec3 uDeep;
  uniform vec3 uBright;
  uniform float uOpacity;
  varying float vGlow;
  varying float vDepth;
  varying float vRibbon;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float soft = smoothstep(0.5, 0.0, r);
    vec3 color = mix(uDeep, uBright, vGlow);
    color = mix(color, vec3(0.85, 0.97, 1.0), vRibbon * 0.85);
    float alpha = soft * mix(0.45, 1.0, max(vGlow, vRibbon)) * (1.0 - vDepth * 0.65) * uOpacity;
    gl_FragColor = vec4(color, alpha);
  }
`;

// Fine dust that drifts up from the wave and twinkles
const dustVertex = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aRandom;
  varying float vAlpha;

  void main() {
    vec3 p = position;
    float rise = mod(p.y + uTime * (0.15 + aRandom * 0.25), 6.0);
    p.y = rise - 1.0;
    p.x += sin(uTime * 0.3 + aRandom * 20.0) * 0.4;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float fade = smoothstep(0.0, 1.0, rise) * smoothstep(6.0, 3.5, rise);
    vAlpha = fade * (0.4 + 0.6 * abs(sin(uTime * 1.5 + aRandom * 30.0)));
    gl_PointSize = (1.5 + aRandom * 2.5) * uPixelRatio * (12.0 / -mv.z);
  }
`;

const dustFragment = /* glsl */ `
  varying float vAlpha;
  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    gl_FragColor = vec4(0.65, 0.88, 1.0, smoothstep(0.5, 0.0, r) * vAlpha * 0.8);
  }
`;

// Deterministic pseudo-random values so renders stay stable
const rand = (n: number) => Math.abs(Math.sin(n * 12.9898) * 43758.5453) % 1;

type LayerProps = {
  cols: number;
  rows: number;
  width: number;
  depth: number;
  position: [number, number, number];
  amp: number;
  phase: number;
  size: number;
  opacity: number;
  deep: string;
  bright: string;
  speed: number;
};

function WaveLayer({ cols, rows, width, depth, position, amp, phase, size, opacity, deep, bright, speed }: LayerProps) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const { gl } = useThree();

  const { positions, randoms } = useMemo(() => {
    const positions = new Float32Array(cols * rows * 3);
    const randoms = new Float32Array(cols * rows);
    let i = 0;
    for (let z = 0; z < rows; z++) {
      for (let x = 0; x < cols; x++) {
        positions[i * 3] = (x / (cols - 1) - 0.5) * width;
        positions[i * 3 + 2] = (z / (rows - 1) - 0.5) * depth;
        randoms[i] = rand(i + phase * 1000);
        i++;
      }
    }
    return { positions, randoms };
  }, [cols, rows, width, depth, phase]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uAmp: { value: amp },
      uPhase: { value: phase },
      uSize: { value: size },
      uOpacity: { value: opacity },
      uDeep: { value: new THREE.Color(deep) },
      uBright: { value: new THREE.Color(bright) },
    }),
    [gl, amp, phase, size, opacity, deep, bright],
  );

  useFrame((state, delta) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value += delta * speed;
    mouse.current.lerp(state.pointer, 0.05);
    material.current.uniforms.uMouse.value.set(mouse.current.x, -mouse.current.y);
  });

  return (
    <points rotation={[0.12, 0, -0.06]} position={position}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={waveVertex}
        fragmentShader={waveFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Dust({ speed }: { speed: number }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const { gl } = useThree();
  const { positions, randoms } = useMemo(() => {
    const count = 260;
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand(i + 0.1) - 0.5) * 30;
      positions[i * 3 + 1] = rand(i + 0.2) * 6;
      positions[i * 3 + 2] = (rand(i + 0.3) - 0.5) * 10;
      randoms[i] = rand(i + 0.4);
    }
    return { positions, randoms };
  }, []);
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) } }),
    [gl],
  );
  useFrame((_, delta) => {
    if (material.current) material.current.uniforms.uTime.value += delta * speed;
  });
  return (
    <points position={[0, -2.6, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={dustVertex}
        fragmentShader={dustFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Slow, gentle drift of the camera so the whole scene breathes
function CameraDrift({ speed }: { speed: number }) {
  const t = useRef(0);
  useFrame((state, delta) => {
    t.current += delta * speed;
    const cam = state.camera;
    cam.position.x = Math.sin(t.current * 0.12) * 0.8 + state.pointer.x * 0.4;
    cam.position.y = 2.2 + Math.sin(t.current * 0.09) * 0.25;
  });
  return null;
}

export default function HeroWaveScene({ active, animate }: { active: boolean; animate: boolean }) {
  // Visitors who turn animations off still get a calm, slower wave
  const speed = animate ? 1 : 0.4;
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 2]}
      camera={{ position: [0, 2.2, 11], fov: 50 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      <CameraDrift speed={speed} />
      {/* Faint, finer wave further back for depth */}
      <WaveLayer
        cols={180}
        rows={40}
        width={44}
        depth={10}
        position={[0, -1.2, -7]}
        amp={0.8}
        phase={2.3}
        size={0.7}
        opacity={0.45}
        deep="#0a2a6e"
        bright="#4f8fe6"
        speed={speed * 0.8}
      />
      <WaveLayer
        cols={220}
        rows={70}
        width={34}
        depth={14}
        position={[0, -2.4, 0]}
        amp={1}
        phase={0}
        size={1}
        opacity={1}
        deep="#0552c7"
        bright="#9edbff"
        speed={speed}
      />
      <Dust speed={speed} />
    </Canvas>
  );
}
