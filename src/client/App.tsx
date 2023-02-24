import { GameProvider } from "./contexts/GameContext";
import Main from "./pages/Main/Main";

export const App = () => {
  return (
    <GameProvider>
      <Main />
    </GameProvider>
  );
};

export default App;
