import { Button } from "../../../shared/ui/Button";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <Button
        variant="secondary"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        ←
      </Button>

      {Array.from(
        { length: totalPages },
        (_, index) => index + 1
      ).map((pageNumber) => (
        <button
          key={pageNumber}
          className={
            pageNumber === page
              ? "page-button active"
              : "page-button"
          }
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <Button
        variant="secondary"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        →
      </Button>
    </div>
  );
}