import { createBoard, addRegionIds, fillBoardRegions, fillBoardTiles } from './boardGeneration.js'
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
	fillBoardRegions(regions)
	const map = new Map()
	
	map.set('tile 0 1', 1)
	map.set('tile 0 2', 1)

	fillBoardTiles(map)
    }

    addTilesListeners() {
	const $tiles = Array.from(document.getElementsByClassName('tile'))

	$tiles.forEach($tile => 
	    $tile.addEventListener('click', onClickTileConsumer)
	)
    }

}

