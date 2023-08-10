<script lang="ts">
  import { hexToRgb } from "$lib/utils";
  import { onMount } from "svelte";

  let canvasRef: HTMLCanvasElement | null = null;
  let canvasContainerRef: HTMLDivElement | null = null;
  let context: CanvasRenderingContext2D | null = null;
  const circles: any[] = [];
  let mousePosition = { x: 0, y: 0 };
  const mouse = { x: 0, y: 0 };
  const canvasSize = { w: 0, h: 0 };
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  export let color = "#FFFF00";
  export let quantity = 50;
  export let staticity = 50;
  export let ease = 50;
  export let vx = 0;
  export let vy = 0;

  onMount(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.x = event.clientX;
      mousePosition.y = event.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    canvasRef = document.getElementById("canvas") as HTMLCanvasElement;
    canvasContainerRef = document.getElementById(
      "canvas-ref"
    ) as HTMLDivElement;

    if (canvasRef) {
      context = canvasRef.getContext("2d");
    }
    initCanvas();
    animate();
    window.addEventListener("resize", initCanvas);
    return () => {
      window.removeEventListener("resize", initCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });
  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const onMouseMove = () => {
    if (canvasRef) {
      const rect = canvasRef.getBoundingClientRect();
      const { w, h } = canvasSize;
      const x = mousePosition.x - rect.left - w / 2;
      const y = mousePosition.y - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) {
        mouse.x = x;
        mouse.y = y;
      }
    }
  };

  $: {
    mousePosition;
    onMouseMove();
  }
  $: initCanvas();

  type Circle = {
    x: number;
    y: number;
    translateX: number;
    translateY: number;
    size: number;
    alpha: number;
    targetAlpha: number;
    dx: number;
    dy: number;
    magnetism: number;
  };

  const resizeCanvas = () => {
    if (canvasContainerRef && canvasRef && context) {
      circles.length = 0;
      canvasSize.w = canvasContainerRef.offsetWidth;
      canvasSize.h = canvasContainerRef.offsetHeight;
      canvasRef.width = canvasSize.w * dpr;
      canvasRef.height = canvasSize.h * dpr;
      canvasRef.style.width = `${canvasSize.w}px`;
      canvasRef.style.height = `${canvasSize.h}px`;
      context.scale(dpr, dpr);
    }
  };

  const circleParams = (): Circle => {
    const x = Math.floor(Math.random() * canvasSize.w);
    const y = Math.floor(Math.random() * canvasSize.h);
    const translateX = 0;
    const translateY = 0;
    const size = Math.floor(Math.random() * 2) + 1;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.2;
    const dy = (Math.random() - 0.5) * 0.2;
    const magnetism = 0.1 + Math.random() * 4;
    return {
      x,
      y,
      translateX,
      translateY,
      size,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  };

  const rgb = hexToRgb(color);

  const drawCircle = (circle: Circle, update = false) => {
    if (context) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      context.translate(translateX, translateY);
      context.beginPath();
      context.arc(x, y, size, 0, 2 * Math.PI);
      context.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
      context.fill();
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!update) {
        circles.push(circle);
      }
    }
  };

  const clearContext = () => {
    if (context) {
      context.clearRect(0, 0, canvasSize.w, canvasSize.h);
    }
  };

  const drawParticles = () => {
    clearContext();
    const particleCount = quantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  };

  const remapValue = (
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number
  ): number => {
    const remapped =
      ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  const animate = () => {
    clearContext();
    circles.forEach((circle: Circle, i: number) => {
      // Handle the alpha value
      const edge = [
        circle.x + circle.translateX - circle.size, // distance from left edge
        canvasSize.w - circle.x - circle.translateX - circle.size, // distance from right edge
        circle.y + circle.translateY - circle.size, // distance from top edge
        canvasSize.h - circle.y - circle.translateY - circle.size, // distance from bottom edge
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
      );
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha;
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }
      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;
      circle.translateX +=
        (mouse.x / (staticity / circle.magnetism) - circle.translateX) / ease;
      circle.translateY +=
        (mouse.y / (staticity / circle.magnetism) - circle.translateY) / ease;
      // circle gets out of the canvas
      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.h + circle.size
      ) {
        // remove the circle from the array
        circles.splice(i, 1);
        // create a new circle
        const newCircle = circleParams();
        drawCircle(newCircle);
        // update the circle position
      } else {
        drawCircle(
          {
            ...circle,
            x: circle.x,
            y: circle.y,
            translateX: circle.translateX,
            translateY: circle.translateY,
            alpha: circle.alpha,
          },
          true
        );
      }
    });
    window.requestAnimationFrame(animate);
  };
</script>

<div id="canvas-ref">
  <canvas id="canvas" />
</div>
