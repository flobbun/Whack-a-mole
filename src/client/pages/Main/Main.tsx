import useEntities from "../../../client/hooks/useEntities";
import useAssets from "../../../client/hooks/useAssets";
import { useGameContext } from "../../contexts/GameContext";
import s from "./Main.module.css";
import { KaboomCtx } from "kaboom";
import useScore from "../../hooks/useScore";

const Main = () => {
  const { canvasRef, game } = useGameContext();
  const { loaded } = useAssets(game as KaboomCtx);
  const { addHoles } = useEntities(game as KaboomCtx);
  const { score } = useScore(game as KaboomCtx);

  game?.add([
    sprite("background", {
      width: width(),
      height: height(),
    }),
    pos(0, 0),
  ]);

  addHoles();

  game?.cursor("none");
  const hammer = game?.add([
    sprite("hammer", {
      width: 32,
      height: 32,
    }),
    pos(60, 60),
    scale(2),
    game.origin("center"),
    "hammer",
  ])

  hammer?.onUpdate(() => {
    hammer.pos = mousePos();
  });
  return (
    <div className={s.root}>
      Gaming1Challenge
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Main;
