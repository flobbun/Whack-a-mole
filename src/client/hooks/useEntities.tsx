import { KaboomCtx, Vec2 } from "kaboom";
import { useEffect, useState } from "react";

/**
 * Hook to manage game entities (moles, holes, etc.)
 * @important Depends on the game context
 */
const useEntities = (game: KaboomCtx | null, loaded: boolean) => {
    const maxMoles = 4;
    const holesPerRow = 4;
    const rows = 3;
    const holeSize = 52;
    const holeSpace = 32;
    const moleSpawnInterval = 1 * 60;
    const totalWidth = holesPerRow * (holeSize + holeSpace) - holeSpace;
    const totalHeight = rows * (holeSize + holeSpace) - holeSpace;
    const [holePositions, setHolePositions] = useState<Vec2[]>([]);

    const setBackground = () => {
        game?.add([
            sprite("background", {
                width: width(),
                height: height(),
            }),
            z(0),
            pos(0, 0),
        ]);
    }

    const addHole = (position: Vec2) => {
        game?.add([
            sprite("hole", {
                width: holeSize,
                height: holeSize,
            }),
            game.origin("center"),
            layer("background"),
            pos(position),
            "hole"
        ]);
        setHolePositions((prev) => [...prev, position]);
    };

    const addHoles = () => {
        const startPos = {
            x: (game!.width() - totalWidth) / 2,
            y: (game!.height() - totalHeight) / 2,
        }

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < holesPerRow; j++) {
                const x = startPos.x + j * (holeSize + holeSpace);
                const y = startPos.y + i * (holeSize + holeSpace);
                addHole(vec2(x, y));
            }
        }
    };

    const addMole = (position: Vec2) => {
        return game?.add([
            sprite("mole", {
                width: holeSize,
                height: holeSize,
            }),
            lifespan(rand(0.4, 2), {
                fade: 0.1
            }),
            game.origin("center"),
            z(1),
            pos(position),
            area(),
            "mole"
        ]);
    };

    const spawnRandomMole = () => {
        if (holePositions.length === 0) {
            return;
        }
        const randomPosition = Math.floor(Math.random() * holePositions.length);
        const randomHole = holePositions[randomPosition];
        addMole(randomHole);
    };

    const setCursorHammer = () => {
        game?.cursor("none");
        const hammer = game?.add([
            sprite("hammer", {
                width: 32,
                height: 32,
            }),
            pos(60, 60),
            z(2),
            scale(2),
            area(),
            game.origin("center"),
            "hammer",
        ]);

        hammer?.onUpdate(() => {
            hammer.pos = mousePos();
        });
    }

    useEffect(() => {
        if (game) {
            setBackground();
            addHoles();
            setCursorHammer();
            game?.loop(moleSpawnInterval * dt(), () => {
                if (game?.get("mole").length < maxMoles) {
                    spawnRandomMole();
                }
            });
        }
    }, [game, loaded]);
};

export default useEntities;
