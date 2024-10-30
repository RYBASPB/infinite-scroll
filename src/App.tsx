import { PackagesContainer } from 'npm-object/ui/PackagesContainer/PackagesContainer.tsx';
import { AppRoot, Panel, PanelHeader, View } from '@vkontakte/vkui';

function App() {
  return (
    <AppRoot>
      <View id="view" activePanel="main">
        <Panel id="main">
          <PanelHeader>Бесконечный список</PanelHeader>
          <PackagesContainer />
        </Panel>
      </View>
    </AppRoot>
  );
}

export default App;
