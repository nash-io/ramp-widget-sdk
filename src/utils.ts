export const stringifyQuery = (params: Record<string, any>): string =>
  Object.keys(params).reduce((prev, key, index) => {
    const value = params[key];
    if (value == null) {
      return prev;
    }
    return `${prev}${index > 0 ? "&" : ""}${key}=${params[key]}`;
  }, "");
