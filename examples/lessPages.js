/* eslint func-names: 0, no-console: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.less';
import 'rc-pagination/assets/custom-icon.less';

const arrowPath = 'M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h' +
  '-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v' +
  '60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91' +
  '.5c1.9 0 3.8-0.7 5.2-2L869 536.2c14.7-12.8 14.7-35.6 0-48.4z';

const ellipsisPath = [
  'M232 511m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z',
  'M512 511m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z',
  'M792 511m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z'
];

const doublePath = [
  'M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6' +
  '.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1c-4.1 5.2-0' +
  '.4 12.9 6.3 12.9h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.' +
  '1c9.1-11.7 9.1-27.9 0-39.5z',
  'M837.2 492.3L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6' +
  '.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1c-4.1 5.2-0' +
  '.4 12.9 6.3 12.9h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.' +
  '1c9.1-11.7 9.1-27.9 0-39.5z'
];

const getSvgIcon = (path, className) => {
  const paths = Array.isArray(path) ? path : [path];
  const renderPaths = paths.map((p, i) => {
    return (
      <path key={i} d={p} />
    );
  });
  return (
    <i className={className}>
      <svg
        viewBox="0 0 1024 1024"
        width="1em"
        height="1em"
        fill="currentColor"
        style={{ verticalAlign: '-.125em' }}
      >
        {renderPaths}
      </svg>
    </i>
  );
};

class App extends React.Component {
  state = {
    current: 3,
    useIcon: true,
  };
  onChange = (page) => {
    console.log(page);
    this.setState({
      current: page,
    });
  }
  toggleCustomIcon = () => {
    this.setState({
      useIcon: !this.state.useIcon,
    });
  }
  render() {
    const linkIcon = getSvgIcon(arrowPath, 'rc-link-icon');
    const jumpLinkIcon = getSvgIcon(doublePath, 'rc-jump-link-icon');
    const baseJumpLinkIcon = getSvgIcon(ellipsisPath, 'rc-base-jump-link-icon');
    const jumpLinkContainer = (
      <div className="rc-jump-link-container">
        {jumpLinkIcon}
        {baseJumpLinkIcon}
      </div>
    );

    return (
      <div>
        <Pagination
          onChange={this.onChange}
          current={this.state.current}
          total={80}
          showLessItems
          className={this.state.useIcon && 'rc-custom-icon' || undefined}
          linkIcon={this.state.useIcon && linkIcon || undefined}
          jumpLinkIcon={this.state.useIcon && jumpLinkContainer || undefined}
        />
        <Pagination
          showLessItems
          defaultCurrent={1}
          total={60}
          className={this.state.useIcon && 'rc-custom-icon' || undefined}
          linkIcon={this.state.useIcon && linkIcon || undefined}
          jumpLinkIcon={this.state.useIcon && jumpLinkContainer || undefined}
        />
        <div>
          <button onClick={this.toggleCustomIcon}>
            Toggle Custom Icon
          </button>
          <span style={{ marginLeft: '1rem' }}>
            Is using icon: {this.state.useIcon && 'true' || 'false'}
          </span>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('__react-content'));
