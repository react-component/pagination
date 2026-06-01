/* eslint react/prop-types: 0 */
import { clsx } from 'clsx';
import React from 'react';
import type { PaginationProps } from './interface';

export interface PagerProps extends Pick<PaginationProps, 'itemRender'> {
  rootPrefixCls: string;
  page: number;
  pageLabel?: string;
  active?: boolean;
  className?: string;
  style?: React.CSSProperties;
  showTitle: boolean;
  onClick?: (page: number) => void;
  onKeyPress?: (
    e: React.KeyboardEvent<HTMLLIElement>,
    onClick: PagerProps['onClick'],
    page: PagerProps['page'],
  ) => void;
}

const Pager: React.FC<PagerProps> = (props) => {
  const {
    rootPrefixCls,
    page,
    pageLabel,
    active,
    className,
    style,
    showTitle,
    onClick,
    onKeyPress,
    itemRender,
  } = props;
  const prefixCls = `${rootPrefixCls}-item`;

  const cls = clsx(
    prefixCls,
    `${prefixCls}-${page}`,
    {
      [`${prefixCls}-active`]: active,
      [`${prefixCls}-disabled`]: !page,
    },
    className,
  );

  const handleClick = () => {
    onClick(page);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLLIElement>) => {
    onKeyPress(e, onClick, page);
  };

  const pager = itemRender(
    page,
    'page',
    <a tabIndex={-1} aria-hidden="true" rel="nofollow">
      {page}
    </a>,
  );
  const pagerLabel = `${pageLabel || 'Page'} ${page}`.trim();

  return pager ? (
    <li
      title={showTitle ? String(page) : null}
      className={cls}
      style={style}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-label={pagerLabel}
      aria-current={active ? 'page' : undefined}
    >
      {pager}
    </li>
  ) : null;
};

if (process.env.NODE_ENV !== 'production') {
  Pager.displayName = 'Pager';
}

export default Pager;
