import { makeAutoObservable } from 'mobx';
import { APP_VIEWS } from 'shared/constants/app.ts';
import { RootStore } from 'shared/model/store/root-store.ts';

export class AppStore {
  rootStore: RootStore;
  view: APP_VIEWS = APP_VIEWS.app;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  setEditView = () => {
    this.rootStore.appStore.view = APP_VIEWS.edit;
  };

  setAppView = () => {
    this.rootStore.appStore.view = APP_VIEWS.app;
  };
}
