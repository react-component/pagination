import { render } from '@testing-library/react';
import fs from 'fs';
import path from 'path';
import * as React from 'react';

const exampleDir = path.resolve(__dirname, '../docs/examples');
const files = fs
  .readdirSync(exampleDir)
  .filter((file) => file.endsWith('.tsx') && !file.startsWith('_'));

describe('Example', () => {
  files.forEach((file) => {
    const name = path.basename(file, '.tsx');
    it(name, () => {
      const Example = require(path.join(exampleDir, file)).default;

      const { container } = render(<Example />);
      expect(container).toMatchSnapshot();
    });
  });
});
