// Direct Three.js understanding graph. This avoids the force-graph wrapper
// that pulled an incompatible `three/webgpu` import into the Vite build.

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { getSystem } from "@/features/analogy/systems";
import type { GraphEdge, GraphNode } from "../types";
import { edgeStyle } from "../types";
import { computeDegree, computeWeight } from "../weights";

type Props = {
  nodes: GraphNode[];
  edges: GraphEdge[];
  focusId: string | null;
  onFocusNode: (id: string) => void;
  onSelectEdge: (edge: GraphEdge) => void;
};

type PlacedNode = GraphNode & {
  weight: number;
  degree: number;
  color: string;
  position: THREE.Vector3;
};

const systemColors: Record<string, string> = {
  building_lego: "#c9a27a",
  cooking_recipe: "#d98a6a",
  storage_organization: "#a3b18a",
  traffic_flow: "#e0b25a",
  relationship_dynamics: "#d98aa6",
  gaming_progression: "#7aa6d9",
  story_narrative: "#b39ddb",
  company_startup: "#90a4ae",
  sports_team_strategy: "#80cbc4",
  film_production: "#9e8a7a",
  social_media: "#8ad1c7",
  music_playlist: "#b388eb",
};

const stateOpacity: Record<GraphNode["state"], number> = {
  clicked: 1,
  kinda: 0.76,
  unclear: 0.48,
};

const sphericalPoint = (index: number, total: number, radius: number) => {
  const phi = Math.acos(1 - (2 * (index + 0.5)) / Math.max(total, 1));
  const theta = Math.PI * (1 + Math.sqrt(5)) * index;
  return new THREE.Vector3(
    Math.cos(theta) * Math.sin(phi) * radius,
    Math.sin(theta) * Math.sin(phi) * radius,
    Math.cos(phi) * radius,
  );
};

const makeLabel = (text: string, focused: boolean) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const fontSize = focused ? 42 : 32;
  const padding = 18;
  const safeText = text.length > 28 ? `${text.slice(0, 25)}…` : text;
  canvas.width = 512;
  canvas.height = 128;
  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = `${fontSize}px Georgia, serif`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    const width = Math.min(484, context.measureText(safeText).width + padding * 2);
    const x = (canvas.width - width) / 2;
    context.fillStyle = "rgba(22, 17, 12, 0.76)";
    context.beginPath();
    context.roundRect(x, 34, width, 60, 12);
    context.fill();
    context.fillStyle = "rgba(244, 234, 216, 0.95)";
    context.fillText(safeText, canvas.width / 2, 64);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(focused ? 42 : 32, focused ? 10.5 : 8, 1);
  return sprite;
};

