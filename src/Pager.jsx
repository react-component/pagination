const React = require('react');

class Pager extends React.Component {
  render() {
    const props = this.props;
    const prefixCls = `${props.rootPrefixCls}-item`;
    let cls = `${prefixCls} ${prefixCls}-${props.page}`;

    if (props.active) {
      cls = `${cls} ${prefixCls}-active`;
    }

    if (props.className) {
      cls = `${cls} ${props.className}`;
    }

    return (
      <li title={props.showTitle ? props.page : null} className={cls} onClick={props.onClick}>
        <a>{props.page}</a>
      </li>
    );
  }
}

Pager.propTypes = {
  page: React.PropTypes.number,
  active: React.PropTypes.bool,
  last: React.PropTypes.bool,
  locale: React.PropTypes.object,
  className: React.PropTypes.string,
  showTitle: React.PropTypes.bool,
};

module.exports = Pager;
