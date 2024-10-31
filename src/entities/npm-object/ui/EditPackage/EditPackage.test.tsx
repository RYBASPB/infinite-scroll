import { RootStore } from 'shared/model/store/root-store.ts';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { RootStoreContext } from 'shared/model/store/root-store-context.ts';
import EditPackage from 'npm-object/ui/EditPackage/EditPackage.tsx';
import { testObjects } from 'tests/test-objects.ts';
import { APP_VIEWS } from 'shared/constants/app.ts';

describe('Edit Package', () => {
  const store = new RootStore();
  beforeEach(() => {
    store.npmObjectsStore.addObjects(...testObjects.objects);
    store.npmObjectsStore.activeObject = {
      ...testObjects.objects[2],
      oldName: testObjects.objects[2].package.name,
    };
    store.appStore.setEditView();
    render(
      <RootStoreContext.Provider value={store}>
        <EditPackage />
      </RootStoreContext.Provider>,
    );
  });

  it('should delete Date', async () => {
    const dateClear = screen.getByText('Очистить поле');
    fireEvent.click(dateClear);
    const button = screen.getByText('Submit changes');
    act(() => button.click());
    const targetObject = store.npmObjectsStore.npmObjects.find(
      (value) => value.package.name === testObjects.objects[2].package.name,
    );
    expect(targetObject?.package.date).toBe('');
    cleanup();
  });

  it('should edit Object', () => {
    const { name, description, version } = testObjects.objects[2].package;
    const {
      score: {
        final,
        detail: { maintenance, quality, popularity },
      },
    } = testObjects.objects[2];
    const nameInput = screen.getByDisplayValue(name);
    const descriptionInput = screen.getByDisplayValue(description);
    const versionInput = screen.getByDisplayValue(version);
    const finalInput = screen.getByDisplayValue(final * 100);
    const maintenanceInput = screen.getByDisplayValue(maintenance * 100);
    const qualityInput = screen.getByDisplayValue(quality * 100);
    const popularityInput = screen.getByDisplayValue(popularity * 100);
    fireEvent.change(nameInput, { target: { value: 'Name' } });
    fireEvent.change(descriptionInput, { target: { value: 'Description' } });
    fireEvent.change(versionInput, { target: { value: '50' } });
    fireEvent.change(finalInput, { target: { value: 5 } });
    fireEvent.change(maintenanceInput, { target: { value: 5 } });
    fireEvent.change(qualityInput, { target: { value: 5 } });
    fireEvent.change(popularityInput, { target: { value: 5 } });
    const button = screen.getByText('Submit changes');
    button.click();
    expect(store.appStore.view).toBe(APP_VIEWS.app);
    const targetObject = store.npmObjectsStore.npmObjects.find(
      (value) => value.package.name === 'Name',
    );
    expect(targetObject).toMatchObject({
      package: {
        name: 'Name',
        version: '50',
        description: 'Description',
      },
      score: {
        final: 0.05,
        detail: { maintenance: 0.05, quality: 0.05, popularity: 0.05 },
      },
    });
    cleanup();
  });
});
