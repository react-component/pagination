/* eslint react/prop-types: 0 */
import React from 'react';
import classNames from 'classnames';

const Pager = (props) => {
  const prefixCls = `${props.rootPrefixCls}-item`;
  const cls = classNames(prefixCls, `${prefixCls}-${props.page}`, {
    [`${prefixCls}-active`]: props.active,
    [`${prefixCls}-disabled`]: !props.page,
    [props.className]: !!props.className,
  });

  const handleClick = () => {
    props.onClick(props.page);
  };

  const handleKeyPress = (e) => {
    props.onKeyPress(e, props.onClick, props.page);
  };

  return (
    <li
      title={props.showTitle ? props.page : null}
      className={cls}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      tabIndex="0"
    >
      {props.itemRender(props.page, 'page', <a rel="nofollow">{props.page}</a>)}
    </li>
  );
};

export default Pager;
