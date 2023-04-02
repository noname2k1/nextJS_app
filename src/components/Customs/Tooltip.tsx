import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

interface Props {
  content: string;
  trigger?: 'mouseenter' | 'click' | undefined;
  children: JSX.Element;
  disabled?: boolean;
}

const Tooltip = ({
  content,
  children,
  trigger = undefined,
  disabled = false,
}: Props) => {
  return (
    <Tippy disabled={disabled} content={content} trigger={trigger}>
      {children}
    </Tippy>
  );
};

export default Tooltip;
