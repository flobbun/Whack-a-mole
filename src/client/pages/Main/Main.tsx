import { KaboomCtx } from "kaboom";
import useCollisions from "../../hooks/useCollisions";
import useAssets from "../../../client/hooks/useAssets";
import useEntities from "../../../client/hooks/useEntities";
import { useGameContext } from "../../contexts/GameContext";
import useScore from "../../hooks/useScore";
import s from "./Main.module.css";

const Main = () => {
  const { canvasRef, game } = useGameContext();
  const { loaded } = useAssets(game as KaboomCtx);
  useEntities(game as KaboomCtx);
  useCollisions(game as KaboomCtx);
  const { scoreText } = useScore(game as KaboomCtx);

  game?.on("whack", "mole", () => {
    if (scoreText) {
      scoreText.value += 1;
      scoreText.text = `Score: ${scoreText.value}`;
    }
  });

  game?.onClick(() => {
    if (scoreText) {
      scoreText.value += 1;
      scoreText.text = `Score: ${scoreText.value}`;
    }
  });

  return (
    <div className={s.root}>
      Gaming1Challenge
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Main;