export const GraphCanvas3D = ({
  nodes,
  edges,
  focusId,
  onFocusNode,
  onSelectEdge,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const onFocusRef = useRef(onFocusNode);
  const onSelectEdgeRef = useRef(onSelectEdge);

  useEffect(() => {
    onFocusRef.current = onFocusNode;
    onSelectEdgeRef.current = onSelectEdge;
  }, [onFocusNode, onSelectEdge]);

  const activeEdges = useMemo(() => edges.filter((e) => e.status === "active"), [edges]);

  const placed = useMemo(() => {
    const groups = new Map<string, GraphNode[]>();
    nodes.forEach((node) => {
      const key = getSystem(node.system).id;
      groups.set(key, [...(groups.get(key) ?? []), node]);
    });

    const anchors = Array.from(groups.keys()).map((key, index, all) => ({
      key,
      anchor: sphericalPoint(index, all.length, Math.max(80, all.length * 48)),
    }));

    const result = new Map<string, PlacedNode>();
    anchors.forEach(({ key, anchor }) => {
      const groupNodes = groups.get(key) ?? [];
      groupNodes
        .sort((a, b) => computeWeight(b, activeEdges) - computeWeight(a, activeEdges))
        .forEach((node, index) => {
          const degree = computeDegree(node.id, activeEdges);
          const weight = computeWeight(node, activeEdges);
          const local = index === 0 ? new THREE.Vector3() : sphericalPoint(index - 1, groupNodes.length - 1, 18 + groupNodes.length * 7);
          const edgePull = activeEdges.some((e) => e.from === node.id || e.to === node.id) ? 0.68 : 1;
          result.set(node.id, {
            ...node,
            weight,
            degree,
            color: systemColors[key] ?? "#a89b8c",
            position: anchor.clone().multiplyScalar(edgePull).add(local),
          });
        });
    });
    return result;
  }, [nodes, activeEdges]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 520;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x17120e, 0.0025);

    const camera = new THREE.PerspectiveCamera(58, width / height, 0.1, 1800);
    const focus = focusId ? placed.get(focusId)?.position : undefined;
    camera.position.set((focus?.x ?? 0) + 0, (focus?.y ?? 0) + 54, (focus?.z ?? 0) + 255);
    camera.lookAt(focus ?? new THREE.Vector3());

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xf4ead8, 1.3));
    const light = new THREE.DirectionalLight(0xfff3df, 1.6);
    light.position.set(60, 80, 120);
    scene.add(light);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const clickableNodes: THREE.Object3D[] = [];
    const clickableLinks: THREE.Object3D[] = [];
    const graphGroup = new THREE.Group();
    scene.add(graphGroup);

    activeEdges.forEach((edge) => {
      const from = placed.get(edge.from);
      const to = placed.get(edge.to);
      if (!from || !to) return;
      const meta = edgeStyle[edge.type];
      const material = new THREE.LineBasicMaterial({
        color: meta.tone === "structural" ? 0xbaa28f : 0xb99bd4,
        transparent: true,
        opacity: edge.from === focusId || edge.to === focusId ? 0.82 : 0.42,
      });
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([from.position, to.position]), material);
      line.userData = { edge };
      graphGroup.add(line);

      const hit = new THREE.Mesh(
        new THREE.CylinderGeometry(2.2, 2.2, from.position.distanceTo(to.position), 8),
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }),
      );
      hit.position.copy(from.position).add(to.position).multiplyScalar(0.5);
      hit.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), to.position.clone().sub(from.position).normalize());
      hit.userData = { edge };
      clickableLinks.push(hit);
      graphGroup.add(hit);
    });

    placed.forEach((node) => {
      const isFocus = node.id === focusId;
      const radius = Math.max(3.8, node.weight * 1.05);
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 28, 20),
        new THREE.MeshStandardMaterial({
          color: new THREE.Color(node.color),
          roughness: 0.42,
          metalness: 0.18,
          transparent: true,
          opacity: stateOpacity[node.state],
        }),
      );
      sphere.position.copy(node.position);
      sphere.userData = { nodeId: node.id };
      clickableNodes.push(sphere);
      graphGroup.add(sphere);

      if (isFocus) {
        const glow = new THREE.Mesh(
          new THREE.SphereGeometry(radius * 1.65, 28, 20),
          new THREE.MeshBasicMaterial({ color: 0xf4ead8, transparent: true, opacity: 0.12 }),
        );
        glow.position.copy(node.position);
        graphGroup.add(glow);
      }

      if (node.weight > 4.4 || isFocus) {
        const label = makeLabel(node.concept, isFocus);
        label.position.copy(node.position).add(new THREE.Vector3(0, radius + 9, 0));
        graphGroup.add(label);
      }
    });

    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let rotationVelocity = 0.0015;
    const target = focus ?? new THREE.Vector3();

    const setPointer = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handlePointerDown = (event: PointerEvent) => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      renderer.domElement.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
      graphGroup.rotation.y += dx * 0.006;
      graphGroup.rotation.x += dy * 0.003;
      rotationVelocity = dx * 0.00004;
    };

    const handlePointerUp = (event: PointerEvent) => {
      dragging = false;
      renderer.domElement.releasePointerCapture(event.pointerId);
      setPointer(event);
      raycaster.setFromCamera(pointer, camera);
      const nodeHit = raycaster.intersectObjects(clickableNodes, false)[0];
      if (nodeHit?.object.userData.nodeId) {
        onFocusRef.current(nodeHit.object.userData.nodeId);
        return;
      }
      const linkHit = raycaster.intersectObjects(clickableLinks, false)[0];
      if (linkHit?.object.userData.edge) onSelectEdgeRef.current(linkHit.object.userData.edge);
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const direction = camera.position.clone().sub(target).normalize();
      const distance = camera.position.distanceTo(target);
      const next = THREE.MathUtils.clamp(distance + event.deltaY * 0.22, 90, 620);
      camera.position.copy(target).add(direction.multiplyScalar(next));
    };

    renderer.domElement.addEventListener("pointerdown", handlePointerDown);
    renderer.domElement.addEventListener("pointermove", handlePointerMove);
    renderer.domElement.addEventListener("pointerup", handlePointerUp);
    renderer.domElement.addEventListener("wheel", handleWheel, { passive: false });

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (!dragging) graphGroup.rotation.y += rotationVelocity;
      renderer.render(scene, camera);
    };
    animate();

    const resize = () => {
      const nextWidth = container.clientWidth || width;
      const nextHeight = container.clientHeight || height;
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
      renderer.domElement.removeEventListener("pointerup", handlePointerUp);
      renderer.domElement.removeEventListener("wheel", handleWheel);
      container.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Sprite) {
          object.geometry?.dispose?.();
          const material = object.material;
          if (Array.isArray(material)) material.forEach((m) => m.dispose());
          else material?.dispose?.();
        }
      });
      renderer.dispose();
    };
  }, [placed, activeEdges, focusId]);

  return (
    <div
      ref={containerRef}
      className="relative h-[68vh] min-h-[460px] w-full overflow-hidden rounded-3xl border bg-[hsl(25_22%_8%)]"
    >
      <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-background/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground/60 backdrop-blur">
        drag to rotate · scroll to zoom · click a node to focus
      </div>

      {nodes.length > 0 && activeEdges.length === 0 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-6 text-center text-xs text-foreground/55">
          no connections yet — clusters will form as you accept relationships
        </div>
      )}
    </div>
  );
};