import { useRef, useCallback } from "react";

const isDevice =
  /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    navigator.userAgent?.toLowerCase() || "",
  );

const heartPosition = (rad) => [
  Math.pow(Math.sin(rad), 3),
  -(
    15 * Math.cos(rad) -
    5 * Math.cos(2 * rad) -
    2 * Math.cos(3 * rad) -
    Math.cos(4 * rad)
  ),
];

const scaleAndTranslate = (pos, sx, sy, dx, dy) => [
  dx + pos[0] * sx,
  dy + pos[1] * sy,
];

export const useHeartAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const isInitializedRef = useRef(false);

  const koef = isDevice ? 0.5 : 1;
  const traceCount = isDevice ? 20 : 50;
  const dr = isDevice ? 0.3 : 0.1;

  const initAnimation = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isInitializedRef.current) return null;

    isInitializedRef.current = true;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    let width = (canvas.width = koef * window.innerWidth);
    let height = (canvas.height = koef * window.innerHeight);

    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(0, 0, width, height);

    // ===== HEART POINTS =====
    const pointsOrigin = [];

    for (let i = 0; i < Math.PI * 2; i += dr) {
      pointsOrigin.push(scaleAndTranslate(heartPosition(i), 210, 13, 0, 0));
    }

    for (let i = 0; i < Math.PI * 2; i += dr) {
      pointsOrigin.push(scaleAndTranslate(heartPosition(i), 150, 9, 0, 0));
    }

    for (let i = 0; i < Math.PI * 2; i += dr) {
      pointsOrigin.push(scaleAndTranslate(heartPosition(i), 90, 5, 0, 0));
    }

    const heartPointsCount = pointsOrigin.length;

    // ===== TARGET POINTS =====
    const targetPoints = [];

    const pulse = (kx, ky) => {
      for (let i = 0; i < pointsOrigin.length; i++) {
        targetPoints[i] = [];

        targetPoints[i][0] = kx * pointsOrigin[i][0] + width / 2;

        targetPoints[i][1] = ky * pointsOrigin[i][1] + height / 2;
      }
    };

    // ===== PARTICLES =====
    const rand = Math.random;

    const particles = [];

    for (let i = 0; i < heartPointsCount; i++) {
      const x = rand() * width;
      const y = rand() * height;

      particles.push({
        vx: 0,
        vy: 0,
        R: 2,
        speed: rand() + 5,
        q: ~~(rand() * heartPointsCount),
        D: 2 * (i % 2) - 1,
        force: 0.2 * rand() + 0.7,
        f: `hsla(0, ${~~(40 * rand() + 60)}%, ${~~(60 * rand() + 20)}%, .3)`,
        trace: Array.from({ length: traceCount }, () => ({
          x,
          y,
        })),
      });
    }

    const config = {
      traceK: 0.4,
      timeDelta: 0.01,
    };

    // ===== RESIZE =====
    const handleResize = () => {
      width = canvas.width = koef * window.innerWidth;
      height = canvas.height = koef * window.innerHeight;

      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fillRect(0, 0, width, height);
    };

    window.addEventListener("resize", handleResize);

    // ===== ANIMATION =====
    let time = 0;

    const animate = () => {
      const n = -Math.cos(time);
      pulse((1 + n) * 0.5, (1 + n) * 0.5);

      time +=
        (Math.sin(time) < 0 ? 9 : n > 0.8 ? 0.2 : 1) * config.timeDelta;

      ctx.fillStyle = "rgba(0,0,0,.1)";
      ctx.fillRect(0, 0, width, height);

      for (let i = particles.length; i--; ) {
        const u = particles[i];
        const q = targetPoints[u.q];

        const dx = u.trace[0].x - q[0];
        const dy = u.trace[0].y - q[1];

        const length = Math.sqrt(dx * dx + dy * dy);

        if (length < 10) {
          if (0.95 < rand()) {
            u.q = ~~(rand() * heartPointsCount);
          } else {
            if (0.99 < rand()) {
              u.D *= -1;
            }

            u.q += u.D;
            u.q %= heartPointsCount;

            if (u.q < 0) {
              u.q += heartPointsCount;
            }
          }
        }

        u.vx += (-dx / length) * u.speed;
        u.vy += (-dy / length) * u.speed;

        u.trace[0].x += u.vx;
        u.trace[0].y += u.vy;

        u.vx *= u.force;
        u.vy *= u.force;

        for (let k = 0; k < u.trace.length - 1; ) {
          const T = u.trace[k];
          const N = u.trace[++k];

          N.x -= config.traceK * (N.x - T.x);
          N.y -= config.traceK * (N.y - T.y);
        }

        ctx.fillStyle = u.f;

        for (let k = 0; k < u.trace.length; k++) {
          ctx.fillRect(u.trace[k].x, u.trace[k].y, 1, 1);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // ===== CLEANUP =====
    return () => {
      isInitializedRef.current = false;
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [koef, traceCount, dr]);

  return { canvasRef, initAnimation };
};
