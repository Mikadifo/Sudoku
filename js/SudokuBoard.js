import { createBoard, fillFirstRow, fillBoardWithValues, shuffleRowsAndColumns } from './boardGeneration.js'
import {
    onTileContentChanged,
    onHintClickConsumer as showHint,
    onRestartClickConsumer as restartBoard,
    onSolveClickConsumer as solveBoard
} from './eventConsumers.js'
import { shuffleArray } from './utils/sort_arrays.js'

class SudokuBoard {

    vals = []
    boardCopy = []

    constructor(HTMLboardId) {
	this.HTMLboardId = HTMLboardId
	this.$board = document.getElementById(HTMLboardId)
    }

    generate() {
	createBoard(this.$board)
    }

    fill() {
	this.vals = fillFirstRow()

	const UP = [0, 1, 2]
	const MID = [3, 4, 5]
	const DOWN = [6, 7, 8]
	const ROWS = [UP, MID, DOWN]

	const line = [[...this.vals.values()]]

	ROWS.forEach(r => {
	    ROWS.forEach(r2 => {
		const rlrl = []
		let lastLine = line[line.length - 1]

		if (line.length === 4 || line.length === 7) {
		    lastLine = this.shift_1(lastLine)
		} else if (line.length > 0) {
		    lastLine = this.shift_3(lastLine)
		}

		r.forEach(upRegion => {
		    let l2 = []
		    r2.forEach(upTile => {
			let azu = lastLine.shift()
			this.vals.set(`tile ${upRegion} ${upTile}`, azu)
			l2.push(azu)
		    })
		    rlrl.push(l2)
		})
		line.push(rlrl.join(',').split(','))
	    })
	})

	shuffleRowsAndColumns(this.vals)
	this.boardCopy = new Map(this.vals)

	let keysM = [...this.boardCopy.keys()]
	shuffleArray(keysM)
	keysM = keysM.slice(0, keysM.length / 2)

	keysM.forEach(x => {
	    this.boardCopy.set(x, '')
	    document.getElementById(x).setAttribute('contentEditable', true)
	})

	fillBoardWithValues(this.boardCopy)

	let boardCopyStatic = new Map(this.boardCopy)

	document
	    .getElementById('hint_button')
	    .addEventListener('click', evt => showHint(evt, this.vals, this.boardCopy, 5))
	
	document
	    .getElementById('restart_button')
	    .addEventListener('click', evt => restartBoard(evt, boardCopyStatic, this.boardCopy))

	document
	    .getElementById('solve_button')
	    .addEventListener('click', evt => solveBoard(evt, this.vals))
    }

    shift_1(arr) {
	arr = arr.slice(0 , 9)
	arr.push(arr.shift(arr))

	return arr
    }

    shift_3(arr) {
	const left = arr.slice(0, 3)
	const rigth = arr.slice(3, 9)

	return rigth.concat(left)
    }

    addTilesListeners() {
	const $tiles = Array.from(document.getElementsByClassName('tile'))

	$tiles.forEach($tile => 
	    $tile.addEventListener('keydown', evt => onTileContentChanged(evt, this.vals, this.boardCopy))
	)
    }

}

export default SudokuBoard
