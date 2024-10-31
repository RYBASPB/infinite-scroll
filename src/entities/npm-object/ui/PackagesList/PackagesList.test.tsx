import { act, cleanup, render, screen } from '@testing-library/react';
import { RootStoreContext } from 'shared/model/store/root-store-context.ts';
import { RootStore } from 'shared/model/store/root-store.ts';
import PackagesList from 'npm-object/ui/PackagesList/PackagesList.tsx';

import 'tests/matchMedia.mock.ts';
import 'tests/fetch.mock.ts';

describe('Packages List', () => {
  const store = new RootStore();

  it('should render component', () => {
    render(
      <RootStoreContext.Provider value={store}>
        <PackagesList />
      </RootStoreContext.Provider>,
    );
    expect(window.IntersectionObserver).toHaveBeenCalled();
    expect(screen.findByText('Loading...')).toBeTruthy();
    cleanup();
  });

  it('should add 10 objects', async () => {
    const { rerender } = render(
      <RootStoreContext.Provider value={store}>
        <PackagesList />
      </RootStoreContext.Provider>,
    );
    await act(() => store.npmObjectsStore.fetchObjects('ts'));
    rerender(
      <RootStoreContext.Provider value={store}>
        <PackagesList />
      </RootStoreContext.Provider>,
    );
    expect(screen.getAllByTestId('list-item')).toHaveLength(10);
    cleanup();
  });
});
