/* eslint react/prop-types: 0 */
import classNames from 'classnames';
import React from 'react';
import type { PaginationProps } from './interface';

export interface PagerProps extends Pick<PaginationProps, 'itemRender'> {
  rootPrefixCls: string;
  page: number;
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
    active,
    className,
    style,
    showTitle,
    onClick,
    onKeyPress,
    itemRender,
  } = props;
  const prefixCls = `${rootPrefixCls}-item`;

  const cls = classNames(
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

  const pager = itemRender(page, 'page', <a rel="nofollow">{page}</a>);

  return pager ? (
    <li
      title={showTitle ? String(page) : null}
      className={cls}
      style={style}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      {pager}
    </li>
  ) : null;
};

if (process.env.NODE_ENV !== 'production') {
  Pager.displayName = 'Pager';
}

export default Pager;
