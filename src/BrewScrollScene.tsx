import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ritualImages } from "./data/content";

const stages = [
  {
    number: "01",
    title: "Let water enter.",
    copy: "Filtered, measured, and heated for the bean in front of us.",
  },
  {
    number: "02",
    title: "The bean confesses.",
    copy: "A steady pour and patient extraction bring clarity into the cup.",
  },
  {
    number: "03",
    title: "The dark cup remains.",
    copy: "Black, aromatic, and complete without milk or sugar.",
  },
];

export default function BrewScrollScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const copy = copyRef.current;

    if (!section || !canvas || !copy) return;

    // Three.js needs a renderer, a scene, and a camera.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = reduceMotion.matches;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.1, 9.8);

    // Build a simple coffee cup from basic 3D shapes.
    const cup = new THREE.Group();
    const ceramic = new THREE.MeshPhysicalMaterial({
      color: 0x485345,
      roughness: 0.72,
      metalness: 0,
      clearcoat: 0.06,
      clearcoatRoughness: 0.82,
      side: THREE.DoubleSide,
    });
    const ceramicDark = new THREE.MeshStandardMaterial({
      color: 0x2f382e,
      roughness: 0.82,
    });
    const coffeeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x2a130b,
      roughness: 0.18,
      clearcoat: 0.7,
      clearcoatRoughness: 0.16,
    });

    const cupBody = new THREE.Mesh(
      new THREE.CylinderGeometry(1.24, 0.92, 1.78, 72, 1, true),
      ceramic,
    );
    const cupBottom = new THREE.Mesh(
      new THREE.CircleGeometry(0.92, 72),
      ceramicDark,
    );
    cupBottom.rotation.x = -Math.PI / 2;
    cupBottom.position.y = -0.89;

    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(1.24, 0.065, 18, 72),
      ceramic,
    );
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.89;

    const coffee = new THREE.Mesh(
      new THREE.CircleGeometry(1.17, 72),
      coffeeMaterial,
    );
    coffee.rotation.x = -Math.PI / 2;
    coffee.position.y = 0.87;

    const handle = new THREE.Mesh(
      new THREE.TorusGeometry(0.66, 0.145, 24, 72),
      ceramic,
    );
    handle.position.set(1.18, 0.04, 0);
    handle.scale.x = 0.78;

    const saucer = new THREE.Mesh(
      new THREE.CylinderGeometry(1.82, 1.62, 0.13, 72),
      ceramic,
    );
    saucer.position.y = -1.08;

    const saucerInset = new THREE.Mesh(
      new THREE.TorusGeometry(1.15, 0.035, 12, 72),
      ceramicDark,
    );
    saucerInset.rotation.x = Math.PI / 2;
    saucerInset.position.y = -1;

    cup.add(cupBody, cupBottom, rim, coffee, handle, saucer, saucerInset);
    cup.rotation.set(0.12, -0.62, -0.04);
    scene.add(cup);

    const steamMaterial = new THREE.LineBasicMaterial({
      color: 0xd8c8b7,
      transparent: true,
      opacity: 0.18,
    });
    const steamLines: THREE.Line[] = [];

    [-0.3, 0.3].forEach((x, index) => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(x, 1.08, 0),
        new THREE.Vector3(x + 0.16, 1.48, 0.03),
        new THREE.Vector3(x - 0.13, 1.88, 0),
        new THREE.Vector3(x + 0.1, 2.32, -0.03),
      ]);
      const geometry = new THREE.BufferGeometry().setFromPoints(
        curve.getPoints(36),
      );
      const line = new THREE.Line(geometry, steamMaterial.clone());
      line.userData.phase = index * 0.9;
      cup.add(line);
      steamLines.push(line);
    });

    scene.add(new THREE.HemisphereLight(0xffead2, 0x24160f, 1.45));
    const keyLight = new THREE.DirectionalLight(0xffd5a6, 2.75);
    keyLight.position.set(-4, 5, 6);
    scene.add(keyLight);
    const edgeLight = new THREE.DirectionalLight(0x819174, 1.15);
    edgeLight.position.set(5, 0, 3);
    scene.add(edgeLight);

    // These values update as the user scrolls through the section.
    let frame = 0;
    let isVisible = false;
    let scrollProgress = 0;
    let currentProgress = 0;
    let lastTime = performance.now();

    const clamp = (value: number) => Math.min(1, Math.max(0, value));

    const updateScroll = () => {
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      scrollProgress = clamp(-rect.top / distance);
    };

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        renderer.setSize(width, height, false);
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
      }
      updateScroll();
    };

    const render = (time: number) => {
      frame = 0;
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      const target = prefersReducedMotion ? 0 : scrollProgress;
      currentProgress += (target - currentProgress) * Math.min(1, delta * 6.5);

      const p = currentProgress;
      const lift = Math.sin(p * Math.PI);

      // Move the cup a little as the page scrolls.
      cup.rotation.y = -0.28 + p * 0.56;
      cup.rotation.x = 0.08 - p * 0.06;
      cup.rotation.z = -0.015 + Math.sin(p * Math.PI * 2) * 0.01;
      cup.position.y = -0.18 + lift * 0.2;
      cup.position.x =
        window.innerWidth < 760
          ? 0.1
          : window.innerWidth < 1000
            ? 0.72 - p * 0.04
            : 1.18 - p * 0.08;
      const scale = (window.innerWidth < 760 ? 0.52 : 0.68) + lift * 0.035;
      cup.scale.setScalar(scale);

      const elapsed = prefersReducedMotion ? 0 : time * 0.001;
      steamLines.forEach((line) => {
        line.position.y = Math.sin(elapsed * 0.55 + line.userData.phase) * 0.045;
        (line.material as THREE.LineBasicMaterial).opacity =
          0.11 + Math.sin(elapsed * 0.65 + line.userData.phase) * 0.035;
      });

      const panels = Array.from(
        copy.querySelectorAll<HTMLElement>(".ritual-stage"),
      );
      const activeStage = p < 0.34 ? 0 : p < 0.68 ? 1 : 2;
      panels.forEach((panel, index) => {
        const isActive = index === activeStage;
        panel.style.opacity = isActive ? "1" : "0";
        panel.style.visibility = isActive ? "visible" : "hidden";
        panel.style.transform = `translate3d(0, ${(index - activeStage) * 28}px, 0)`;
        panel.setAttribute("aria-hidden", isActive ? "false" : "true");
      });

      section.style.setProperty("--ritual-progress", p.toFixed(4));
      section.style.setProperty("--photo-drift", `${(p * 28).toFixed(2)}px`);
      renderer.render(scene, camera);
      if (!prefersReducedMotion && isVisible) {
        frame = requestAnimationFrame(render);
      }
    };

    const onScroll = () => updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    resize();

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !prefersReducedMotion && frame === 0) {
          lastTime = performance.now();
          frame = requestAnimationFrame(render);
        } else if (!isVisible && frame !== 0) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { rootMargin: "120px 0px" },
    );
    visibilityObserver.observe(section);

    if (prefersReducedMotion) {
      render(performance.now());
    }

    return () => {
      // Clean up the animation and all Three.js objects when React unmounts.
      cancelAnimationFrame(frame);
      visibilityObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <section
      className="scene-section"
      ref={sectionRef}
      aria-labelledby="ritual-title"
    >
      <div className="scene-sticky">
        <div className="scene-photo-stage" aria-hidden="true">
          {ritualImages.map((image, index) => (
            <img
              className="scene-photo"
              src={image.src}
              alt=""
              key={image.src}
              width="960"
              height="640"
              loading="lazy"
              decoding="async"
              style={{ "--photo-index": index } as React.CSSProperties}
            />
          ))}
        </div>
        <canvas
          className="scene-canvas"
          ref={canvasRef}
          aria-hidden="true"
        />
        <div className="scene-glow" aria-hidden="true" />

        <div className="scene-frame">
          <div className="scene-heading">
            <p className="eyebrow text-[#b8c3ad]">
              The ritual
            </p>
            <h2
              id="ritual-title"
              className="text-[3.25rem] leading-[0.94] text-cream md:text-[clamp(3rem,6vw,5.8rem)]"
            >
              Three quiet acts.
            </h2>
          </div>

          <div className="scene-copy" ref={copyRef}>
            {stages.map((stage) => (
              <article
                className="ritual-stage scene-stage"
                key={stage.number}
              >
                <span className="mb-[15px] block text-xs font-bold tracking-[0.12em] text-[#c79967]">
                  {stage.number}
                </span>
                <h3 className="mb-3.5 text-[2.75rem] leading-none text-cream md:text-[clamp(2.5rem,4.5vw,4.7rem)]">
                  {stage.title}
                </h3>
                <p className="max-w-[330px] text-[0.95rem] leading-[1.55] text-cream/70 md:max-w-[380px] md:text-[1.03rem] md:leading-[1.7]">
                  {stage.copy}
                </p>
              </article>
            ))}
          </div>

          <div
            className="scene-progress"
            aria-hidden="true"
          >
            <span className="block h-full w-full origin-left scale-x-[var(--ritual-progress)] bg-[#d9ad77]" />
          </div>
        </div>
      </div>
    </section>
  );
}
