import useCollisions from "../../hooks/useCollisions";
import useAssets from "../../../client/hooks/useAssets";
import useEntities from "../../../client/hooks/useEntities";
import { useGameContext } from "../../contexts/GameContext";
import useScore from "../../hooks/useScore";
import s from "./Main.module.css";
import { useEffect } from "react";

const Main = () => {
  const { canvasRef, game } = useGameContext();
  const { loaded } = useAssets(game);
  useEntities(game, loaded);
  useCollisions(game, loaded);
  useScore(game, loaded);

  useEffect(() => {
    if (game && loaded) {
      game?.wait(120, () => {
        console.log("game ended");
      });

      game?.on("whack", "mole", () => {
        const scoreText = game?.get("score")[0];
        if (scoreText) {
          scoreText.value += 1;
          scoreText.text = `Score: ${scoreText.value}`;
        }
      });
    }
  }, [game, loaded]);

  return (
    <div className={s.root}>
      Gaming1Challenge
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Main;
