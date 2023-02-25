import { StrictMode } from "react";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { RoutePaths } from "./constants/RoutePaths";
import { GameProvider } from "./contexts/GameContext";
import Game from "./pages/Game/Game";
import Leaderboard from "./pages/Leaderboard/Leaderboard";

export const App = () => {

  const router = createBrowserRouter([
    {
      index: true,
      path: RoutePaths.HOME,
      element: <>Menu...</>,
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
  ]);

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};

export default App;
