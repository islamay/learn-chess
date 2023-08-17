import { Move, Square } from "chess.js";
import { CSSProperties } from "react";




export function generateMoveHelperStyle(moves: Move[]) {
    const squareStyles = moves.reduce((p, move) => {
        return Object.assign(p, {
          [move.to]: {
            backgroundColor: 'rgba(0,0,0, .5)',
            borderRadius: move.captured ? '0' : '50%',
            scale: !move.captured && '30%',
          } as CSSProperties
        })
      }, {})

    return squareStyles
}

export function generateHighlightStyle(square: Square) {
    return {
        [square]: {
            background: 'rgba(0,0,0, .5)'
        } as CSSProperties
    }
}