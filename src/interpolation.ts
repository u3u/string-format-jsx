export interface InterpolationOptions {
  /**
   * Custom interpolation regexp
   *
   * @default /\{(.*?)\}/gu
   */
  regex?: RegExp;
  values?: Record<string, number | string>;
}

/**
 * @example
 *   const result = interpolation('{name} 你好，我今年 {age} 岁，我的爱好是 {hobby} 。', {
 *     values: {
 *       age: 18,
 *       hobby: '唱，跳，rap，篮球',
 *       name: '蔡徐坤',
 *     },
 *   });
 */
export const interpolation = (text: string, options: InterpolationOptions = {}) => {
  const { regex = /\{(.*?)\}/gu, values } = options;

  let match: RegExpExecArray | null;
  let result = text;

  while ((match = regex.exec(text))) {
    const [name, key] = match;
    const val = values?.[key];

    if (val !== undefined) result = result.replaceAll(name, String(val));
  }

  return result;
};
