import { AppStore } from 'shared/model/store/app-store.ts';
import { NpmObjectsStore } from 'npm-object/model/store/npm-objects-store.ts';

export class RootStore {
  appStore: AppStore;
  npmObjectsStore: NpmObjectsStore;
  constructor() {
    this.appStore = new AppStore(this);
    this.npmObjectsStore = new NpmObjectsStore(this);
  }
}
