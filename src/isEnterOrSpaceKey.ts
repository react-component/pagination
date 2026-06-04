import { KeyCode } from '@rc-component/util';

interface KeyboardEventLike {
  key?: string;
  charCode?: number;
  keyCode?: number;
}

export default function isEnterOrSpaceKey(event: KeyboardEventLike) {
  return (
    event.key === 'Enter' ||
    event.key === ' ' ||
    event.key === 'Spacebar' ||
    event.charCode === KeyCode.ENTER ||
    event.keyCode === KeyCode.ENTER
  );
}
