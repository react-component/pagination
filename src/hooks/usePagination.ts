import useMergedState from 'rc-util/lib/hooks/useMergedState';

type ItemType =
  | 'prev'
  | 'jump-prev'
  | 'after-jump-prev'
  | 'page'
  | 'jump-next'
  | 'before-jump-next'
  | 'next';
type ItemRenderType = Exclude<
  ItemType,
  'page' | 'before-jump-next' | 'after-jump-prev'
>;

type UsePaginationProps = {
  /** @default 1 */
  total?: number;
  current?: number;
  /** @default 1 */
  defaultCurrent?: number;
  onChange?: (page: number, prevPage: number) => void;
  disabled?: boolean;
  /** @default false */
  lessItems?: boolean;
};

// https://dev.to/namirsab/comment/2050
const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

const usePagination = (props: UsePaginationProps = {}) => {
  const {
    total = 0,
    defaultCurrent = 1,
    current,
    onChange,
    disabled,
    lessItems,
  } = props;

  const [innerCurrent, setInnerCurrent] = useMergedState(1, {
    value: current,
    defaultValue: defaultCurrent,
  });

  const pageBufferSize = lessItems ? 1 : 2;

  let pagerList = [];

  if (total <= 3 + pageBufferSize * 2) {
    pagerList = range(1, total);
  }

  let left = Math.max(1, innerCurrent - pageBufferSize);
  let right = Math.min(innerCurrent + pageBufferSize, total);

  if (innerCurrent - 1 <= pageBufferSize) {
    right = 1 + pageBufferSize * 2;
  }

  if (total - innerCurrent <= pageBufferSize) {
    left = total - pageBufferSize * 2;
  }

  const itemList = [
    'prev',
    // ...startPages,
    // Start ellipsis
  ];
};
