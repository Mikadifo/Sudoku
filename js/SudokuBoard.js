import { createBoard, addRegionIds, fillBoard } from './boardGeneration.js'
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

    fill(mode, regions) {
	fillBoard(regions)
    }

    addTilesListeners() {
	const $tiles = Array.from(document.getElementsByClassName('tile'))

	$tiles.forEach($tile => 
	    $tile.addEventListener('click', onClickTileConsumer) //rename import
	)
    }

}

