export interface FormatElementsOptions<T> {
  components?: Record<string, (children: T | string, key: number) => T>;
  createElement?(type: string, children: T | string, key: number): T;
}

export const formatElements = <T>(text: string, options: FormatElementsOptions<T> = {}) => {
  if (!text) return text;

  const { components, createElement } = options;
  const parts = text.replaceAll(nlRe, '').split(tagParsingRegex);

  if (parts.length === 1) return text;

  const tree: (T | string)[] = [];
  const before = parts.shift();

  if (before) tree.push(before);

  const elements = getElements(parts);

  for (const [key, [type, children, after]] of elements.entries()) {
    const render = components?.[type];
    const child = children && (formatElements<T>(children, options) as T | string);

    tree.push(
      render
        ? render?.(child, key)
        : //
          createElement
          ? createElement?.(type, child, key)
          : child,
    );

    if (after) tree.push(after);
  }

  return tree;
};

export const getElements = (parts: string[]): string[][] => {
  if (!parts.length) return [];

  const [paired, children, unpaired, after] = parts.slice(0, 4);

  return [
    //
    [paired || unpaired, children, after],
    ...getElements(parts.slice(4, parts.length)),
  ];
};

export const nlRe = /\r\n|\r|\n/gu;

export const tagParsingRegex = /<(\w+) *>(.*?)<\/\1 *>|<(\w+) *\/>/u;
