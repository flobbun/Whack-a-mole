import { KaboomCtx } from "kaboom"

/**
 * Hook to manage game score
 * @important Depends on the game context
 */
const useScore = (game: KaboomCtx) => {

    const scoreText = game?.add([
        text("Score: 0"),
        pos(20, 20),
        scale(0.3),
        { value: 0 },
        z(2),
    ]);

    return {
        scoreText
    }
}

export default useScore