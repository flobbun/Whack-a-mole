import { KaboomCtx } from "kaboom"
import { useEffect, useState } from "react"

const useScore = (game: KaboomCtx) => {

    const [score, setScore] = useState(0)

    game?.add([
        text("Score: 0"),
        pos(0, 0),
        { value: score },
        z(2),
    ])

    return {
        score,
    }
}

export default useScore