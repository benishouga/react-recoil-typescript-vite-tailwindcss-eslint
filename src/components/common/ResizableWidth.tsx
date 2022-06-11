import { useCallback, useEffect, useState } from "react";

export interface ResizableWidthProps {
  defaultWidth: number;
  resizableArea: React.ReactNode;
  children: React.ReactNode;
}

export function ResizableWidth({
  defaultWidth,
  resizableArea,
  children,
}: ResizableWidthProps) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(defaultWidth);
  const [startingX, setStartingX] = useState<number>(0);
  const [startingWitdh, setStartingWitdh] = useState<number>(0);
  const startDrag = useCallback<React.MouseEventHandler<unknown>>(
    (e) => {
      setIsDragging(true);
      setStartingX(e.pageX);
      setStartingWitdh(width);
    },
    [width]
  );

  const dragging = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      setWidth(Math.max(0, startingWitdh + e.pageX - startingX));
      getSelection()?.removeAllRanges();
    },
    [isDragging, startingWitdh, startingX]
  );

  const mouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
  }, [isDragging]);

  useEffect(() => {
    if (!isDragging) return;
    document.body.addEventListener("mousemove", dragging);
    window.addEventListener("mouseup", mouseUp);
    return () => {
      document.body.removeEventListener("mousemove", dragging);
      window.removeEventListener("mouseup", mouseUp);
    };
  }, [isDragging, dragging, mouseUp]);

  return (
    <div className="flex flex-1 overflow-x-hidden">
      <div className="overflow-x-hidden" style={{ width }}>
        <div className="bg-primary-100 w-full h-full">{resizableArea}</div>
      </div>
      <div
        className={`cursor-e-resize w-1 ${
          isDragging ? "bg-primary-600" : "bg-primary-200"
        }`}
        style={{ width: "0.3rem" }}
        onMouseDown={startDrag}
      ></div>
      <div className="flex-1 overflow-x-hidden">{children}</div>
    </div>
  );
}
