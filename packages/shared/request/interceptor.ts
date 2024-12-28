export async function runInterceptors<T>(
  interceptors: ((param: T) => Promise<T | false>)[],
  initialParam: T
): Promise<T | false> {
  let currentParam: T | false = initialParam;

  for (const interceptor of interceptors) {
    if (currentParam === false) {
      break;
    }

    currentParam = await interceptor(currentParam);
  }

  return currentParam;
}
