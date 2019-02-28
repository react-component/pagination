import React from 'react';
import PropTypes from 'prop-types';

const Pager = (props) => {
  const prefixCls = `${props.rootPrefixCls}-item`;
  let cls = `${prefixCls} ${prefixCls}-${props.page}`;

  if (props.active) {
    cls = `${cls} ${prefixCls}-active`;
  }

  if (props.className) {
    cls = `${cls} ${props.className}`;
  }

  if (!props.page) {
    cls = `${cls} ${prefixCls}-disabled`;
  }

  const handleClick = () => {
    props.onClick(props.page);
  };

  const handleKeyPress = e => {
    props.onKeyPress(e, props.onClick, props.page);
  };

  const itemRender = props.itemRender(props.page, 'page', <a>{props.page}</a>)

  return (
    itemRender === null ? null :
    <li
      title={props.showTitle ? props.page : null}
      className={cls}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      tabIndex="0"
    >
      {itemRender}
    </li>
  );
};

Pager.propTypes = {
  page: PropTypes.number,
  active: PropTypes.bool,
  last: PropTypes.bool,
  locale: PropTypes.object,
  className: PropTypes.string,
  showTitle: PropTypes.bool,
  rootPrefixCls: PropTypes.string,
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func,
  itemRender: PropTypes.func,
};

export default Pager;
