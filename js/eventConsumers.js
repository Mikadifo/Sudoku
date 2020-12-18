import { SudokuBoard } from './SudokuBoard.js'

export const onClickTileConsumer = event => {
    console.log(event.path[0].id, '->', event.path[0].innerHTML)
}

export const onLoadWindowConsumer = () => {
    const board = new SudokuBoard('board')

    board.generate(9, 9)
    board.fill('random', 9)
    board.addTilesListeners()
}

