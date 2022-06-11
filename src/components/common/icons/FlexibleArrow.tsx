export interface FlexibleArrowProps {
  width: number;
}
export function FlexibleArrow({ width }: FlexibleArrowProps) {
  const diff = width - 24;
  return (
    <svg width={24 + diff} height="24" fill="currentColor" aria-hidden="true">
      <path
        d={`M${17 + diff},7L${17 + diff},11H2V13h${15 + diff}L${
          17 + diff
        },17l5-5L${17 + diff},7z`}
      />
    </svg>
  );
}
