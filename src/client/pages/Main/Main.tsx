import useAssets from "src/client/hooks/useAssets";
import { useGameContext } from "../../contexts/GameContext";
import s from "./Main.module.css";

const Main = () => {
  const { canvasRef, game } = useGameContext();
  useAssets();

  return (
    <div className={s.root}>
      Gaming1Challenge
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Main;
