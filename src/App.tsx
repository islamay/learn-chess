import Chessboard, {Piece as ChessBoardPiece} from 'chessboardjsx'
import { Chess, Square, Move, Piece } from 'chess.js'
import { CSSProperties, useEffect, useState } from 'react'
import { generateMoveHelperStyle } from './utils/generateStyle'

export default function App() {
  const [chess] = useState(new Chess())
  const [fen, setFen] = useState(chess.fen())
  const [possibleMoves, setPossibleMoves] = useState<Move[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [squareStyles, setSquareStyles] = useState<{ [key: string]: CSSProperties }>({})



  const validateMove = (from: Square, to: Square) => {
    return possibleMoves.find((possibleMove) => {
      return possibleMove.to === to && possibleMove.from === from
    })
  }

  const move = (from: Square, to: Square) => {
    const isValidMove = validateMove(from, to)
    if (!isValidMove) return;

    chess.move({ from, to })
    const updatedFen = chess.fen()
    setFen(updatedFen)
    setSquareStyles({})
    setPossibleMoves([])
  }

  const getPossibleMoves = (square: Square) => {
    const moves = chess.moves({ square, verbose: true })
    const squareStyles = generateMoveHelperStyle(moves)
    setPossibleMoves(moves)
    setSquareStyles(squareStyles)
    console.log(moves);
    
  }

  const onSquareClick = (square: Square) => {
    const possibleMove = possibleMoves.find((possibleMove) => possibleMove.to === square)
    if (possibleMove) {
      move(possibleMove.from, possibleMove.to)
      return
    }

    getPossibleMoves(square)
    
  }

  const onDragOverSquare = (square: Square) => {
    if (isDragging) return

    getPossibleMoves(square)
    setIsDragging(true)
  }

  const onDrop = ({sourceSquare, targetSquare}: {sourceSquare: Square, targetSquare: Square, piece: ChessBoardPiece}) => {
    move(sourceSquare, targetSquare)
    setIsDragging(false)
  }

  useEffect(() => {
    console.log('in check :', chess.inCheck());
    console.log('is check :', chess.isCheck());
    
    console.log(chess.turn());
    
    
  }, [fen])

  return (
    <main className='h-screen w-screen flex items-center justify-center'>
      <Chessboard
        position={fen}
        onSquareClick={onSquareClick}
        onDragOverSquare={onDragOverSquare}
        transitionDuration={1000}
        squareStyles={squareStyles}
        onDrop={onDrop}
      />
    </main>
  )
}

