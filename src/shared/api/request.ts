import { DIST_URL } from 'shared/constants/api.ts';

export interface RequestParams {
  text: string;
  size?: number;
  from?: number;
}

export function getUrl(requestParams: RequestParams): string {
  const params = new URLSearchParams(Object.entries(requestParams));
  return `${prepareDistUrl(DIST_URL)}?${params.toString()}`;
}

function prepareDistUrl(url: string) {
  const lastChar = url.length > 0 ? url[url.length - 1] : '';
  return lastChar === '/' ? url.slice(0, url.length - 1) : url;
}

getUrl({
  text: 'ewr',
  size: 50,
  from: 0,
});
