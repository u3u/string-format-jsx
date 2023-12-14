# string-format-jsx

> A lightweight and framework-independent library for template string interpolation similar to JSX elements.

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![codecov][codecov-src]][codecov-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

## Install

```sh
pnpm add string-format-jsx
```

## Usage

### Core

Use with any framework

```tsx
import { formatElements } from 'string-format-jsx';

formatElements('Hello, <a>@u3u</a>', {
  createElement: (type, props, children) => yourFramework.createElement(type, props, children),
});
```

### React

Use the entrance of `React.createElement` by default

> [!TIP]
>
> The `formatElements` is only used for replacing JSX elements and does not include string interpolation functionality. You can use it together with the built-in [`interpolation`](#interpolation) function or any other interpolation library.

```tsx
import { formatElements } from 'string-format-jsx/react';

const result = formatElements('Hello, <a>@u3u</a>', {
  components: {
    a: (children) => <Link>{children}</Link>,
  },
});
```

### Trans Component (React)

Use `interpolation` and `formatElements` together.

```tsx
import { Trans } from 'string-format-jsx/trans';

const result = (
  <Trans
    components={{
      a: (children, key) => {
        return (
          <a
            className="text-primary-500 hover:text-primary-400 transition"
            key={key}
            onClick={() => {
              console.log(children);
            }}
          >
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
  />
);
```

### Interpolation

Built-in support for simple string templates interpolation, you can use any other string interpolation library.

```ts
import { interpolation } from 'string-format-jsx';

const result = interpolation('Hello, {name} ({count})', {
  values: {
    count: 0,
    name: 'u3u',
  },
});
```

## Examples

### Vue2

```js
import { formatElements, interpolation } from 'string-format-jsx';

export const Trans = {
  functional: true,

  name: 'Trans',

  props: {
    tag: { default: 'span', type: [String, Object, Function] },
    text: String,
    values: Object,
  },

  render: (h, { data, props, scopedSlots: slots }) => {
    const { tag, text, values } = props;

    return h(
      tag,
      data,
      formatElements(interpolation(text, { values }), {
        components: slots,
        createElement: h,
      }),
    );
  },
};

const vnode = (
  <Trans
    scopedSlots={{
      a: (children) => {
        return (
          <a
            class="cursor-pointer text-primary hover:text-primary-400"
            onClick={() => {
              console.log(children);
            }}
          >
            {children}
          </a>
        );
      },

      b: (children) => <b class="font-medium">{children}</b>,
    }}
    text={dedent`
      Hello, <a>The number is <b>{count}</b></a>
      <br />
      The number is <b>{count}</b>.
    `}
    values={{ count: 10 }}
  />
);
```

## Thanks

Core extracted from [next-translate](https://github.com/aralroca/next-translate).

## License

[MIT](./LICENSE) License © 2023 [u3u](https://github.com/u3u)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/string-format-jsx
[npm-version-href]: https://npmjs.com/package/string-format-jsx
[npm-downloads-src]: https://img.shields.io/npm/dm/string-format-jsx
[npm-downloads-href]: https://npmjs.com/package/string-format-jsx
[codecov-src]: https://codecov.io/gh/u3u/string-format-jsx/graph/badge.svg
[codecov-href]: https://codecov.io/gh/u3u/string-format-jsx
[bundle-src]: https://img.shields.io/bundlephobia/minzip/string-format-jsx?label=minzip
[bundle-href]: https://bundlephobia.com/result?p=string-format-jsx
[jsdocs-src]: https://paka.dev/badges/v0/cute.svg
[jsdocs-href]: https://paka.dev/npm/string-format-jsx
[license-src]: https://img.shields.io/github/license/u3u/string-format-jsx.svg
[license-href]: ./LICENSE
