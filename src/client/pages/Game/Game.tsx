import useGameOver from "../../hooks/useGameOver";
import { useGameContext } from "../../contexts/GameContext";
import useAssets from "../../hooks/useAssets";
import useCollisions from "../../hooks/useCollisions";
import useEntities from "../../hooks/useEntities";
import useScore from "../../hooks/useScore";
import s from "./Game.module.css";

const Game = () => {
  const { canvasRef, game } = useGameContext();
  const { loaded } = useAssets(game);
  useEntities(game, loaded);
  useCollisions(game, loaded);
  useScore(game, loaded);
  useGameOver(game, loaded);

  return (
    <div className={s.root}>
      <canvas data-testid="canvas" ref={canvasRef}></canvas>
    </div>
  );
};

export default Game;
