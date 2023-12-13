import dedent from 'dedent';
import React from 'react';
import { expect, it } from 'vitest';
import { formatElements } from '../src/react';

it('should match snapshots', () => {
  const result = formatElements(
    dedent`
      Hello, <component>The number is <b>{count}</b></component>
      <br />
      The number is <b>{count}</b>.
    `,
    {
      components: {
        component: (children, key) => <div key={key}>{children}</div>,
      },
    },
  );

  expect(result).toMatchSnapshot();
});
