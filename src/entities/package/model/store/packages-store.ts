import { makeAutoObservable } from 'mobx';
import { NpmObject } from 'entities/package/model/interfaces/npm-package.ts';
import { fetchNpmObjects } from 'entities/package/api/fetch-npm-objects.ts';
import { PACKAGES_NOT_FETCHED } from 'shared/constants/errors.ts';
import { RequestParams } from 'shared/api/request.ts';

export class PackagesStore {
  npmObjects: NpmObject[] = [];
  npmObjectsCount = 0;
  error: string | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  fetchObjects = async (params: RequestParams): Promise<void> => {
    const fetched = await fetchNpmObjects(params);
    if (fetched) {
      const { total, objects } = fetched;
      this.npmObjectsCount = total;
      this.npmObjects.push(...objects);
      return;
    }
    this.error = PACKAGES_NOT_FETCHED;
  };

  editObject = (prevObjectName: string, editedObject: NpmObject) => {
    const objectIndex = this.npmObjects.findIndex(
      (object) => object.package.name === prevObjectName,
    );
    this.npmObjects[objectIndex] = editedObject
  };

  deleteObject = (nameToDelete: string): void => {
    this.npmObjects = this.npmObjects.filter((object) => object.package.name !== nameToDelete);
    console.log('deleted');
  };
}
