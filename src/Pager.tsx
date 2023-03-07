/* eslint react/prop-types: 0 */
import classNames from 'classnames';
import React from 'react';

interface Props {
  last?: boolean;
  locale?: any;
  rootPrefixCls: string;
  page: number;
  active?: boolean;
  className?: string;
  showTitle: boolean;
  onClick?: (page: number) => void;
  onKeyPress?: (
    e: React.KeyboardEvent<HTMLLIElement>,
    onClick: Props['onClick'],
    page: Props['page'],
  ) => void;
  itemRender?: (
    page: number,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    element: React.ReactNode,
  ) => React.ReactNode;
}

const Pager: React.FC<Props> = (props) => {
  const {
    rootPrefixCls,
    page,
    active,
    className,
    showTitle,
    onClick,
    onKeyPress,
    itemRender,
  } = props;
  const prefixCls = `${rootPrefixCls}-item`;
  const cls = classNames(prefixCls, `${prefixCls}-${page}`, {
    [`${prefixCls}-active`]: active,
    [`${prefixCls}-disabled`]: !page,
    [props.className]: className,
  });

  const handleClick = () => {
    onClick(page);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLLIElement>) => {
    onKeyPress(e, onClick, page);
  };

  return (
    <li
      title={showTitle ? page.toString() : null}
      className={cls}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      tabIndex={0}
    >
      {itemRender(page, 'page', <a rel="nofollow">{page}</a>)}
    </li>
  );
};

export default Pager;
