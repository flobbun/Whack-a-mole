import { KaboomCtx } from "kaboom";
import { useEffect } from "react";

/**
 * Hook to manage game score
 * @important Depends on the game context
 */
const useScore = (game: KaboomCtx | null, loaded: boolean) => {
    useEffect(() => {
        if (game && loaded) {
            const score = game?.add([
                "score",
                game.text("Score: 0"),
                game.pos(20, 20),
                game.scale(0.3),
                { value: 0 },
                game.z(2),
            ]);

            game?.on("whack", "mole", () => {
                if (score) {
                    score.value += 1;
                    score.text = `Score: ${score.value}`;
                }
            });
        }
    }, [game, loaded]);
}

export default useScore