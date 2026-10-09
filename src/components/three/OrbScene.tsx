"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPos;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    vPos = position;
    gl_Position = projectionMatrix * mv;
  }
`;

// Glassy blue sphere: dark core, swirling inner light, bright fresnel rim and a soft highlight
const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uLight;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPos;

  float hash(vec3 p) { return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453); }
  float noise(vec3 p) {
    vec3 i = floor(p); vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float n = mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x), mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
                  mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x), mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
    return n;
  }

  void main() {
    vec3 n = normalize(vNormal);
    float facing = max(dot(n, vView), 0.0);
    float fres = pow(1.0 - facing, 2.2);

    float swirl = noise(vPos * 2.4 + vec3(uTime * 0.25, uTime * 0.18, -uTime * 0.2));
    swirl = swirl * 0.7 + 0.3 * noise(vPos * 5.0 - vec3(uTime * 0.3));

    vec3 core = vec3(0.02, 0.04, 0.16);
    vec3 blue = vec3(0.04, 0.33, 0.92);
    vec3 cyan = vec3(0.45, 0.85, 1.0);

    // Dark glassy centre fading to saturated blue toward the edge
    float centre = smoothstep(0.1, 0.85, facing);
    vec3 color = mix(blue, core, centre * 0.92);
    color += mix(blue, cyan, 0.3) * pow(swirl, 2.0) * 0.45 * (1.0 - centre * 0.35);
    color = mix(color, cyan, smoothstep(0.45, 1.0, fres) * 0.85);

    // Soft key light from the lower right (as in the artwork) that drifts with the pointer
    vec3 l = normalize(vec3(uLight, 1.0));
    vec3 h = normalize(l + vView);
    float spec = pow(max(dot(n, h), 0.0), 18.0);
    float sharp = pow(max(dot(n, h), 0.0), 90.0);
    color += vec3(0.7, 0.85, 1.0) * spec * 0.35 + vec3(1.0) * sharp * 0.75;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function Orb({ animate }: { animate: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const light = useRef(new THREE.Vector2(0.45, -0.55));
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uLight: { value: new THREE.Vector2(0.45, -0.55) } }), []);

  useFrame((state, delta) => {
    if (!mesh.current || !material.current) return;
    if (animate) {
      material.current.uniforms.uTime.value += delta;
      mesh.current.rotation.y += delta * 0.15;
    }
    light.current.lerp(new THREE.Vector2(0.45 + state.pointer.x * 0.5, -0.55 + state.pointer.y * 0.4), 0.06);
    material.current.uniforms.uLight.value.copy(light.current);
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, -state.pointer.y * 0.25, 0.05);
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1, 96, 96]} />
      <shaderMaterial ref={material} vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
    </mesh>
  );
}

export default function OrbScene({ active, animate }: { active: boolean; animate: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 3.05], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      <Orb animate={animate} />
    </Canvas>
  );
}
