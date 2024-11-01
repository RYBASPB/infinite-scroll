import { NpmObject } from 'npm-object/model/interfaces/npm-object.ts';
import { getUrl, RequestParams } from 'shared/api/request.ts';
import { DIST_URL } from 'shared/constants/api.ts';

interface NpmResponse {
  time: string;
  total: number;
  objects: NpmObject[];
}

export async function fetchNpmObjects(params: RequestParams): Promise<NpmResponse | undefined> {
  params.size = params.size ?? 30;
  params.from = params.from ?? 0;
  try {
    const url = getUrl(DIST_URL, params);
    const response = await fetch(url, {
      method: 'GET',
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
