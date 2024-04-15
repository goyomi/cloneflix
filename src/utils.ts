export function makeImagePath(id: string, width?: string) {
  return `https://image.tmdb.org/t/p/${width ? width : "original"}/${id}`;
}
