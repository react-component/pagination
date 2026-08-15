import { render } from '@testing-library/react';
import zhCN from '../src/locale/zh_CN';
import zhTW from '../src/locale/zh_TW';
import Options from '../src/Options';
import * as React from 'react';
import { sizeChangerRender } from './commonUtil';

const WrapperOptions: React.FC<any> = (props) => (
  <Options
    locale={zhCN}
    rootPrefixCls="rc-pagination"
    sizeChangerRender={sizeChangerRender}
    pageSize={10}
    changeSize={jest.fn()}
    quickGo={jest.fn()}
    showSizeChanger
    {...props}
  />
);

describe('Options', () => {
  it('should render correctly', () => {
    const { container } = render(<WrapperOptions />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('uses the Traditional Chinese page-size terminology', () => {
    const { getByRole, getByText } = render(
      <WrapperOptions locale={zhTW} quickGo={false} />,
    );

    expect(getByRole('combobox', { name: '每頁筆數' })).toBeInTheDocument();
    expect(getByText('10 筆／頁')).toBeInTheDocument();
  });

  it('props:buildOptionText should render correctly', () => {
    const mockBuildOptionText = jest
      .fn()
      .mockImplementation((value) => (
        <div className="custom-options">buildOptionText-{value}</div>
      ));
    const { container } = render(
      <WrapperOptions buildOptionText={mockBuildOptionText} />,
    );
    const options = container.querySelector('.custom-options');
    expect(options).toBeTruthy();
    expect(options).toHaveTextContent('buildOptionText-10');
  });
});
