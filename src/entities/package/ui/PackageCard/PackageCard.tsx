import { NpmObject } from 'entities/package/model/interfaces/npm-package.ts';
import { observer } from 'mobx-react-lite';

const PackageCard = observer(({ object }: { object: NpmObject }) => {
  return (
    <div>
      <div
        style={{
          margin: '2rem',
        }}
      >
        {JSON.stringify(object)}
      </div>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
});

export default PackageCard;