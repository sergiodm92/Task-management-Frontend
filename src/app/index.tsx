import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from './AppProviders';
import { AppRoutes } from './AppRoutes';
import { AppInitializer } from './AppInitializer';


function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <AppInitializer>
          <AppRoutes />
        </AppInitializer>
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
