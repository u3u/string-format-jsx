import React from 'react';
import { interpolation, type InterpolationOptions } from './interpolation';
import { formatElements, type FormatElementsOptions } from './react';

export interface TransProps extends InterpolationOptions {
  components?: FormatElementsOptions['components'];
  text: string;
}

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
