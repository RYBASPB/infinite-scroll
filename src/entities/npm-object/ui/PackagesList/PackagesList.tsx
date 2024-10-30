import { useEffect, useMemo, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from 'npm-object/model/store/npm-objects-store-context.ts';
import PackageCard from 'npm-object/ui/PackageCard/PackageCard.tsx';
import {
  PanelSpinner,
  SimpleGrid,
  useAdaptivityWithJSMediaQueries, ViewWidth,
} from '@vkontakte/vkui';

const PackagesList = observer(() => {
  const { fetchObjects, npmObjects } = useStore();
  const size = 30;
  const [from, setFrom] = useState(0);
  const targetElement = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const addObjects = async () => {
    setLoading(true);
    await fetchObjects({
      text: 'ts',
      from,
      size,
    })
    setFrom((prevState) => {
      return prevState + size;
    });
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
      console.dir({
        loading,
        loadMore,
        from
      })
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
          <PackageCard key={object.package.name} object={object} />
        ))}
      </SimpleGrid>
      <PanelSpinner getRootRef={targetElement}>Идет загрузка</PanelSpinner>
    </>
  );
});

export default PackagesList;
