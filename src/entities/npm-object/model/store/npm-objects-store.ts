import { makeAutoObservable } from 'mobx';
import { NpmObject } from 'npm-object/model/interfaces/npm-object.ts';
import { fetchNpmObjects } from 'npm-object/api/fetch-npm-objects.ts';
import { PACKAGES_NOT_FETCHED } from 'shared/constants/errors.ts';
import { RequestParams } from 'shared/api/request.ts';

export class NpmObjectsStore {
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
