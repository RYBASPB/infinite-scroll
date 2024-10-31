import { PackagesContainer } from 'npm-object/ui/PackagesContainer/PackagesContainer.tsx';
import { AppRoot, Panel, PanelHeader, PanelHeaderBack, View } from '@vkontakte/vkui';
import { APP_VIEWS } from 'shared/constants/app.ts';
import { useStore } from 'shared/model/store/root-store-context.ts';
import { observer } from 'mobx-react-lite';
import EditPackage from 'npm-object/ui/EditPackage/EditPackage.tsx';

const App = observer(() => {
  const {
    appStore: { view, setAppView },
  } = useStore();
  return (
    <AppRoot>
      <View id="main-view" activePanel={view}>
        <Panel id={APP_VIEWS.app}>
          <PanelHeader>Бесконечный список</PanelHeader>
          <PackagesContainer />
        </Panel>
        <Panel id={APP_VIEWS.edit}>
          <PanelHeader
            before={<PanelHeaderBack
              onClick={() => setAppView()}
            />}
          >Редактировать запись</PanelHeader>
          <EditPackage />
        </Panel>
      </View>
    </AppRoot>
  );
});

export default App;
