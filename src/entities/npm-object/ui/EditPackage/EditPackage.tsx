import { useStore } from 'shared/model/store/root-store-context.ts';

const EditPackage = () => {
  const { npmObjectsStore } = useStore()
  const { activeObject } = npmObjectsStore;
  return (
    <div>
      {JSON.stringify(activeObject)}
    </div>
  );
};

export default EditPackage;