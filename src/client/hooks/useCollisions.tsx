import { KaboomCtx } from "kaboom"
import { useEffect } from "react"

const useCollisions = (game: KaboomCtx | null, loaded: boolean) => {

    useEffect(() => {
        if (game && loaded) {
            game.onClick("mole", (mole) => {
                mole.trigger("whack");
                mole.destroy();
            });
        }
    }, [game, loaded]);

}

export default useCollisions