import { RootStore } from 'shared/model/store/root-store.ts';
import { testObjects } from 'tests/test-objects.ts';

describe('Npm Objects storage test', () => {
  const storage = new RootStore();
  beforeEach(() => {
    storage.npmObjectsStore.npmObjects = [];
    storage.npmObjectsStore.addObjects(...testObjects.objects);
  });
  it('should add objects', () => {
    expect(storage.npmObjectsStore.npmObjects.length).toBe(10);
  });
  it('should remove object', () => {
    storage.npmObjectsStore.deleteObject(testObjects.objects[4].package.name);
    expect(storage.npmObjectsStore.npmObjects.length).toBe(9);
    expect(
      storage.npmObjectsStore.npmObjects.find(
        (value) => value.package.name === testObjects.objects[4].package.name,
      ),
    ).toBeFalsy();
  });
  it('should edit object', () => {
    expect(storage.npmObjectsStore.npmObjects.length).toBe(10);
    storage.npmObjectsStore.editObject(testObjects.objects[2]);
    const oldName = testObjects.objects[2].package.name;
    const editedObject = testObjects.objects[2];
    editedObject.package.name = 'New name';
    editedObject.package.date = '';
    storage.npmObjectsStore.submitEdit(editedObject);
    expect(storage.npmObjectsStore.npmObjects.length).toBe(10);
    expect(
      storage.npmObjectsStore.npmObjects.find((value) => value.package.name === oldName),
    ).toBeFalsy();
    expect(
      storage.npmObjectsStore.npmObjects.find((value) => value.package.name === 'New name'),
    ).toBeTruthy();
  });
  it('should add form value', () => {
    storage.npmObjectsStore.addFrom();
    expect(storage.npmObjectsStore.from).toBe(30);
  });
});
