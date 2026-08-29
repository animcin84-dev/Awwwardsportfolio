"use client";

import { useEffect, useRef } from "react";

const vertexShader = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_speed;
uniform float u_density;
uniform float u_amplitude;
uniform float u_contrast;
uniform float u_glow;
uniform float u_grain;
uniform vec3 u_color;
uniform vec3 u_tint;
varying vec2 v_uv;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

void main() {
  vec2 uv = (v_uv * u_resolution) / min(u_resolution.x, u_resolution.y);
  float t = u_time * u_speed;
  uv.y += u_amplitude * sin(8.0 * uv.x - t);
  float density = max(0.2, u_density);
  float fold = sin(density * 8.0 * (uv.x + uv.y + cos(density * 2.0 * uv.x + density * 5.0 * uv.y)) - t);
  fold = 0.5 + 0.5 * fold;
  float grain = noise(uv * min(u_resolution.x, u_resolution.y) * 0.004);
  float veil = smoothstep(0.08, 0.92, fold);
  vec3 color = mix(u_color * 0.12, u_color, veil);
  color += u_tint * pow(max(0.0, 1.0 - abs(fold * 2.0 - 1.0)), 3.0) * u_glow;
  color += (grain - 0.5) * u_grain * 0.08;
  color = mix(vec3(0.5), color, u_contrast);
  gl_FragColor = vec4(color, 1.0);
}
`;

type SilkWavesProps = {
  speed?: number;
  scale?: number;
  contrast?: number;
  glow?: number;
  color?: string;
  tint?: string;
  amplitude?: number;
  density?: number;
  grain?: number;
};

function parseColor(value: string, fallback: [number, number, number]): [number, number, number] {
  const clean = value.trim().replace("#", "");
  if (!/^[\da-f]{6}$/i.test(clean)) return fallback;
  return [parseInt(clean.slice(0, 2), 16) / 255, parseInt(clean.slice(2, 4), 16) / 255, parseInt(clean.slice(4, 6), 16) / 255];
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function SilkWaves({ speed = 0.35, scale = 1, contrast = 1.12, glow = 0.6, color = "#090a0d", tint = "#405ae4", amplitude = 0.04, density = 1, grain = 0.7 }: SilkWavesProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, antialias: false, powerPreference: "low-power" });
    if (!gl) {
      root.dataset.fallback = "true";
      return;
    }
    const vertex = compile(gl, gl.VERTEX_SHADER, vertexShader);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertex || !fragment) {
      root.dataset.fallback = "true";
      return;
    }
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program);
    gl.deleteShader(vertex); gl.deleteShader(fragment);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program); root.dataset.fallback = "true"; return;
    }
    const buffer = gl.createBuffer();
    if (!buffer) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.useProgram(program);
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const resolution = gl.getUniformLocation(program, "u_resolution");
    const time = gl.getUniformLocation(program, "u_time");
    const uniforms = {
      speed: gl.getUniformLocation(program, "u_speed"), density: gl.getUniformLocation(program, "u_density"), amplitude: gl.getUniformLocation(program, "u_amplitude"),
      contrast: gl.getUniformLocation(program, "u_contrast"), glow: gl.getUniformLocation(program, "u_glow"), grain: gl.getUniformLocation(program, "u_grain"),
      color: gl.getUniformLocation(program, "u_color"), tint: gl.getUniformLocation(program, "u_tint"),
    };
    const baseColor = parseColor(color, [0.035, 0.04, 0.05]);
    const accentColor = parseColor(tint, [0.25, 0.35, 0.9]);
    gl.uniform1f(uniforms.speed, speed); gl.uniform1f(uniforms.density, density * scale); gl.uniform1f(uniforms.amplitude, amplitude);
    gl.uniform1f(uniforms.contrast, contrast); gl.uniform1f(uniforms.glow, glow); gl.uniform1f(uniforms.grain, grain);
    gl.uniform3fv(uniforms.color, baseColor); gl.uniform3fv(uniforms.tint, accentColor);

    let frame = 0;
    let active = !document.hidden;
    const resize = () => {
      const rect = root.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(rect.width * dpr)); canvas.height = Math.max(1, Math.round(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height); gl.uniform2f(resolution, canvas.width, canvas.height);
    };
    const render = (stamp: number) => {
      if (!active) return;
      gl.uniform1f(time, stamp * 0.001); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); frame = window.requestAnimationFrame(render);
    };
    const onVisibility = () => { active = !document.hidden; if (active && !frame) frame = window.requestAnimationFrame(render); else if (!active && frame) { window.cancelAnimationFrame(frame); frame = 0; } };
    const observer = new ResizeObserver(resize); observer.observe(root); resize();
    document.addEventListener("visibilitychange", onVisibility);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { gl.uniform1f(time, 0); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); }
    else frame = window.requestAnimationFrame(render);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect(); document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteBuffer(buffer); gl.deleteProgram(program); canvas.width = 1; canvas.height = 1;
    };
  }, [amplitude, color, contrast, density, glow, grain, scale, speed, tint]);

  return <div ref={rootRef} className="silk-waves" aria-hidden="true"><canvas ref={canvasRef} /><span className="silk-waves-fallback" /></div>;
}

export default SilkWaves;
