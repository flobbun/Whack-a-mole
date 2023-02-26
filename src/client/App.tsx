import { StrictMode, useEffect, useState } from "react";
import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import { RoutePaths } from "./constants/RoutePaths";
import { GameProvider } from "./contexts/GameContext";
import Game from "./pages/Game/Game";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Menu from "./pages/Menu/Menu";
import { store } from './store';
import { Provider } from 'react-redux';

export const useDocument = () => {
  const [myDocument, setMyDocument] = useState<Document | null>(null)

  useEffect(() => {
    setMyDocument(document)
  }, [])

  return myDocument
}

export const App = () => {

  const doc = useDocument();

  const routes = [
    {
      index: true,
      path: RoutePaths.HOME,
      element: <Menu />,
    },
    {
      path: RoutePaths.GAME,
      element: (
        <GameProvider>
          <Game />
        </GameProvider>
      ),
    },
    {
      path: RoutePaths.LEADERBOARD,
      element: <Leaderboard />,
    },
  ]

  return (
    <StrictMode>
      {doc && (
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path={RoutePaths.HOME}>
                {routes.map(({ index, element, path }) => (
                  <Route
                    key={path}
                    index={index || false}
                    path={path}
                    element={element}
                  />
                ))}
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      )}
    </StrictMode>
  );
};

export default App;
