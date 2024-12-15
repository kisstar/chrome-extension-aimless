function is<T>(className = 'Object') {
  return function typeChecker(value: unknown): value is T {
    const type = `[object ${className}]`;

    return Object.prototype.toString.call(value) === type;
  };
}

export const isUndefined = is<undefined>('Undefined');

export const isString = is<string>('String');

export const isObject = is<object>('Object');

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const isFunction = is<Function>('Function');
