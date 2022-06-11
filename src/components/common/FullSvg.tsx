import React, { useEffect, useRef, useState } from "react";

interface FullSvgProps {
  children: React.ReactNode;
}

export function FullSvg({ children }: FullSvgProps) {
  const [areaSize, setMindMapAreaSize] = useState({ width: 0, height: 0 });

  const areaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let mounted = true;
    function layout() {
      if (!mounted) {
        return;
      }
      const div = areaRef.current;
      if (!div) {
        return;
      }
      const { clientHeight, clientWidth } = div;
      setMindMapAreaSize((prev) => {
        if (prev.width === clientWidth && prev.height === clientHeight) {
          return prev;
        }
        return {
          width: clientWidth,
          height: clientHeight,
        };
      });
      requestAnimationFrame(layout);
    }

    layout();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div ref={areaRef} className="h-full">
      <svg
        viewBox={`0 0 ${areaSize.width} ${areaSize.height}`}
        width={areaSize.width}
        height={areaSize.height}
      >
        <rect
          x="10"
          y="10"
          width={areaSize.width - 20 < 0 ? 0 : areaSize.width - 20}
          height={areaSize.height - 20 < 0 ? 0 : areaSize.height - 20}
          fill="#48f"
        />
        {children}
      </svg>
    </div>
  );
}
