import { NpmObjectsStoreContext } from 'npm-object/model/store/npm-objects-store-context.ts';
import { NpmObjectsStore } from 'npm-object/model/store/npm-objects-store.ts';
import PackagesList from 'npm-object/ui/PackagesList/PackagesList.tsx';
import { Flex } from '@vkontakte/vkui';

import styles from './PackgaesContainer.module.css'

export const PackagesContainer = () => (
  <NpmObjectsStoreContext.Provider value={new NpmObjectsStore()}>
    <Flex className={styles.container}>
      <PackagesList />
    </Flex>
  </NpmObjectsStoreContext.Provider>
);