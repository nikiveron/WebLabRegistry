import type { ProductResult } from "../model/types";

interface ResultBadgeProps {
  result: ProductResult;
}

export function ResultBadge({
  result,
}: ResultBadgeProps) {
  const className = {
    "В работе": "result-badge result-in-progress",
    "Соответствует": "result-badge result-success",
    "Не соответствует": "result-badge result-failed",
  }[result];

  return (
    <span className={className}>
      {result}
    </span>
  );
}