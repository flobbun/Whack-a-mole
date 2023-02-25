import useCollisions from "../../hooks/useCollisions";
import useAssets from "../../hooks/useAssets";
import useEntities from "../../hooks/useEntities";
import { useGameContext } from "../../contexts/GameContext";
import useScore from "../../hooks/useScore";
import s from "./Game.module.css";
import { useEffect } from "react";

const Game = () => {
  const { canvasRef, game } = useGameContext();
  const { loaded } = useAssets(game);
  useEntities(game, loaded);
  useCollisions(game, loaded);
  useScore(game, loaded);

  useEffect(() => {
    if (game && loaded) {
      game?.wait(120, () => {
        /// ...
      });
    }
  }, [game, loaded]);

  return (
    <div className={s.root}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Game;
