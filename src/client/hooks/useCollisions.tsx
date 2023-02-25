import { KaboomCtx } from "kaboom"
import { useEffect } from "react"

const useCollisions = (game: KaboomCtx) => {

    useEffect(() => {
        if (game) {
            game.onCollide("mole", "hammer", (mole, hammer) => {
                mole.destroy();
            });
        }
    }, [game]);

}

export default useCollisions