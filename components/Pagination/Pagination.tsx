'use client';

import Button from '../Button/Button';
import css from './Pagination.module.css';

interface Props {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
}

const Pagination = ({ hasNextPage, isFetchingNextPage, onLoadMore }: Props) => {
  if (!hasNextPage && !isFetchingNextPage) return null;

  return (
    <div className={css.wrapper}>
      {isFetchingNextPage ? (
        <div className={css.spinner} />
      ) : (
        <Button
          variant="outline"
          onClick={onLoadMore}
          disabled={isFetchingNextPage}
          isLoading={isFetchingNextPage}
          loadingText="Loading..."
        >
          Load more
        </Button>
      )}
    </div>
  );
};

export default Pagination;
