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

  return (
    <li
      title={props.showTitle ? props.page : null}
      className={cls}
      onClick={props.onClick}
      onKeyPress={props.onKeyPress}
      tabIndex="0"
    >
      {props.itemRender(props.page, 'page')}
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
