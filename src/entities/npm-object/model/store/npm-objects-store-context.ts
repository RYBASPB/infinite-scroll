import { createContext, useContext } from 'react';
import { NpmObjectsStore } from 'npm-object/model/store/npm-objects-store.ts';

export const NpmObjectsStoreContext = createContext<NpmObjectsStore | null>(null);

export const useStore = () => {
  const context = useContext(NpmObjectsStoreContext);
  if (context === null) {
    throw new Error(
      "The component didn't wrapped by PackagesStoreProvider"
    )
  }
  return context;
}
