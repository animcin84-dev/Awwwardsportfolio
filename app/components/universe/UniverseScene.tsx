"use client";

import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Line, MeshDistortMaterial, RoundedBox, Sparkles, Stars, useTexture } from "@react-three/drei";
import type { ScrollSceneChildProps } from "@14islands/r3f-scroll-rig";
import * as THREE from "three";

type UniverseMotionRefs = {
  progress: MutableRefObject<number>;
  velocity: MutableRefObject<number>;
  pointer: MutableRefObject<{ x: number; y: number }>;
};

const PROJECT_STOPS = [0.28, 0.55, 0.82] as const;
const PROJECT_POSITIONS: [number, number, number][] = [
  [-20, 1, -45],
  [24, -4, -100],
  [-28, 8, -162],
];

const CAMERA_WAYPOINTS = [
  [0, 13, 38], [-7, 8, 2], [-15, 4, -30], [-7, 2, -59],
  [16, -1, -84], [9, 4, -121], [-21, 6, -147], [-8, 13, -190], [3, 18, -226],
] as [number, number, number][];

const TARGET_WAYPOINTS = [
  [-8, 3, -48], [-20, 1, -45], [-20, 1, -45], [10, -2, -98],
  [24, -4, -100], [24, -4, -100], [-28, 8, -162], [-28, 8, -162], [0, 2, -260],
] as [number, number, number][];

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

