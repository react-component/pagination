import React from 'react';
import PropTypes from 'prop-types';

const Pager = (props) => {
  const prefixCls = `${props.rootPrefixCls}-item`;
  const ariaAttributes = {};
  let cls = `${prefixCls} ${prefixCls}-${props.page}`;

  if (props.active) {
    cls = `${cls} ${prefixCls}-active`;
    ariaAttributes['aria-current'] = 'page';
  }

  if (props.className) {
    cls = `${cls} ${props.className}`;
  }

  if (!props.page) {
    cls = `${cls} ${prefixCls}-disabled`;
  }

  const renderVisuallyHiddenText = () => (
    <span className="visuallyHidden">
      {props.active
        ? props.locale.aria_current_page
        : props.locale.aria_page
      }
    </span>
  );

  const renderLink = () => (
    <a href="#" {...ariaAttributes}>
      {renderVisuallyHiddenText()}
      {props.page}
    </a>
  );

  const handleClick = () => {
    props.onClick(props.page);
  };

  const handleKeyPress = e => {
    props.onKeyPress(e, props.onClick, props.page);
  };

  return (
    <li
      title={props.showTitle ? props.page : null}
      className={cls}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      tabIndex={props.focusOnListItem ? 0 : null}
    >
      {props.itemRender(props.page, 'page', renderLink())}
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
  focusOnListItem: PropTypes.bool,
  rootPrefixCls: PropTypes.string,
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func,
  itemRender: PropTypes.func,
};

export default Pager;
