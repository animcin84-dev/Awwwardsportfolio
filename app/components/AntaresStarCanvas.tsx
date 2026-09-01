"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uPointer;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + vec3(.1,.2,.3));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
                   mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
               mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                   mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }

  float fbm(vec3 p) {
    float value = 0.0;
    float amp = .5;
    for (int i = 0; i < 5; i++) {
      value += amp * noise(p);
      p = p * 2.03 + vec3(7.1, 3.7, 5.9);
      amp *= .5;
    }
    return value;
  }

  void main() {
    float t = uTime * .075;
    vec3 p = normalize(vPosition) * 3.6;
    p.xy += uPointer * .08;
    float large = fbm(p + vec3(t, -t * .45, t * .25));
    float fine = fbm(p * 2.25 - vec3(t * 1.7, t * .2, -t));
    float plasma = smoothstep(.18, .88, large * .72 + fine * .38);
    float facing = max(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 0.0);
    float limb = pow(1.0 - facing, 1.55);
    vec3 deep = vec3(.16, .012, .003);
    vec3 red = vec3(1.0, .105, .025);
    vec3 orange = vec3(1.0, .38, .055);
    vec3 hot = vec3(1.0, .83, .54);
    vec3 color = mix(deep, red, plasma);
    color = mix(color, orange, smoothstep(.48, .9, plasma));
    color = mix(color, hot, pow(plasma, 5.0) * .55);
    color *= 1.0 - limb * .46;
    color += red * limb * .17;
    gl_FragColor = vec4(color, 1.0);
  }
`;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

function Star({ reduced }: { reduced: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uPointer: { value: new THREE.Vector2() },
  }), []);

  useFrame((state, delta) => {
    if (!material.current || !mesh.current) return;
    if (!reduced) material.current.uniforms.uTime.value += Math.min(delta, .035);
    material.current.uniforms.uPointer.value.lerp(pointer, .04);
    if (!reduced) mesh.current.rotation.y = state.clock.elapsedTime * .018;
  });

  return (
    <mesh ref={mesh} rotation={[0.08, -0.15, 0]}>
      <sphereGeometry args={[1.72, 96, 96]} />
      <shaderMaterial ref={material} vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
    </mesh>
  );
}

function OrbitLines() {
  return (
    <group rotation={[1.12, .16, -.34]}>
      <mesh scale={[2.35, 2.35, 2.35]}>
        <torusGeometry args={[1, .0022, 4, 180]} />
        <meshBasicMaterial color="#ff6833" transparent opacity={.34} />
      </mesh>
      <mesh scale={[2.75, 2.75, 2.75]} rotation={[.35, -.12, .62]}>
        <torusGeometry args={[1, .0014, 4, 180]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={.12} />
      </mesh>
    </group>
  );
}

function Stars() {
  const positions = useMemo(() => {
    const arr = new Float32Array(360 * 3);
    let seed = 1337;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (rand() - .5) * 13;
      arr[i + 1] = (rand() - .5) * 8;
      arr[i + 2] = -1 - rand() * 8;
    }
    return arr;
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={.014} color="#fff5e8" transparent opacity={.45} sizeAttenuation />
    </points>
  );
}

export function AntaresStarCanvas() {
  const reduced = useReducedMotion();
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 44 }}
      dpr={[1, 1.65]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <Stars />
      <Star reduced={reduced} />
      <OrbitLines />
    </Canvas>
  );
}
