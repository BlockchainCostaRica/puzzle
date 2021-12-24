export const checkSlash = (url: string) =>
  url[url.length - 1] === "/" ? url : url + "/";
