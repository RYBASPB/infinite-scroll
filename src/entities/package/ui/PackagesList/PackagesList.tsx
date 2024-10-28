import { observer } from 'mobx-react-lite';
import { useStore } from 'entities/package/model/store/packages-store-context.ts';
import { useEffect, useState } from 'react';

const PackagesList = observer(() => {
  const { fetchObjects, npmObjects, npmObjectsCount } = useStore();
  const size = 30;
  const [from, setFrom] = useState(0);

  const addObjects = () => {
    fetchObjects({
      text: 'ts',
      from,
      size,
    }).then(() => setFrom((prevState) => prevState + size));
  };

  useEffect(() => {
    console.log('Fetching packages');
    fetchObjects({
      text: 'ts',
      from,
      size,
    }).then(() => setFrom(size));
  }, []);

  return (
    <div>
      {npmObjectsCount}
      {npmObjects.map((object) => (
        <div
          style={{
            margin: '2rem',
          }}
        >
          {JSON.stringify(object)}
        </div>
      ))}
      <button onClick={addObjects}>Добавить</button>
    </div>
  );
});

export default PackagesList;
