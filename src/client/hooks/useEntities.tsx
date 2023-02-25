import { KaboomCtx, Vec2 } from "kaboom";
import { useGameContext } from "../contexts/GameContext";

/**
 * Hook to manage game entities (moles, holes, etc.)
 * @important Depends on the game context
 */
const useEntities = (game: KaboomCtx) => {
    const holesPerRow = 4;
    const rows = 3;
    const holeSize = 52;
    const holeSpace = 32;
    const totalWidth = holesPerRow * (holeSize + holeSpace) - holeSpace;
    const totalHeight = rows * (holeSize + holeSpace) - holeSpace;

    const addHole = (position: Vec2) => {
        game?.add([
            sprite("hole", {
                width: holeSize,
                height: holeSize,
            }),
            layer("background"),
            pos(position),
        ]);
    };

    const addHoles = () => {
        if (game) {
            const startPos = {
                x: (game.width() - totalWidth) / 2,
                y: (game.height() - totalHeight) / 2,
            }

            for (let i = 0; i < rows; i++) {
              for (let j = 0; j < holesPerRow; j++) {
                const x = startPos.x + j * (holeSize + holeSpace);
                const y = startPos.y + i * (holeSize + holeSpace);
                addHole(vec2(x, y));
              }
            }
        }
    };

    return {
        addHoles,
    };
};

export default useEntities;
