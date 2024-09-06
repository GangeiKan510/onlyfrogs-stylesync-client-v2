export function getIdFromUrl(url: string) {
  const regex = /\/closet\/(?:%20)?([a-f0-9-]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
