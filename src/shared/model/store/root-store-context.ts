import { createContext, useContext } from 'react';
import { RootStore } from 'shared/model/store/root-store.ts';

export const RootStoreContext = createContext<RootStore | null>(null);

export const useStore = () => {
  const context = useContext(RootStoreContext);
  if (context === null) {
    throw new Error(
      "The component isn't wrapped by RootStoreProvider"
    )
  }
  return context;
}
