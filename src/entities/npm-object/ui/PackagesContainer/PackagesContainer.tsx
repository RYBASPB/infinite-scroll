import { NpmObjectsStoreContext } from 'npm-object/model/store/npm-objects-store-context.ts';
import { NpmObjectsStore } from 'npm-object/model/store/npm-objects-store.ts';
import PackagesList from 'npm-object/ui/PackagesList/PackagesList.tsx';

export const PackagesContainer = () => (
  <NpmObjectsStoreContext.Provider value={new NpmObjectsStore()}>
    <PackagesList />
  </NpmObjectsStoreContext.Provider>
);