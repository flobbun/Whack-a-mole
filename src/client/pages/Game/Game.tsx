import useCollisions from "../../hooks/useCollisions";
import useAssets from "../../hooks/useAssets";
import useEntities from "../../hooks/useEntities";
import { useGameContext } from "../../contexts/GameContext";
import useScore from "../../hooks/useScore";
import s from "./Game.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../constants/RoutePaths";

const Game = () => {
  // const maxTime = 120;
  const maxTime = 10;
  const navigate = useNavigate();
  const { canvasRef, game } = useGameContext();
  const { loaded } = useAssets(game);
  useEntities(game, loaded);
  useCollisions(game, loaded);
  useScore(game, loaded);

  useEffect(() => {
    if (game && loaded) {
      game.wait(maxTime, () => {
        game.add([
          game.text("Game Over"),
          game.pos(game.width() / 2, game.height() / 2),
          game.origin("center"),
        ]);
        game.every("mole", destroy);
        game.every("hole", destroy);
        shake(10);
        game.wait(1, () => {
          navigate(RoutePaths.LEADERBOARD);
        });
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
