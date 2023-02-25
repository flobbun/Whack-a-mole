import { KaboomCtx } from "kaboom";
import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useGameContext } from "../contexts/GameContext";

/**
 * Hook to manage game assets
 * @important Depends on the game context
 */
const useAssets = (game: KaboomCtx) => {
    const [loaded, setLoaded] = useState(false);

    const loadAssets = async () => {
        const assetEntries = Object.entries(assets);
        await Promise.all(assetEntries.map(async ([key, value]) => {
            await game?.loadSprite(key, value);
        }));
        setLoaded(true);
    };

    useEffect(() => {
        if (game) {
            loadAssets();
        }
    }, [game]);

    return {
        loaded
    };
}

export default useAssets;