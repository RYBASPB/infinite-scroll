import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@vkontakte/vkui/dist/vkui.css';
import App from './App.tsx';
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';
import { RootStore } from 'shared/model/store/root-store.ts';
import { RootStoreContext } from 'shared/model/store/root-store-context.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider>
      <AdaptivityProvider>
        <RootStoreContext.Provider value={new RootStore()}>
          <App />
        </RootStoreContext.Provider>
      </AdaptivityProvider>
    </ConfigProvider>
  </StrictMode>,
);
