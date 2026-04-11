import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handleFirst = () => onChange(1);
  const handleLast = () => onChange(totalPages);
  const handlePrev = () => onChange(Math.max(1, page - 1));
  const handleNext = () => onChange(Math.min(totalPages, page + 1));
  const handlePageChange = (selectedItem: { selected: number }) =>
    onChange(selectedItem.selected + 1);

  return (
    <div className={css.pagination_box}>
      <button
        className={`${css.page} ${page === 1 ? css.disabled : ''}`}
        onClick={handleFirst}
        disabled={page === 1}
      >
        ◀◀
      </button>

      <button
        className={`${css.page} ${page === 1 ? css.disabled : ''}`}
        onClick={handlePrev}
        disabled={page === 1}
      >
        ◀
      </button>

      <ReactPaginate
        pageCount={totalPages}
        forcePage={page - 1}
        pageRangeDisplayed={1}
        marginPagesDisplayed={0}
        onPageChange={handlePageChange}
        breakLabel="…"
        containerClassName={css.pagination}
        pageClassName={css.page}
        breakClassName={css.page}
        activeClassName={css.active}
        disabledClassName={css.disabled}
        previousLabel={null}
        nextLabel={null}
      />

      <button
        className={`${css.page} ${page === totalPages ? css.disabled : ''}`}
        onClick={handleNext}
        disabled={page === totalPages}
      >
        ▶
      </button>

      <button
        className={`${css.page} ${page === totalPages ? css.disabled : ''}`}
        onClick={handleLast}
        disabled={page === totalPages}
      >
        ▶▶
      </button>
    </div>
  );
}
