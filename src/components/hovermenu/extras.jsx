import React from 'react';
import ReactDOM from 'react-dom';
import { cx, css } from '@emotion/css';

export const Portal = ({ children, ref }) => ReactDOM.createPortal(children, ref || document.body);

export const Menu = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <div
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          & > * {
            display: inline-block;
          }
          & > * + * {
            margin-left: 15px;
          }
        `
      )}
    />
  )
)
