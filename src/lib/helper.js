export function encodeUrl(str) {
  return btoa(str);
}

export function decodeUrl(encodedStr) {
  return atob(encodedStr);
}

