import { KeyCode } from '@rc-component/util';
import isEnterOrSpaceKey from '../src/isEnterOrSpaceKey';

describe('isEnterOrSpaceKey', () => {
  it('returns true for enter key', () => {
    expect(isEnterOrSpaceKey({ key: 'Enter' })).toBe(true);
  });

  it('returns true for space key', () => {
    expect(isEnterOrSpaceKey({ key: ' ' })).toBe(true);
  });

  it('returns true for legacy spacebar key', () => {
    expect(isEnterOrSpaceKey({ key: 'Spacebar' })).toBe(true);
  });

  it('returns true for enter charCode', () => {
    expect(isEnterOrSpaceKey({ charCode: KeyCode.ENTER })).toBe(true);
  });

  it('returns true for enter keyCode', () => {
    expect(isEnterOrSpaceKey({ keyCode: KeyCode.ENTER })).toBe(true);
  });

  it('returns false for unrelated keys', () => {
    expect(isEnterOrSpaceKey({ key: 'Escape', keyCode: 27 })).toBe(false);
  });
});
