import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import {
  SiReact, SiVite, SiTypescript, SiJavascript, SiHtml5, SiCss3, SiTailwindcss,
  SiNodedotjs, SiExpress, SiNextdotjs, SiRemix, SiAngular, SiVuedotjs, SiSvelte,
  SiRedux, SiWebpack, SiBabel, SiRollupdotjs, SiJest, SiVitest, SiCypress,
  SiStorybook, SiPrisma, SiMongodb, SiPostgresql, SiMysql, SiFirebase, SiSupabase,
  SiDocker, SiKubernetes, SiGit, SiGithub, SiGitlab, SiBitbucket, SiNpm, SiYarn,
  SiExpo, SiAndroid, SiApple, SiSwift, SiKotlin, SiFlutter, SiDart, SiGraphql,
} from "react-icons/si";

export type TechSliderProps = {
  duration?: number;
  iconSize?: number;
  gap?: number;
  className?: string;
  direction?: "right" | "left";
};

const ICONS = [
  { name: "React", Icon: SiReact }, { name: "Vite", Icon: SiVite },
  { name: "TypeScript", Icon: SiTypescript }, { name: "JavaScript", Icon: SiJavascript },
  { name: "HTML5", Icon: SiHtml5 }, { name: "CSS3", Icon: SiCss3 },
  { name: "Tailwind", Icon: SiTailwindcss }, { name: "Node.js", Icon: SiNodedotjs },
  { name: "Express", Icon: SiExpress }, { name: "Next.js", Icon: SiNextdotjs },
  { name: "Remix", Icon: SiRemix }, { name: "Angular", Icon: SiAngular },
  { name: "Vue", Icon: SiVuedotjs }, { name: "Svelte", Icon: SiSvelte },
  { name: "Redux", Icon: SiRedux }, { name: "Webpack", Icon: SiWebpack },
  { name: "Babel", Icon: SiBabel }, { name: "Rollup", Icon: SiRollupdotjs },
  { name: "Jest", Icon: SiJest }, { name: "Vitest", Icon: SiVitest },
  { name: "Cypress", Icon: SiCypress }, { name: "Storybook", Icon: SiStorybook },
  { name: "Prisma", Icon: SiPrisma }, { name: "MongoDB", Icon: SiMongodb },
  { name: "PostgreSQL", Icon: SiPostgresql }, { name: "MySQL", Icon: SiMysql },
  { name: "Firebase", Icon: SiFirebase }, { name: "Supabase", Icon: SiSupabase },
  { name: "Docker", Icon: SiDocker }, { name: "Kubernetes", Icon: SiKubernetes },
  { name: "Git", Icon: SiGit }, { name: "GitHub", Icon: SiGithub },
  { name: "GitLab", Icon: SiGitlab }, { name: "Bitbucket", Icon: SiBitbucket },
  { name: "npm", Icon: SiNpm }, { name: "Yarn", Icon: SiYarn },
  { name: "Expo", Icon: SiExpo }, { name: "Android", Icon: SiAndroid },
  { name: "Apple iOS", Icon: SiApple }, { name: "Swift", Icon: SiSwift },
  { name: "Kotlin", Icon: SiKotlin }, { name: "Flutter", Icon: SiFlutter },
  { name: "Dart", Icon: SiDart }, { name: "GraphQL", Icon: SiGraphql },
] as const;

function IconRow({ iconSize = 36, gapPx = 24 }: { iconSize?: number; gapPx?: number }) {
  return (
    <ul className="flex items-center whitespace-nowrap">
      {ICONS.map(({ name, Icon }) => (
        <li key={name} className="flex items-center" style={{ marginInline: gapPx / 2 }}>
          <div className="flex flex-col items-center justify-center">
            <Icon size={iconSize} aria-hidden className="drop-shadow-sm" />
            <span className="mt-2 text-xs opacity-70 select-none">{name}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function TechSlider({
  duration = 44,
  iconSize = 40,
  gap = 6,
  className = "",
  direction = "right",
}: TechSliderProps) {
  const baseX = useMotionValue(0);
  const segmentRef = useRef<HTMLUListElement | null>(null);
  const segmentWidth = useRef(0);
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useLayoutEffect(() => {
    if (!segmentRef.current) return;
    const measure = () => {
      segmentWidth.current = segmentRef.current?.getBoundingClientRect().width || 0;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(segmentRef.current);
    return () => ro.disconnect();
  }, []);

  const x = useTransform(baseX, (v: number) => {
    const w = segmentWidth.current || 1;
    const m = ((v % w) + w) % w;
    return m - w;
  });

  useEffect(() => {
    startLoop();
    return () => controlsRef.current?.stop();
  }, [duration, direction]);

  const startLoop = () => {
    controlsRef.current?.stop();
    const w = Math.max(segmentWidth.current, 600);
    const from = baseX.get();
    const to = direction === "right" ? from + w : from - w;
    controlsRef.current = animate(baseX, to, {
      ease: "linear",
      duration,
      repeat: Infinity,
    });
  };

  const pause = () => controlsRef.current?.stop();

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    pause();
    setIsDragging(true);
    const el = e.currentTarget as HTMLElement;
    el.setPointerCapture(e.pointerId);

    let lastX = e.clientX;
    let moved = false;
    const THRESHOLD = 2;

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - lastX;
      if (!moved && Math.abs(ev.clientX - e.clientX) < THRESHOLD) return;
      moved = true;
      lastX = ev.clientX;
      baseX.set(baseX.get() + dx);
    };

    const onUp = () => {
      el.releasePointerCapture(e.pointerId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      setIsDragging(false);
      startLoop();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
  };

  const gapPx = gap * 4;

  return (
    <div
      className={
        "relative w-full overflow-hidden py-6 select-none touch-none " +
        className
      }
      onPointerDown={onPointerDown}
      aria-label="Technology logo slider"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent" />

      <motion.div
        className="flex items-center whitespace-nowrap will-change-transform"
        style={{ x, cursor: isDragging ? "grabbing" : "grab" }}
      >
        <div className="flex" aria-hidden>
          <ul ref={segmentRef} className="flex items-center">
            {ICONS.map(({ name, Icon }) => (
              <li key={name} className="flex items-center" style={{ marginInline: gapPx / 2 }}>
                <div className="flex flex-col items-center justify-center">
                  <Icon size={iconSize} aria-hidden className="drop-shadow-sm" />
                  <span className="mt-2 text-xs opacity-70 select-none">{name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <IconRow iconSize={iconSize} gapPx={gapPx} />
        <IconRow iconSize={iconSize} gapPx={gapPx} />
        <IconRow iconSize={iconSize} gapPx={gapPx} />
        <IconRow iconSize={iconSize} gapPx={gapPx} />
      </motion.div>

    </div>
  );
}
