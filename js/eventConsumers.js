import SudokuBoard from './SudokuBoard.js'
import { shuffleArray } from './utils/sort_arrays.js'
import { fillBoardWithValues, finishGame } from './boardGeneration.js'

export const onTileContentChanged = (event, map, currentBoard) => {
    const VALID_KEYS = [[49, 50, 51, 52, 53, 54, 55, 56, 57],[8, 46]]
    const target = event.target
    target.blur()

    if (VALID_KEYS[1].includes(event.keyCode)) target.innerHTML = ''

    if (VALID_KEYS[0].includes(event.keyCode)) {
	if (map.get(target.id) === event.key) {
	    target.style.color = '#000'
	    target.removeAttribute('contentEditable')
	    currentBoard.set(target.id, event.key)
	    if ([...currentBoard.values()].filter(tileVal => tileVal === '').length === 0) finishGame()
	} else {
	    target.style.color = 'red'
	}

	target.innerHTML = event.key
    }
}

export const onLoadWindowConsumer = () => {
    const board = new SudokuBoard('board')

    board.generate()
    board.fill()
    board.addTilesListeners()
}

export function onHintClickConsumer(event, completedBoard, currentBoard, maxHints) {
    onHintClickConsumer.calledTimes ++

    let emptyTiles = [...currentBoard]
    emptyTiles = emptyTiles.filter(tile => tile[1] === '')
    shuffleArray(emptyTiles)
    let tileId = emptyTiles.shift()[0]
    let hint = completedBoard.get(tileId)

    currentBoard.set(tileId, hint)
    document.getElementById(tileId).innerHTML = hint

    if (onHintClickConsumer.calledTimes === maxHints) event.srcElement.setAttribute('hidden', true)
} onHintClickConsumer.calledTimes = 0

export const onRestartClickConsumer = (event, board, currentBoard) => {
    board.forEach((v, k) => currentBoard.set(k ,v))
    fillBoardWithValues(currentBoard)

    document.getElementById('solve_button').removeAttribute('hidden')
    document.getElementById('hint_button').removeAttribute('hidden')

    onHintClickConsumer.calledTimes = 0
}

export const onSolveClickConsumer = (event, completedBoard) => {
    fillBoardWithValues(completedBoard)
    finishGame()
}

