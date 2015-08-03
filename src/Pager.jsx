let React = require('react');

class Pager extends React.Component {
  render() {
    let props = this.props;
    let prefixCls = `${props.rootPrefixCls}-item`;
    let cls = `${prefixCls} ${prefixCls}-${props.page}`;

    if (props.active) {
      cls = `${cls} ${prefixCls}-active`;
    }

    let title = props.page === 1 ? 'First Page' : props.last ? ('Last Page: ' + props.page) : ('Page ' + props.page);
    return (
      <li title={title} className={cls} onClick={props.onClick}>
        <a>{props.page}</a>
      </li>
    );
  }
}

Pager.propTypes = {
  page: React.PropTypes.number,
  active: React.PropTypes.bool,
  last: React.PropTypes.bool
};

module.exports = Pager;
