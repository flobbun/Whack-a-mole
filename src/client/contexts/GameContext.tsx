import kaboom, { KaboomCtx } from "kaboom";
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

interface GameContext {
    game: KaboomCtx | null;
    canvasRef: React.RefObject<HTMLCanvasElement>;
}

const GameContext = createContext<GameContext | null>({
    game: null,
    canvasRef: { current: null }
});

const GameProvider = ({ children }: { children: ReactNode }) => {

    const [game, setGame] = useState<KaboomCtx | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (canvasRef.current) {
            setGame(kaboom({
                global: false,
                scale: 2,
                canvas: canvasRef.current,
            }));
        }
    }, [canvasRef]);

    return (
        <GameContext.Provider value={{
            game,
            canvasRef
        }}>
            {children}
        </GameContext.Provider>
    );
};

const useGameContext = () => {
    const game = useContext(GameContext);
    if (!game) {
        throw new Error("useGame must be used within a GameProvider");
    }
    return game;
};

export { GameProvider, useGameContext };