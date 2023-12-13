import React from 'react';
import { interpolation, type InterpolationOptions } from './interpolation';
import { formatElements, type FormatElementsOptions } from './react';

export interface TransProps extends InterpolationOptions {
  components?: FormatElementsOptions['components'];
  text: string;
}

/**
 * @example
 *   const result = (
 *     <Trans
 *       components={{
 *         a: (children, key) => {
 *           return (
 *             <a
 *               className="text-primary-500 hover:text-primary-400 transition"
 *               key={key}
 *               onClick={() => {
 *                 console.log(children);
 *               }}
 *             >
 *               {children}
 *             </a>
 *           );
 *         },
 *
 *         b: (children, key) => {
 *           return (
 *             <b className="font-medium" key={key}>
 *               {children}
 *             </b>
 *           );
 *         },
 *       }}
 *       text={dedent`
 *         Hello, <a>The number is <b>{count}</b></a>
 *         <br />
 *         The number is <b>{count}</b>.
 *       `}
 *       values={{
 *         count: 10,
 *       }}
 *     />
 *   );
 */
export const Trans = (props: TransProps) => {
  const { components, regex, text, values } = props;

  return (
    <>
      {formatElements(
        interpolation(text, {
          regex,
          values,
        }),
        { components },
      )}
    </>
  );
};
