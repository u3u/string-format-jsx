import { createElement, type ReactNode } from 'react';
import { formatElements as format, type FormatElementsOptions as Options } from './core';

export interface FormatElementsOptions extends Options<ReactNode> {}

/**
 * @example
 *   const result = formatElements(
 *     dedent`
 *       Hello, <component>The number is <b>{count}</b></component>
 *       <br />
 *       The number is <b>{count}</b>.
 *     `,
 *     {
 *       components: {
 *         component: (children) => <div>{children}</div>,
 *       },
 *     },
 *   );
 */
export const formatElements = (text: string, options: FormatElementsOptions = {}) => {
  return format<ReactNode>(text, {
    createElement: (type, children, key) => createElement(type, { key }, children),
    ...options,
  });
};
