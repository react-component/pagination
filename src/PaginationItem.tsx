import React from 'react';

interface PaginationItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  disabled?: boolean;
}

/**
 * Keep the list item structural and merge control semantics directly onto the
 * element returned by `itemRender`, so custom controls own their DOM contract.
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
  const controlDisabled = disabled || ariaDisabled === true;

  // Only when a valid element is provided are control semantics merged into
  // it; otherwise the list item itself keeps them as the fallback control.
  if (!React.isValidElement<React.HTMLProps<HTMLElement>>(children)) {
    return (
      <li
        {...restProps}
        onClick={onClick}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
        aria-disabled={ariaDisabled}
      >
        {children}
      </li>
    );
  }

  const { props: controlProps } = children;

  const control = React.cloneElement(children, {
    role: controlProps.href === undefined ? 'button' : undefined,
    'aria-label': controlProps['aria-label'] ?? ariaLabel,
    'aria-current': ariaCurrent,
    'aria-disabled': controlDisabled || undefined,
    tabIndex: controlDisabled || tabIndex == null ? -1 : 0,
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
      controlProps.onKeyDown?.(event);
      if (event.defaultPrevented) {
        return;
      }
      // Native buttons and links already activate on Enter/Space through
      // their own click synthesis; activating here as well would fire twice.
      const { currentTarget } = event;
      const nativeActivation =
        currentTarget.tagName === 'BUTTON' ||
        (currentTarget.tagName === 'A' && currentTarget.hasAttribute('href'));
      if (!nativeActivation) {
        onKeyDown?.(event as React.KeyboardEvent<HTMLLIElement>);
      }
    },
  });

  return <li {...restProps}>{control}</li>;
};

export default PaginationItem;
