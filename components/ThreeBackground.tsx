"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
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
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uTexture: { value: null as THREE.Texture | null },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },

      // реальный аспект текстуры
      uTexAspect: { value: 1.0 },

      // доп. зум/смещение (для мобилы)
      uTexScale: { value: 1.0 },
      uTexOffset: { value: new THREE.Vector2(0.0, 0.0) },
    };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;

      uniform float uTime;
      uniform vec2 uResolution;
      uniform sampler2D uTexture;
      uniform vec2 uMouse;

      uniform float uTexAspect;
      uniform float uTexScale;
      uniform vec2 uTexOffset;

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

        float screenAspect = uResolution.x / uResolution.y;
        vec2 centered = (uv - 0.5);
        centered.x *= screenAspect;

        float t = uTime * 0.10;

        float base = fbm(centered * 8.8 + vec2(t * 0.35, -t * 0.25));
        float detail = fbm(centered * 10.0 - vec2(t * 0.55, t * 0.4));
        float waves = base * 1.7 + detail * 0.3;
        waves += 0.10 * sin(uv.y * 35.0 + t * 1.6);

        vec2 waveOffset = vec2((waves - 0.5) * 0.03, (waves - 0.5) * 0.03);

        // лёгкий параллакс
        vec2 mCentered = (uMouse - 0.5) * vec2(1.0, -1.0);
        vec2 parallaxOffset = mCentered * 0.004;

        // базовый UV с зумом/смещением
        vec2 baseUv = (uv - 0.5) / uTexScale + 0.5 + uTexOffset;
        vec2 distortedUv = baseUv + waveOffset - parallaxOffset;

        // COVER по реальному аспекту текстуры (без искажений)
        vec2 texUv = distortedUv;

        if (screenAspect < uTexAspect) {
          // портрет / узкий экран → режем по Y
          float scale = uTexAspect / screenAspect;
          texUv.y = (texUv.y - 0.5) * scale + 0.5;
        } else {
          // широкий экран → режем по X
          float scale = screenAspect / uTexAspect;
          texUv.x = (texUv.x - 0.5) * scale + 0.5;
        }

        // маска "внутри текстуры", чтобы НЕ смазывать края clamp'ом
        float inside =
          step(0.0, texUv.x) * step(texUv.x, 1.0) *
          step(0.0, texUv.y) * step(texUv.y, 1.0);

        vec2 safeUv = clamp(texUv, 0.0, 1.0);
        vec4 tex = texture2D(uTexture, safeUv) * inside;

        float gray = dot(tex.rgb, vec3(0.299, 0.587, 0.114));
        gray *= (0.95 + 0.05 * sin(t * 0.5));

        float r = length(centered * 1.05);
        float vignette = smoothstep(1.10, 0.25, r);

        gl_FragColor = vec4(vec3(gray * vignette), 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const applyMobileFraming = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      const isPortrait = h > w;
      const isSmall = w < 768;

      // подбираем кадрирование именно для мобильного портрета
      if (isSmall && isPortrait) {
        uniforms.uTexScale.value = 1.15;              // чуть приблизить (убрать «пустоту»)
        uniforms.uTexOffset.value.set(0.0, -0.06);    // слегка вниз (чтобы пик не упирался)
      } else if (isPortrait) {
        uniforms.uTexScale.value = 1.08;
        uniforms.uTexOffset.value.set(0.0, -0.03);
      } else {
        uniforms.uTexScale.value = 1.0;
        uniforms.uTexOffset.value.set(0.0, 0.0);
      }
    };

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/images/blackhole.png", (tex) => {
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;

      // реальный аспект картинки!
      const img = tex.image as HTMLImageElement | undefined;
      if (img?.width && img?.height) {
        uniforms.uTexAspect.value = img.width / img.height;
      }

      uniforms.uTexture.value = tex;
      applyMobileFraming();
    });

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
      applyMobileFraming();
    };
    window.addEventListener("resize", onResize);

    const onMouseMove = (e: MouseEvent) => {
      uniforms.uMouse.value.set(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMouseMove);

    let frameId = 0;
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
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}