function makePanelTexture(title: string, kicker: string, lines: string[], accent: string, dark = true) {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 640;
  const context = canvas.getContext("2d");
  if (!context) return null;
  context.fillStyle = dark ? "#080a10" : "#e8e2d7";
  context.fillRect(0, 0, canvas.width, canvas.height);
  const gradient = context.createRadialGradient(760, 140, 0, 760, 140, 620);
  gradient.addColorStop(0, `${accent}55`);
  gradient.addColorStop(1, `${accent}00`);
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = dark ? "rgba(255,255,255,.2)" : "rgba(8,9,12,.22)";
  context.lineWidth = 2;
  context.strokeRect(26, 26, 972, 588);
  context.fillStyle = accent;
  context.fillRect(26, 26, 150, 8);
  context.font = "500 19px Arial";
  context.letterSpacing = "6px";
  context.fillStyle = dark ? "rgba(255,255,255,.58)" : "rgba(8,9,12,.58)";
  context.fillText(kicker.toUpperCase(), 56, 90);
  context.font = "600 90px Arial";
  context.letterSpacing = "-5px";
  context.fillStyle = dark ? "#f5f3ec" : "#090a0d";
  context.fillText(title, 54, 220);
  context.font = "500 23px Arial";
  context.letterSpacing = "1px";
  lines.forEach((line, index) => {
    const y = 330 + index * 70;
    context.fillStyle = dark ? "rgba(255,255,255,.34)" : "rgba(8,9,12,.38)";
    context.fillText(`0${index + 1}`, 58, y);
    context.fillStyle = dark ? "rgba(255,255,255,.82)" : "rgba(8,9,12,.78)";
    context.fillText(line.toUpperCase(), 140, y);
    context.strokeStyle = dark ? "rgba(255,255,255,.12)" : "rgba(8,9,12,.14)";
    context.beginPath();
    context.moveTo(58, y + 24);
    context.lineTo(966, y + 24);
    context.stroke();
  });
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

function EvidencePanel({ title, kicker, lines, accent, position, rotation = [0, 0, 0], scale = 1, light = false }: {
  title: string;
  kicker: string;
  lines: string[];
  accent: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  light?: boolean;
}) {
  const texture = useMemo(() => makePanelTexture(title, kicker, lines, accent, !light), [accent, kicker, light, lines, title]);
  useEffect(() => () => texture?.dispose(), [texture]);
  return (
    <Float speed={0.55} rotationIntensity={0.055} floatIntensity={0.16} floatingRange={[-0.18, 0.18]}>
      <group position={position} rotation={rotation} scale={scale}>
        <RoundedBox args={[7.4, 4.6, 0.16]} radius={0.12} smoothness={4}>
          <meshStandardMaterial color={light ? "#dcd6ca" : "#080a10"} metalness={0.45} roughness={0.42} />
        </RoundedBox>
        <mesh position={[0, 0, 0.095]}>
          <planeGeometry args={[7.18, 4.38]} />
          <meshBasicMaterial map={texture} transparent toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

function MediaPanel({ map, position, rotation = [0, 0, 0], size = [6.8, 4.2] }: {
  map: THREE.Texture;
  position: [number, number, number];
  rotation?: [number, number, number];
  size?: [number, number];
}) {
  return (
    <Float speed={0.48} rotationIntensity={0.045} floatIntensity={0.14} floatingRange={[-0.12, 0.12]}>
      <group position={position} rotation={rotation}>
        <RoundedBox args={[size[0] + 0.28, size[1] + 0.28, 0.2]} radius={0.13} smoothness={4}>
          <meshStandardMaterial color="#0a0c12" metalness={0.7} roughness={0.28} />
        </RoundedBox>
        <mesh position={[0, 0, 0.115]}>
          <planeGeometry args={size} />
          <meshBasicMaterial map={map} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

function WorldMotion({ root, index, motion }: { root: MutableRefObject<THREE.Group | null>; index: number; motion: UniverseMotionRefs }) {
  useFrame(({ clock }, delta) => {
    const group = root.current;
    if (!group) return;
    const proximity = 1 - clamp(Math.abs(motion.progress.current - PROJECT_STOPS[index]) / 0.135);
    const targetScale = 0.96 + proximity * 0.095;
    const scale = THREE.MathUtils.damp(group.scale.x, targetScale, 4.4, delta);
    group.scale.setScalar(scale);
    group.rotation.y += delta * (index === 1 ? -0.032 : 0.024);
    group.rotation.x = Math.sin(clock.elapsedTime * 0.19 + index * 1.8) * 0.025;
    group.position.y = PROJECT_POSITIONS[index][1] + Math.sin(clock.elapsedTime * 0.32 + index) * 0.22;
  });
  return null;
}

function JarvisWorld({ motion, heroTexture }: { motion: UniverseMotionRefs; heroTexture: THREE.Texture }) {
  const root = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Group>(null);
  useFrame(({ clock }, delta) => {
    if (!rings.current) return;
    rings.current.rotation.x += delta * 0.055;
    rings.current.rotation.z = Math.sin(clock.elapsedTime * 0.22) * 0.18;
  });
  return (
    <group ref={root} position={PROJECT_POSITIONS[0]} rotation={[0, 0.16, 0]}>
      <WorldMotion root={root} index={0} motion={motion} />
      <group ref={rings}>
        <mesh rotation={[Math.PI / 2.4, 0.2, 0]}><torusGeometry args={[8.7, 0.07, 8, 128]} /><meshBasicMaterial color="#6277ff" transparent opacity={0.62} /></mesh>
        <mesh rotation={[0.4, 0.7, 1.1]}><torusGeometry args={[6.9, 0.025, 6, 128]} /><meshBasicMaterial color="#c7ceff" transparent opacity={0.42} /></mesh>
        <mesh rotation={[1.2, -0.3, 0.4]}><torusGeometry args={[10.4, 0.035, 6, 128]} /><meshBasicMaterial color="#3147cc" transparent opacity={0.32} /></mesh>
      </group>
      <mesh>
        <icosahedronGeometry args={[4.5, 5]} />
        <MeshDistortMaterial color="#111b54" emissive="#304eff" emissiveIntensity={1.18} metalness={0.72} roughness={0.19} distort={0.16} speed={0.5} />
      </mesh>
      <mesh scale={0.72}>
        <icosahedronGeometry args={[4.5, 2]} />
        <meshBasicMaterial color="#dfe4ff" wireframe transparent opacity={0.38} />
      </mesh>
      <pointLight color="#536dff" intensity={850} distance={58} decay={1.65} />
      <MediaPanel map={heroTexture} position={[8.2, 3.8, -1.2]} rotation={[-0.08, -0.5, -0.04]} size={[6.4, 3.7]} />
      <EvidencePanel title="MEMORY" kicker="JARVIS / LIVE TRACE" lines={["Context retained", "Tool result linked", "Handoff verified"]} accent="#6078ff" position={[-8.4, -3.7, 0.8]} rotation={[0.06, 0.5, 0.03]} scale={0.84} />
      {Array.from({ length: 9 }, (_, index) => {
        const angle = (index / 9) * Math.PI * 2;
        return <mesh key={index} position={[Math.cos(angle) * 11.4, Math.sin(angle * 1.7) * 3.8, Math.sin(angle) * 7]}><octahedronGeometry args={[0.18 + (index % 3) * 0.09, 0]} /><meshBasicMaterial color={index % 2 ? "#aebaff" : "#435cff"} /></mesh>;
      })}
    </group>
  );
}

function HelixWorld({ motion }: { motion: UniverseMotionRefs }) {
  const root = useRef<THREE.Group>(null);
  const machine = useRef<THREE.Group>(null);
  useFrame(({ clock }, delta) => {
    if (!machine.current) return;
    machine.current.rotation.z -= delta * 0.045;
    machine.current.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.16;
  });
  return (
    <group ref={root} position={PROJECT_POSITIONS[1]} rotation={[0, -0.34, 0]}>
      <WorldMotion root={root} index={1} motion={motion} />
      <group ref={machine}>
        <mesh rotation={[0.2, 0.65, 0.16]}><torusKnotGeometry args={[4.5, 0.65, 190, 18, 2, 3]} /><meshStandardMaterial color="#c8b8a4" metalness={0.78} roughness={0.3} /></mesh>
        {[7, 9.4, 12.2].map((radius, index) => <mesh key={radius} rotation={[index * 0.42, index * 0.55, index * 0.28]}><torusGeometry args={[radius, index === 1 ? 0.18 : 0.055, 9, 128]} /><meshBasicMaterial color={index === 1 ? "#e09561" : "#aaa59a"} transparent opacity={index === 1 ? 0.85 : 0.45} /></mesh>)}
      </group>
      {Array.from({ length: 7 }, (_, index) => {
        const x = -8.7 + index * 2.9;
        const y = Math.sin(index * 1.2) * 2.7;
        return <group key={index} position={[x, y, (index % 2 ? 1 : -1) * 1.8]}><mesh><sphereGeometry args={[0.48 + (index % 3) * 0.1, 20, 20]} /><meshStandardMaterial color={index === 3 ? "#e09561" : "#d5cec1"} metalness={0.62} roughness={0.36} /></mesh><mesh rotation={[0, 0, Math.PI / 2]} position={[1.42, 0, 0]}><cylinderGeometry args={[0.08, 0.08, 2.5, 12]} /><meshBasicMaterial color="#8f8a80" transparent opacity={0.7} /></mesh></group>;
      })}
      <EvidencePanel title="RECOVER" kicker="HELIX / RUN 044" lines={["Failure detected", "Owner assigned", "State restored"]} accent="#d98d5d" position={[8.6, 4.8, -1.8]} rotation={[-0.1, -0.48, -0.04]} scale={0.92} light />
      <EvidencePanel title="OWNED" kicker="RECOVERY LEDGER" lines={["Signal 00:14", "Action 00:27", "Verified 00:41"]} accent="#d98d5d" position={[-8.4, -4.5, 1.2]} rotation={[0.06, 0.46, 0.03]} scale={0.7} />
      <pointLight color="#e09561" intensity={690} distance={52} decay={1.7} position={[-2, 1, 3]} />
    </group>
  );
}

function QadamWorld({ motion, materialTexture }: { motion: UniverseMotionRefs; materialTexture: THREE.Texture }) {
  const root = useRef<THREE.Group>(null);
  const archive = useRef<THREE.Group>(null);
  useFrame(({ clock }, delta) => {
    if (!archive.current) return;
    archive.current.rotation.y += delta * 0.036;
    archive.current.rotation.z = Math.sin(clock.elapsedTime * 0.17) * 0.08;
  });
  return (
    <group ref={root} position={PROJECT_POSITIONS[2]} rotation={[0, 0.25, 0]}>
      <WorldMotion root={root} index={2} motion={motion} />
      <group ref={archive}>
        <mesh rotation={[0.25, 0.3, 0.05]}><dodecahedronGeometry args={[5.2, 1]} /><MeshDistortMaterial color="#111944" emissive="#2e48e7" emissiveIntensity={0.9} metalness={0.74} roughness={0.22} distort={0.08} speed={0.32} /></mesh>
        <mesh scale={1.15}><dodecahedronGeometry args={[5.2, 0]} /><meshBasicMaterial color="#7387ff" wireframe transparent opacity={0.28} /></mesh>
      </group>
      {Array.from({ length: 7 }, (_, index) => <group key={index} position={[index * 1.28 - 3.8, index * 0.72 - 2.2, index * -1.25 + 2.5]} rotation={[0.04 * index, -0.08 * index, (index - 3) * 0.04]}><RoundedBox args={[8.6 - index * 0.32, 5.2 - index * 0.18, 0.11]} radius={0.08} smoothness={3}><meshStandardMaterial color={index % 2 ? "#1a2042" : "#090c18"} emissive="#253ba8" emissiveIntensity={0.22 + index * 0.035} metalness={0.52} roughness={0.38} transparent opacity={0.8} /></RoundedBox></group>)}
      <MediaPanel map={materialTexture} position={[-9.6, 4.8, 1]} rotation={[-0.09, 0.52, 0.03]} size={[6.6, 4.1]} />
      <EvidencePanel title="CITED" kicker="QADAM / EVIDENCE GRAPH" lines={["Claim parsed", "Source returned", "Evaluation passed"]} accent="#5e76ff" position={[9.4, -4.6, -1]} rotation={[0.08, -0.52, -0.03]} scale={0.88} />
      {Array.from({ length: 12 }, (_, index) => {
        const angle = (index / 12) * Math.PI * 2;
        return <mesh key={index} position={[Math.cos(angle) * (8 + index % 3), Math.sin(angle * 2) * 4.8, Math.sin(angle) * 8]}><sphereGeometry args={[index % 4 === 0 ? 0.28 : 0.12, 14, 14]} /><meshBasicMaterial color={index % 4 === 0 ? "#e7eaff" : "#5971ff"} /></mesh>;
      })}
      <pointLight color="#536dff" intensity={920} distance={62} decay={1.65} position={[0, 2, 3]} />
    </group>
  );
}

function FlightRoutes() {
  const routes = useMemo(() => [
    [[-58, 22, 32], [-32, -10, -38], [12, 18, -74], [46, -8, -118], [-18, 24, -176], [-62, 5, -218]],
    [[38, 28, 18], [52, 8, -42], [2, -18, -83], [-45, 2, -128], [8, 30, -174], [58, 2, -224]],
    [[-22, -24, 25], [17, -13, -36], [52, 12, -80], [9, 25, -120], [-58, -4, -168], [-16, -26, -220]],
    [[62, -4, 8], [8, 31, -44], [-46, 16, -92], [-14, -25, -137], [46, 0, -178], [22, 27, -232]],
  ].map((points) => new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)), false, "catmullrom", 0.42).getPoints(180)), []);
  return <>{routes.map((route, index) => <Line key={index} points={route} color={index === 2 ? "#d48d60" : "#526aff"} lineWidth={index === 2 ? 0.55 : 0.34} transparent opacity={index === 2 ? 0.32 : 0.19} />)}</>;
}

function SignalCourier({ cameraCurve, motion }: { cameraCurve: THREE.CatmullRomCurve3; motion: UniverseMotionRefs }) {
  const root = useRef<THREE.Group>(null);
  const target = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ clock }, delta) => {
    if (!root.current) return;
    cameraCurve.getPointAt(clamp(motion.progress.current + 0.018), target);
    target.x += 2.2;
    target.y -= 1.5 + Math.sin(clock.elapsedTime * 0.7) * 0.22;
    root.current.position.lerp(target, 1 - Math.exp(-delta * 3.8));
    root.current.rotation.z = Math.sin(clock.elapsedTime * 0.35) * 0.12;
    root.current.rotation.y += delta * 0.22;
  });
  return (
    <group ref={root} scale={0.34}>
      <mesh><capsuleGeometry args={[0.62, 1.7, 8, 18]} /><meshStandardMaterial color="#d9dce8" metalness={0.62} roughness={0.3} /></mesh>
      <mesh position={[0, 1.42, 0]}><sphereGeometry args={[0.72, 24, 24]} /><meshStandardMaterial color="#bfc5d9" metalness={0.72} roughness={0.2} /></mesh>
      <mesh position={[0, 1.38, 0.52]} rotation={[0.06, 0, 0]}><sphereGeometry args={[0.52, 20, 14, 0, Math.PI * 2, 0, Math.PI / 1.8]} /><meshPhysicalMaterial color="#182557" emissive="#314fe6" emissiveIntensity={0.7} metalness={0.88} roughness={0.08} /></mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.34, 0.08, 8, 64]} /><meshBasicMaterial color="#637cff" /></mesh>
      <mesh position={[-1.7, 0.1, 0]}><boxGeometry args={[2.2, 0.12, 0.75]} /><meshStandardMaterial color="#7c849f" metalness={0.8} roughness={0.28} /></mesh>
      <mesh position={[1.7, 0.1, 0]}><boxGeometry args={[2.2, 0.12, 0.75]} /><meshStandardMaterial color="#7c849f" metalness={0.8} roughness={0.28} /></mesh>
      <pointLight color="#5470ff" intensity={32} distance={9} />
    </group>
  );
}

