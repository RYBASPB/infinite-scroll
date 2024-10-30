import PackagesList from 'npm-object/ui/PackagesList/PackagesList.tsx';
import { Flex } from '@vkontakte/vkui';

import styles from './PackgaesContainer.module.css'

export const PackagesContainer = () => (
    <Flex className={styles.container}>
      <PackagesList />
    </Flex>
);