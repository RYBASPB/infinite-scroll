import { PackagesStoreContext } from 'entities/package/model/store/packages-store-context.ts';
import { PackagesStore } from 'entities/package/model/store/packages-store.ts';
import { PropsWithChildren } from 'react';
import PackagesList from 'entities/package/ui/PackagesList/PackagesList.tsx';

export const PackagesContainer = ({ children }: PropsWithChildren) => (
  <PackagesStoreContext.Provider value={new PackagesStore()}>
    <PackagesList />
  </PackagesStoreContext.Provider>
);