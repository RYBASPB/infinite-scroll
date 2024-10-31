import { makeAutoObservable } from 'mobx';
import { NpmObject } from 'npm-object/model/interfaces/npm-object.ts';
import { fetchNpmObjects } from 'npm-object/api/fetch-npm-objects.ts';
import { PACKAGES_NOT_FETCHED } from 'shared/constants/errors.ts';
import { RootStore } from 'shared/model/store/root-store.ts';

export class NpmObjectsStore {
  rootStore: RootStore;
  npmObjects: NpmObject[] = [];
  npmObjectsCount = 0;
  activeObject: NpmObject | null = null;
  error: string | undefined;

  from: number = 0
  size: number = 30;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  fetchObjects = async (text: string): Promise<void> => {
    const fetched = await fetchNpmObjects({
      text,
      size: this.rootStore.npmObjectsStore.size,
      from: this.rootStore.npmObjectsStore.from,
    });
    if (fetched) {
      const { total, objects } = fetched;
      this.rootStore.npmObjectsStore.npmObjectsCount = total;
      this.addObjects(...objects);
      return;
    }
    this.rootStore.npmObjectsStore.error = PACKAGES_NOT_FETCHED;
  };

  addObjects = (...objects: NpmObject[]) => {
    this.rootStore.npmObjectsStore.npmObjects.push(...objects);
  }

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

  addFrom = (): void => {
    this.rootStore.npmObjectsStore.from += this.rootStore.npmObjectsStore.size
  }
}
