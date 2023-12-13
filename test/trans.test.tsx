import dedent from 'dedent';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { expect, it } from 'vitest';
import { Trans } from '../src/trans';

it('should match snapshots', () => {
  const result = renderToString(
    <Trans
      components={{
        a: (children, key) => {
          return (
            <a className="text-primary-500 hover:text-primary-400 transition" key={key}>
              {children}
            </a>
          );
        },

        b: (children, key) => {
          return (
            <b className="font-medium" key={key}>
              {children}
            </b>
          );
        },
      }}
      text={dedent`
        Hello, <a>The number is <b>{count}</b></a>
        <br />
        The number is <b>{count}</b>.
      `}
      values={{
        count: 10,
      }}
    />,
  );

  expect(result).toMatchSnapshot();
});
