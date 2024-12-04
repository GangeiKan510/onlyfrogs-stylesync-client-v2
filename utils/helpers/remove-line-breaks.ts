export function removeLineBreaks(content: string): string {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "")
    .join(" ");
}
