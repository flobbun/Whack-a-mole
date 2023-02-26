import { KaboomCtx } from "kaboom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GAME_CONFIG } from "../constants/GameConfig";
import { RoutePaths } from "../constants/RoutePaths";
import { setScore } from '../features/score/scoreSlice'

/**
 * @description Hook to handle game over logic
 */
const useGameOver = (game: KaboomCtx | null, loaded: boolean) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const gameOverEffect = () => {
        if (game) {
            game.add([
                game.text("Game Over"),
                game.pos(game.width() / 2, game.height() / 2),
                game.origin("center"),
              ]);
              ["mole", "hole", "score"].forEach((tag) => game.every(tag, game.destroy));
              game.shake(10);
        }
    }

    useEffect(() => {
        if (game && loaded) {
          game.wait(GAME_CONFIG.GAME_DURATION, () => {
            const score = game.get("score")[0].value;
            dispatch(setScore(score));
            gameOverEffect();
            game.wait(1, () => {
              navigate(RoutePaths.LEADERBOARD);
            });
          });
        }
      }, [game, loaded]);
}

export default useGameOver