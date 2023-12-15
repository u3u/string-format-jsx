import { expect, it } from 'vitest';
import { interpolation } from '../src';

it('should match snapshots', () => {
  const result = [
    interpolation('Hello, {name} ({count})', {
      values: {
        count: 0,
        name: 'u3u',
      },
    }),

    interpolation('Hello, {name} ({count})', {
      values: {
        name: 'u3u',
      },
    }),

    interpolation('Hello, {{name}}.', {
      regex: /\{\{(.*?)\}\}/gu,

      values: {
        name: 'qwq',
      },
    }),

    interpolation('{name} 你好，我今年 {age} 岁，我的爱好是 {hobby} 。', {
      values: {
        age: 18,
        hobby: '唱，跳，rap，篮球',
        name: '蔡徐坤',
      },
    }),
  ];

  expect(result).toMatchSnapshot();
});
