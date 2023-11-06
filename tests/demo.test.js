import { mount } from 'enzyme';
import fs from 'fs';
import path from 'path';

const exampleDir = path.resolve(__dirname, '../docs/examples');
const files = fs
  .readdirSync(exampleDir)
  .filter((file) => file.endsWith('.tsx') && !file.startsWith('_'));

describe('Example', () => {
  files.forEach((file) => {
    const name = path.basename(file, '.tsx');
    it(name, () => {
      const Example = require(path.join(exampleDir, file)).default;

      const wrapper = mount(<Example />);
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
