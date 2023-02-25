import { KaboomCtx } from "kaboom"
import { useEffect } from "react"

/**
 * Hook to manage game score
 * @important Depends on the game context
 */
const useScore = (game: KaboomCtx | null) => {

    useEffect(() => {
        game?.add([
            "score",
            text("Score: 0"),
            pos(20, 20),
            scale(0.3),
            { value: 0 },
            z(2),
        ]);
    }, [game])

}

export default useScore