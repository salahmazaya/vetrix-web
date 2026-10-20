/** Admin UI field `hero.title__ui` → copy base `hero.title`. */
export function copyBaseFromPath(path: string): string {
  return path.replace(/__ui$/, "");
}

export function copyEnPath(base: string): string {
  return `${base}_en`;
}

export function copyArPath(base: string): string {
  return `${base}_ar`;
}