export function UniverseScene({ motion }: { motion: UniverseMotionRefs }) {
  const heroTexture = useTexture("/hero-poster.webp");
  const materialTexture = useTexture("/material-signal.webp");
  const cameraCurve = useMemo(() => new THREE.CatmullRomCurve3(CAMERA_WAYPOINTS.map((point) => new THREE.Vector3(...point)), false, "catmullrom", 0.36), []);
  const targetCurve = useMemo(() => new THREE.CatmullRomCurve3(TARGET_WAYPOINTS.map((point) => new THREE.Vector3(...point)), false, "catmullrom", 0.36), []);
  const cameraTarget = useMemo(() => new THREE.Vector3(), []);
  const cameraPoint = useMemo(() => new THREE.Vector3(), []);
  const desired = useMemo(() => new THREE.Vector3(), []);
  useEffect(() => {
    heroTexture.colorSpace = THREE.SRGBColorSpace;
    materialTexture.colorSpace = THREE.SRGBColorSpace;
  }, [heroTexture, materialTexture]);
  useFrame(({ camera }, delta) => {
    const route = clamp(motion.progress.current);
    cameraCurve.getPointAt(route, cameraPoint);
    targetCurve.getPointAt(route, cameraTarget);
    desired.copy(cameraPoint);
    desired.x += motion.pointer.current.x * 0.48;
    desired.y -= motion.pointer.current.y * 0.32;
    camera.position.lerp(desired, 1 - Math.exp(-delta * 5.2));
    camera.lookAt(cameraTarget);
    camera.rotation.z += Math.sin(route * Math.PI * 5.2) * 0.008 + motion.pointer.current.x * -0.006;
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.damp(camera.fov, 46 + motion.velocity.current * 2.2, 4.2, delta);
      camera.near = 0.08;
      camera.far = 560;
      camera.updateProjectionMatrix();
    }
  });
  return (
    <>
      <color attach="background" args={["#020306"]} />
      <fogExp2 attach="fog" args={["#020306", 0.0068]} />
      <ambientLight color="#8290c6" intensity={0.62} />
      <directionalLight color="#8ea0ff" intensity={1.7} position={[-22, 28, 24]} />
      <pointLight color="#d48d60" intensity={730} distance={110} decay={1.7} position={[28, -2, -95]} />
      <Stars radius={185} depth={280} count={2600} factor={2.8} saturation={0.12} fade speed={0.08} />
      <Sparkles count={260} scale={[116, 68, 270]} size={0.7} speed={0.08} opacity={0.42} color="#7488ff" />
      <Sparkles count={70} scale={[90, 55, 220]} size={1.25} speed={0.035} opacity={0.22} color="#d89a72" />
      <FlightRoutes />
      <JarvisWorld motion={motion} heroTexture={heroTexture} />
      <HelixWorld motion={motion} />
      <QadamWorld motion={motion} materialTexture={materialTexture} />
      <SignalCourier cameraCurve={cameraCurve} motion={motion} />
    </>
  );
}

export function SyncedRigPreview({ scale }: ScrollSceneChildProps) {
  const texture = useTexture("/hero-poster.webp");
  useEffect(() => { texture.colorSpace = THREE.SRGBColorSpace; }, [texture]);
  return (
    <mesh scale={[scale.x, scale.y, 1]}>
      <planeGeometry />
      <meshBasicMaterial map={texture} toneMapped={false} transparent opacity={0.9} />
    </mesh>
  );
}
