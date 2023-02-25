import { KaboomCtx } from "kaboom"
import { useEffect } from "react"

/**
 * Hook to manage game collisions such as mole whacking
 * @important Depends on the game context
 */
const useCollisions = (game: KaboomCtx | null, loaded: boolean) => {

    useEffect(() => {
        if (game && loaded) {
            game.onClick("mole", (mole) => {
                mole.trigger("whack");
                mole.destroy();
                shake(1.2);
            });
        }
    }, [game, loaded]);

}

export default useCollisions