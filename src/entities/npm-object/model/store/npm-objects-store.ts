import { makeAutoObservable } from 'mobx';
import { NpmObject } from 'npm-object/model/interfaces/npm-object.ts';
import { fetchNpmObjects } from 'npm-object/api/fetch-npm-objects.ts';
import { PACKAGES_NOT_FETCHED } from 'shared/constants/errors.ts';
import { RequestParams } from 'shared/api/request.ts';
import { RootStore } from 'shared/model/store/root-store.ts';

export class NpmObjectsStore {
  rootStore: RootStore;
  npmObjects: NpmObject[] = [];
  npmObjectsCount = 0;
  activeObject: NpmObject | null = null;
  error: string | undefined;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  fetchObjects = async (params: RequestParams): Promise<void> => {
    const fetched = await fetchNpmObjects(params);
    if (fetched) {
      const { total, objects } = fetched;
      this.rootStore.npmObjectsStore.npmObjectsCount = total;
      this.rootStore.npmObjectsStore.npmObjects.push(...objects);
      return;
    }
    this.rootStore.npmObjectsStore.error = PACKAGES_NOT_FETCHED;
  };

  editObject = (_: string, editedObject: NpmObject) => {
    this.rootStore.npmObjectsStore.activeObject = editedObject;
    this.rootStore.appStore.setEditView();
    // this.rootStore.npmObjectsStore.npmObjects[objectIndex] = editedObject;
  };

  deleteObject = (nameToDelete: string): void => {
    this.rootStore.npmObjectsStore.npmObjects = this.rootStore.npmObjectsStore.npmObjects.filter(
      (object) => object.package.name !== nameToDelete,
    );
    console.log('deleted');
  };
}
