import { NO_PARAMS, NO_URL } from 'shared/constants/api.ts';

export interface RequestParams {
  text: string;
  size?: number;
  from?: number;
}

export function getUrl(baseUrl: string, requestParams: RequestParams): string {
  if (!requestParams) {
    return NO_PARAMS;
  }
  if (!baseUrl) {
    return NO_URL;
  }
  const params = new URLSearchParams(Object.entries(requestParams));
  return `${prepareDistUrl(baseUrl)}?${params.toString()}`;
}

function prepareDistUrl(url: string) {
  const lastChar = url.length > 0 ? url[url.length - 1] : '';
  return lastChar === '/' ? url.slice(0, url.length - 1) : url;
}
