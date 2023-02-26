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
    const totalHeight = ROWS * (HOLE_SIZE + HOLE_SPACING) - HOLE_SPACING;
    const [holePositions, setHolePositions] = useState<Vec2[]>([]);

    const setBackground = () => {
        game?.add([
            game.sprite("background", {
                width: game.width(),
                height: game.height(),
            }),
            game.z(0),
            game.pos(0, 0),
        ]);
    }

    const addHole = (position: Vec2) => {
        game?.add([
            game.sprite("hole", {
                width: HOLE_SIZE,
                height: HOLE_SIZE,
            }),
            game.origin("center"),
            game.layer("background"),
            game.pos(position),
            "hole"
        ]);
        setHolePositions((prev) => [...prev, position]);
    };

    const addHoles = () => {
        if (game) {
            const startPos = {
                x: (game!.width() - totalWidth) / 2,
                y: (game!.height() - totalHeight) / 2,
            }

            for (let i = 0; i < ROWS; i++) {
                for (let j = 0; j < HOLES_PER_ROW; j++) {
                    const x = startPos.x + j * (HOLE_SIZE + HOLE_SPACING);
                    const y = startPos.y + i * (HOLE_SIZE + HOLE_SPACING);
                    addHole(game.vec2(x, y));
                }
            }
        }
    };

    const addMole = (position: Vec2) => {
        return game?.add([
            game.sprite("mole", {
                width: HOLE_SIZE,
                height: HOLE_SIZE,
            }),
            game.lifespan(game.rand(0.4, 2), {
                fade: 0.1
            }),
            game.origin("center"),
            game.z(1),
            game.pos(position),
            game.area(),
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
        if (game) {
            game.cursor("none");
            const hammer = game.add([
                game.sprite("hammer", {
                    width: 32,
                    height: 32,
                }),
                game.pos(60, 60),
                game.z(2),
                game.scale(2),
                game.area(),
                game.origin("center"),
                "hammer",
            ]);

            hammer.onUpdate(() => {
                hammer.pos = game.mousePos();
            });
        }
    }

    useEffect(() => {
        if (game) {
            setBackground();
            addHoles();
            setCursorHammer();
            game?.loop(MOLE_SPAWN_INTERVAL * game.dt(), () => {
                if (game?.get("mole").length < MAX_MOLES) {
                    spawnRandomMole();
                }
            });
        }
    }, [game, loaded]);
};

export default useEntities;
