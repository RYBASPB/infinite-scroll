import { NpmObject } from 'npm-object/model/interfaces/npm-object.ts';
import { observer } from 'mobx-react-lite';
import { useStore } from 'npm-object/model/store/npm-objects-store-context.ts';

const PackageCard = observer(({ object }: { object: NpmObject }) => {
  const { deleteObject, editObject } = useStore();
  return (
    <div>
      <div
        style={{
          margin: '2rem',
        }}
      >
        {JSON.stringify(object)}
      </div>
      <button
        onClick={
          () => editObject(object.package.name, object) // temporal
        }
      >
        Edit
      </button>
      <button onClick={() => deleteObject(object.package.name)}>Delete</button>
    </div>
  );
});

export default PackageCard;
