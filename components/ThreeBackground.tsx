"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Fullscreen background:
 * - base texture: /images/blackhole.png
 * - water-like wave distortion (time-based, more random/organic)
 * - mouse only adds gentle parallax/tilt (weaker)
 */
export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const pixelRatio = Math.min(window.devicePixelRatio, 1.75);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    scene.add(camera);

    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      uTexture: { value: null as THREE.Texture | null },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    };

    const fragmentShader = `
      precision highp float;

      uniform float uTime;
      uniform vec2 uResolution;
      uniform sampler2D uTexture;
      uniform vec2 uMouse;

      varying vec2 vUv;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);

        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));

        vec2 u = f * f * (3.0 - 2.0 * f);

        return mix(a, b, u.x) +
               (c - a) * u.y * (1.0 - u.x) +
               (d - b) * u.x * u.y;
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 4; i++) {
          v += a * noise(p);
          p *= 2.0;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = vUv;

        float aspect = uResolution.x / uResolution.y;
        vec2 centered = (uv - 0.5);
        centered.x *= aspect;

        float t = uTime * 0.10;

        // --- Более "рандомные" водяные волны ---
        // крупная структура
        float base = fbm(centered * 8.8 + vec2(t * 0.35, -t * 0.25));
        // мелкие детали
        float detail = fbm(centered * 10.0 - vec2(t * 0.55, t * 0.4));
        float waves = base * 1.7 + detail * 0.3;

        // немного направленной волны, чтобы были "полосы", но очень мягко
        waves += 0.10 * sin(uv.y * 35.0 + t * 1.6);

        // финальное смещение (помягче)
        vec2 waveOffset = vec2(
          (waves - 0.5) * 0.03,
          (waves - 0.5) * 0.03
        );

        // --- Параллакс/наклон от мыши (ослаблен) ---
        vec2 m = uMouse;
        vec2 mCentered = (m - 0.2) * vec2(1.0, -1.0);
        vec2 parallaxOffset = mCentered * 0.005; // было 0.04

        vec2 distortedUv = uv + waveOffset - parallaxOffset;

        
        // горизонтальное отражение жёсткое:
        distortedUv.x = 1.0 - distortedUv.x;

        // clamp на всякий случай
        distortedUv = clamp(distortedUv, 0.0, 1.0);

        vec4 tex = texture2D(uTexture, distortedUv);

        float gray = dot(tex.rgb, vec3(0.299, 0.587, 0.114));

        float breathe = 0.95 + 0.05 * sin(t * 0.5);
        gray *= breathe;

        float r = length(centered * 1.05);
        float vignette = smoothstep(1.10, 0.25, r);

        float finalVal = gray * vignette;

        gl_FragColor = vec4(vec3(finalVal), 1.0);
      }
    `;

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
      "/images/blackhole.png",
      () => {
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        uniforms.uTexture.value = texture;
      }
    );

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onResize);

    // мышь: только обновляем положение для параллакса (без влияния на волны)
    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      uniforms.uMouse.value.set(x, y);
    };

    window.addEventListener("mousemove", onMouseMove);

    let frameId: number;
    const animate = (time: number) => {
      uniforms.uTime.value = time * 0.001;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}
