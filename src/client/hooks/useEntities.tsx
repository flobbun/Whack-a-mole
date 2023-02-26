import { KaboomCtx, Vec2 } from "kaboom";
import { useEffect, useState } from "react";
import { GAME_CONFIG } from "../constants/GameConfig";

/**
 * Hook to manage game entities (moles, holes, etc.)
 * @important Depends on the game context
 */
const useEntities = (game: KaboomCtx | null, loaded: boolean) => {
    const { HOLES_PER_ROW, HOLE_SIZE, HOLE_SPACING, MOLE_SPAWN_INTERVAL, MAX_MOLES, ROWS } = GAME_CONFIG;
    const totalWidth = HOLES_PER_ROW * (HOLE_SIZE + HOLE_SPACING) - HOLE_SPACING;
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
                width: HOLE_SIZE,
                height: HOLE_SIZE,
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
            y: (game!.height() - totalWidth) / 2,
        }

        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < HOLES_PER_ROW; j++) {
                const x = startPos.x + j * (HOLE_SIZE + HOLE_SPACING);
                const y = startPos.y + i * (HOLE_SIZE + HOLE_SPACING);
                addHole(vec2(x, y));
            }
        }
    };

    const addMole = (position: Vec2) => {
        return game?.add([
            sprite("mole", {
                width: HOLE_SIZE,
                height: HOLE_SIZE,
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
            game?.loop(MOLE_SPAWN_INTERVAL * dt(), () => {
                if (game?.get("mole").length < MAX_MOLES) {
                    spawnRandomMole();
                }
            });
        }
    }, [game, loaded]);
};

export default useEntities;
