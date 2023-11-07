import useMergedState from 'rc-util/lib/hooks/useMergedState';
import type * as React from 'react';

type ItemType =
  | 'previous'
  | 'start-ellipsis'
  | 'page'
  | 'end-ellipsis'
  | 'next';
type ItemList = (Exclude<ItemType, 'page'> | number)[];

type UsePaginationProps = {
  /**
   * Total pages
   * @default 1
   */
  count?: number;
  current?: number;
  defaultCurrent?: number;
  onChange?: (page: number, prevPage: number) => void;
  disabled?: boolean;
  /**
   * [1, 2, ..., 4, 5, [6], 7, 8, ..., 10, 11] // boundaryCount = 2
   * @default 1
   */
  boundaryCount?: number;
  /**
   * [1, ..., 4, [5], 6, ... 10] // siblingCount = 1
   * @default 2
   */
  siblingCount?: number;
};

interface UsePaginationItem {
  onClick: React.ReactEventHandler;
  type: ItemType;
  page: number | null;
  selected: boolean;
  disabled: boolean;
}

type UsePaginationResult = UsePaginationItem[];

function usePagination(props: UsePaginationProps = {}): UsePaginationResult {
  const {
    count = 1,
    current: currentProp,
    defaultCurrent,
    onChange,
    disabled = false,
    boundaryCount = 1,
    siblingCount = 2,
  } = props;

  const [current, setCurrent] = useMergedState(1, {
    defaultValue: defaultCurrent,
    value: currentProp,
    onChange,
  });

  const startPages = range(1, Math.min(boundaryCount, count));

  const siblingsStart = Math.max(
    Math.min(current - siblingCount, count - boundaryCount - siblingCount * 2),
    boundaryCount + 1,
  );
  const startEllipsis: ItemList =
    siblingsStart > boundaryCount + 1
      ? ['start-ellipsis']
      : boundaryCount + 1 < count - boundaryCount
      ? [boundaryCount + 1]
      : [];

  const endPages = range(
    Math.max(count - boundaryCount, boundaryCount + 1),
    count,
  );

  const siblingsEnd = Math.min(
    Math.max(current + siblingCount, boundaryCount + siblingCount * 2 + 1),
    endPages.length > 0 ? endPages[0] - 2 : count - 1,
  );

  console.log({
    startPages,
    siblingsStart,
    startEllipsis,
    endPages,
    siblingsEnd,
  });

  const endEllipsis: ItemList =
    siblingsEnd < count - boundaryCount - 1
      ? ['end-ellipsis']
      : count - boundaryCount > boundaryCount
      ? [count - boundaryCount]
      : [];

  const itemList: ItemList = [
    'previous',
    ...startPages,
    ...startEllipsis,
    ...range(siblingsStart, siblingsEnd),
    ...endEllipsis,
    ...endPages,
    'next',
  ];

  // Map the button type to its page number
  const buttonPage = (type: ItemType) => {
    switch (type) {
      case 'previous':
        return current - 1;
      case 'next':
        return current + 1;
      default:
        return null;
    }
  };

  const items = itemList.map<UsePaginationItem>((item) => {
    if (typeof item === 'number') {
      return {
        onClick() {
          setCurrent(item);
        },
        type: 'page',
        page: item,
        selected: item === current,
        disabled,
      };
    }

    return {
      onClick() {
        setCurrent(buttonPage(item));
      },
      type: item,
      page: buttonPage(item),
      selected: false,
      disabled:
        disabled ||
        (item.indexOf('ellipsis') === -1 &&
          (item === 'next' ? current >= count : current <= 1)),
    };
  });

  return items;
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}

export default usePagination;
