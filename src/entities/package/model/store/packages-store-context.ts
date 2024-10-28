import { createContext, useContext } from 'react';
import { PackagesStore } from 'entities/package/model/store/packages-store.ts';

export const PackagesStoreContext = createContext<PackagesStore | null>(null);

export const useStore = () => {
  const context = useContext(PackagesStoreContext);
  if (context === null) {
    throw new Error(
      "The component didn't wrapped by PackagesStoreProvider"
    )
  }
  return context;
}
