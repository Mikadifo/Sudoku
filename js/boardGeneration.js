import { fillArrayWhitIndexValues } from './utils/fill_arrays.js'
import { shuffleArray } from './utils/sort_arrays.js'

const createTiles = $region =>
    Array
	.from({ length: 9 }, fillArrayWhitIndexValues)
	.forEach(number => {
	    const $tile = document.createElement('div')
	    $tile.className = 'tile'
	    $region.appendChild($tile)
	    $tile.id = `tile ${$region.id.split(' ')[1]} ${number}`
	})

export const createBoard = $board =>
    Array
	.from({ length: 9 }, fillArrayWhitIndexValues)
	.forEach(number => {
	    const $region = document.createElement('div')

	    $region.className = 'region'
	    $board.appendChild($region)
	    $region.id = `region ${number}`

	    createTiles($region)
	})

export const fillTileWhitNextNumber = (region, tile, number, map) => {
    const tileId = `tile ${region} ${tile}`

    map.set(tileId, number.toString())
}

const fillUpTiles = (upTiles, upRegion, numbers, map) =>
    upTiles
	.forEach(upTile => 
	    fillTileWhitNextNumber(upRegion, upTile, numbers.pop() + 1, map)
	)

export const fillFirstRow = () => {
    const UP_ROW_REGION = [0, 1, 2]
    const TO_FILL_NUMBERS = shuffleArray(Array.from({ length: 9 }, fillArrayWhitIndexValues))
    const map = new Map()

    UP_ROW_REGION
	.forEach(upRegion =>
	    fillUpTiles(UP_ROW_REGION, upRegion, TO_FILL_NUMBERS, map)
	)

    return map
}

export const fillBoardWithValues = values => {
    values.forEach((value, tileId) =>
	document
	    .getElementById(tileId)
	    .innerHTML = value
    )
}

export const shuffleRowsAndColumns = map => {
    const vals = [...map.values()]

    let row = []
    let range = 8

    const rows = vals.reduce((acc, curr, currI) => {
	row.push(curr)

	if (currI === range) {
	    range += 9
	    acc.push(row)
	    row = []
	}

	return acc
    }, [])

    const regionCols = []
    let cols = []
    let range2 = 2

    rows.forEach((n, i) => {
	let col = []
	cols.push(col)

	if (i === range2) {
	    range2 += 3
	    regionCols.push(cols)
	    cols = []
	}

	rows.forEach(n2 => {
	    col.push(n2[i])
	})
    })

    regionCols.forEach(shuffleArray)

    const onprev = regionCols.reduce((acc, curr) => acc.concat(curr), [])

    let colrows = []

    onprev.forEach((n, i) => {
	let colrow = []
	colrows.push(colrow)

	onprev.forEach(n2 => colrow.push(n2[i]))
    })

    let rowR = []
    let rangeR = 2

    const rowsRegion = colrows.reduce((acc, curr, currI) => {
	rowR.push(curr)

	if (currI === rangeR) {
	    rangeR += 3
	    acc.push(rowR)
	    rowR = []
	}

	return acc
    }, [])

    rowsRegion.forEach(shuffleArray)
    let newValues = rowsRegion
			.reduce((acc, curr) => 
			    acc.concat(curr.reduce((ac, cu) =>
				ac.concat(cu), [])
			    ), []
			)

	let  i = 0
    map.forEach((val, key, mma) => mma.set(key, newValues[i ++]))
}

export const finishGame = () => {
    alert('Sudoku Completed')
    document.getElementById('hint_button').setAttribute('hidden', true)
    document.getElementById('solve_button').setAttribute('hidden', true)
}

