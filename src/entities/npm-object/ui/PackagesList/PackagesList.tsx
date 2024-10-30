import { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from 'npm-object/model/store/npm-objects-store-context.ts';
import PackageCard from 'npm-object/ui/PackageCard/PackageCard.tsx';

const PackagesList = observer(() => {
  const { fetchObjects, npmObjects, npmObjectsCount } = useStore();
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

  return (
    <div>
      {npmObjectsCount}
      {npmObjects.map((object) => (
       <PackageCard object={object} />
      ))}
      <div ref={targetElement}>Loading screen</div>
      {from}
      <button onClick={addObjects}>Добавить</button>
    </div>
  );
});

export default PackagesList;
