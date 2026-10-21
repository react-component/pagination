import React from 'react';
import isEnterOrSpaceKey from './isEnterOrSpaceKey';

interface PaginationItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  disabled?: boolean;
}

function hasNativeActivation(target: EventTarget) {
  const element = target as HTMLElement;
  return (
    element.tagName === 'BUTTON' ||
    (element.tagName === 'A' && element.hasAttribute('href'))
  );
}

/**
 * Merge semantics onto DOM controls, preserving delegated interaction when a
 * custom renderer cannot be assumed to forward DOM props.
 */
const PaginationItem: React.FC<PaginationItemProps> = ({
  children,
  disabled,
  onClick,
  onKeyDown,
  tabIndex,
  'aria-label': ariaLabel,
  'aria-current': ariaCurrent,
  'aria-disabled': ariaDisabled,
  ...restProps
}) => {
  const element = React.isValidElement<React.HTMLProps<HTMLElement>>(children)
    ? children
    : null;
  const controlDisabled = !!(
    disabled ||
    ariaDisabled === true ||
    element?.props.disabled
  );

  // Only DOM elements can reliably receive merged interaction props. Custom
  // components may not forward them, and Fragments host no DOM node, so retain
  // delegated interaction for those renderers and plain content.
  if (!element || typeof element.type !== 'string') {
    const content =
      element &&
      element.type !== React.Fragment &&
      (ariaDisabled !== undefined || controlDisabled)
        ? React.cloneElement(element, { disabled: controlDisabled })
        : children;

    return (
      <li
        {...restProps}
        onClick={(event) => {
          if (controlDisabled) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        }}
        onKeyDown={(event) => {
          if (controlDisabled) {
            if (isEnterOrSpaceKey(event)) {
              event.preventDefault();
            }
            return;
          }
          if (
            !event.defaultPrevented &&
            !event.isPropagationStopped() &&
            !hasNativeActivation(event.target)
          ) {
            onKeyDown?.(event);
          }
        }}
        tabIndex={controlDisabled || tabIndex == null ? -1 : tabIndex}
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
        aria-disabled={controlDisabled || undefined}
      >
        {content}
      </li>
    );
  }

  const { props: controlProps } = element;

  const control = React.cloneElement(element, {
    role: controlProps.href == null ? 'button' : undefined,
    'aria-label': controlProps['aria-label'] ?? ariaLabel,
    'aria-current': ariaCurrent,
    'aria-disabled': controlDisabled || undefined,
    tabIndex: controlDisabled || tabIndex == null ? -1 : 0,
    ...(element.type === 'button'
      ? { type: controlProps.type ?? 'button', disabled: controlDisabled }
      : {}),
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      if (controlDisabled) {
        event.preventDefault();
        return;
      }
      controlProps.onClick?.(event);
      if (!event.isPropagationStopped()) {
        onClick?.(event as React.MouseEvent<HTMLLIElement>);
      }
    },
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
      if (controlDisabled) {
        if (isEnterOrSpaceKey(event)) {
          event.preventDefault();
        }
        return;
      }
      controlProps.onKeyDown?.(event);
      if (event.defaultPrevented || event.isPropagationStopped()) {
        return;
      }
      // Native controls provide their own keyboard click synthesis. Activating
      // them here as well would fire twice.
      if (!hasNativeActivation(event.target)) {
        onKeyDown?.(event as React.KeyboardEvent<HTMLLIElement>);
      }
    },
  });

  return <li {...restProps}>{control}</li>;
};

export default PaginationItem;
