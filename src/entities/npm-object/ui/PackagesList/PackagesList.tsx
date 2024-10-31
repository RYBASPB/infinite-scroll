import { useEffect, useMemo, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import PackageCard from 'npm-object/ui/PackageCard/PackageCard.tsx';
import {
  PanelSpinner,
  SimpleGrid,
  useAdaptivityWithJSMediaQueries, ViewWidth,
} from '@vkontakte/vkui';
import { useStore } from 'shared/model/store/root-store-context.ts';

const PackagesList = observer(() => {
  const { fetchObjects, npmObjects, addFrom } = useStore().npmObjectsStore;
  const targetElement = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const addObjects = async () => {
    setLoading(true);
    await fetchObjects('ts');
    addFrom()
    setLoading(false);
  };

  // todo delete above part of array, hold in state 5 pages
  // todo make intersection hook
  useEffect(() => {
    const element = targetElement.current;
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '100px',
      threshold: 0.5,
    };
    const observer = new IntersectionObserver((e) => {
      if (!loading && e[0].isIntersecting) setLoadMore(true);
    }, options);
    if (element) {
      observer.observe(element);
    }
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    }
  }, [targetElement]);

  useEffect(() => {
    if (loadMore) {
      addObjects()
        .then(() => setLoadMore(false))
    }
  }, [loadMore]);

  const { viewWidth } = useAdaptivityWithJSMediaQueries();
  const selectColumns = useMemo(() => {
    if (viewWidth === ViewWidth.SMALL_TABLET) {
      return 2;
    }
    if (viewWidth > ViewWidth.SMALL_TABLET) {
      return 3;
    }
    return 1;
  }, [viewWidth])

  return (
    <>
      <SimpleGrid columns={selectColumns} gap={10}>
        {npmObjects.map((object) => (
          <PackageCard key={object.package.name} object={object} data-testid="list-item"/>
        ))}
      </SimpleGrid>
      <PanelSpinner getRootRef={targetElement}>Идет загрузка</PanelSpinner>
    </>
  );
});

export default PackagesList;
