import React from 'react';

interface PaginationItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  disabled?: boolean;
}

/** Keep the list item structural when itemRender supplies a native control. */
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
  const nativeControl =
    React.isValidElement<React.HTMLProps<HTMLElement>>(children) &&
    (children.type === 'button' || children.type === 'a');

  if (!nativeControl) {
    // Arbitrary components need not forward DOM props. Preserve their existing
    // content and delegated interaction instead of wrapping interactive nodes.
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
        {React.isValidElement(children) &&
        typeof children.type !== 'string' &&
        ariaDisabled !== undefined
          ? React.cloneElement(
              children as React.ReactElement<{ disabled?: boolean }>,
              { disabled },
            )
          : children}
      </li>
    );
  }

  const button = children.type === 'button';
  const link = !button && !!children.props.href;
  const controlDisabled = disabled || (button && children.props.disabled);
  const control = React.cloneElement(children, {
    'aria-hidden': undefined,
    'aria-label': children.props['aria-label'] ?? ariaLabel,
    'aria-current': ariaCurrent,
    'aria-disabled': controlDisabled || ariaDisabled,
    tabIndex: controlDisabled ? -1 : 0,
    ...(button ? { type: 'button', disabled: controlDisabled } : {}),
    ...(!button && !link
      ? {
          role: 'button',
          onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
            children.props.onKeyDown?.(event);
            if (!event.defaultPrevented) {
              onKeyDown?.(event as React.KeyboardEvent<HTMLLIElement>);
            }
          },
        }
      : {}),
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      if (controlDisabled) {
        event.preventDefault();
        return;
      }
      children.props.onClick?.(event);
      if (!event.isPropagationStopped()) {
        onClick?.(event as React.MouseEvent<HTMLLIElement>);
      }
    },
  });

  // Native buttons synthesize clicks for Enter/Space; handling keydown on the
  // parent as well would activate the same action twice.
  return (
    <li {...restProps} aria-disabled={ariaDisabled}>
      {control}
    </li>
  );
};

export default PaginationItem;
