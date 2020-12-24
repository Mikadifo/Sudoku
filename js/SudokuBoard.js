import { createBoard, addRegionIds, fillBoardRegions, fillBoardTiles, fillBoardRandomTiles } from './boardGeneration.js'
import { onClickTileConsumer } from './eventConsumers.js'

export class SudokuBoard {

    constructor(HTMLboardId) {
	this.HTMLboardId = HTMLboardId
	this.$board = document.getElementById(HTMLboardId)
    }

    generate(regions, tilesPerRegion) {
	createBoard(regions, tilesPerRegion, this.$board)
	addRegionIds('region', 0)
    }

    fill(tilesValues, regions) {
	fillBoardRegions(regions)

	if (!tilesValues)
	    fillBoardRandomTiles()
	else
	    fillBoardTiles(tilesValues)
    }

    addTilesListeners() {
	const $tiles = Array.from(document.getElementsByClassName('tile'))

	$tiles.forEach($tile => 
	    $tile.addEventListener('click', onClickTileConsumer)
	)
    }

}

