import { NpmObject } from 'entities/package/model/interfaces/npm-package.ts';
import { getUrl, RequestParams } from 'shared/api/request.ts';

interface NpmResponse {
  time: string;
  total: number;
  objects: NpmObject[];
}

export async function fetchNpmObjects(params: RequestParams): Promise<NpmResponse | undefined> {
  params.size = params.size ?? 30;
  params.from = params.from ?? 0;
  try {
    const url = getUrl(params);
    const response = await fetch(url, {
      method: 'GET',
    });
    return await response.json();
  } catch (error) {
    // TODO error handle
    console.error(error);
  }
}
