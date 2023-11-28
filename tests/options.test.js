import { render as mount } from '@testing-library/react';
import Select from 'rc-select';
import zhCN from '../src/locale/zh_CN';
import Options from '../src/Options';

const WrapperOptions = (props) => {
  return (
    <Options
      locale={zhCN}
      rootPrefixCls="rc-pagination"
      selectComponentClass={Select}
      pageSize={10}
      changeSize={jest.fn()}
      quickGo={jest.fn()}
      {...props}
    />
  );
};

describe('Options', () => {
  it('should render correctly', () => {
    const wrapper = mount(<WrapperOptions />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('props:buildOptionText', () => {
    it('should render correctly', () => {
      const mockBuildOptionText = jest
        .fn()
        .mockImplementation((value) => (
          <div className="custom-options">buildOptionText-{value}</div>
        ));
      const wrapper = mount(
        <WrapperOptions buildOptionText={mockBuildOptionText} />,
      );
      const options = wrapper.find('.custom-options');
      expect(options).toBeTruthy();
      expect(options.text()).toBe('buildOptionText-10');
    });
  });
});
