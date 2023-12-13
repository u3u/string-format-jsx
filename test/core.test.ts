import dedent from 'dedent';
import { expect, it } from 'vitest';
import { formatElements } from '../src';

it('should match snapshots', () => {
  const result = [
    formatElements(
      dedent`
        Hello, <component>The number is <b>{count}</b></component>
        <br />
        The number is <b>{count}</b>.
      `,
      {
        createElement: (type, children, key) => ({ children, key, type }),
      },
    ),

    formatElements(dedent`Hello, <a>@u3u</a>`, {
      components: {
        a: (children, key) => ({ children, key, type: 'Mention' }),
      },
    }),

    formatElements(dedent`Hello, <a>@u3u</a>`),
  ];

  expect(result).toMatchSnapshot();
});
