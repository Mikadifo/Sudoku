const createTiles = (tiles, $region) => {
    if (tiles < 1) return

    const $tile = document.createElement('div')
    $tile.className = 'tile'
    $region.appendChild($tile)

    createTiles(tiles - 1, $region)
}

export const createBoard = (regions, tilesPerRegion, $board) => {
    if (regions < 1) return

    const $region = document.createElement('div')
    $region.className = 'region'
    $board.appendChild($region)

    createTiles(tilesPerRegion, $region)
    createBoard(regions - 1, tilesPerRegion, $board)
}

export const addRegionIds = (keyword, initial) => {
    const regions = Array.from(document.getElementsByClassName('region'))

    regions.forEach($region => $region.id = `${keyword} ${initial ++}`)
}

export const fillBoardTiles = (tilesValues) => {
    tilesValues.forEach((v, k) => {
	const $tileText = document.createTextNode(v)
	const $tile = document.getElementById(k)

	$tile.appendChild($tileText)
    })
}

const addIdsToTiles = ($regionTiles, indexTile, indexRegion) => {
    const $tile = $regionTiles[indexTile]

    $tile.id = `tile ${indexRegion} ${indexTile}`
}

const addTilesToRegion = (boardTiles, region, indexRegion) => {
    region = arrayFromTo(1, 9, [])

    const $region = document.getElementById(`region ${indexRegion}`)
    const $regionTiles = $region.getElementsByClassName('tile')

    region.forEach((tile, index) =>
	addIdsToTiles($regionTiles, index, indexRegion)
    )

    boardTiles[indexRegion] = region
}

const arrayFromTo = (from, to, array) => {
    if (from > to) return array
    array.push(from)

    return arrayFromTo(from + 1, to, array)
}

export const fillBoardRegions = regions => {
    const boardTiles = new Array(regions)
    boardTiles.fill()

    boardTiles.forEach((region, index) => 
	addTilesToRegion(boardTiles, region, index)
    )
}

const isTileInRegion = (tileValue, tileRegion, $tiles) =>
    Array
	.from($tiles)
	.filter($tile =>
	    $tile.id.split(' ')[1] === tileRegion
	)
	.map($tile => $tile.innerHTML)
	.includes(tileValue)

const isTileInRow = (tileValue, regionTiles, rowTiles, $tiles) =>
    regionTiles >= rowTiles.length
	? false
	: rowTiles.filter(i =>
	    Array
		.from($tiles)
		.filter($tile => $tile.id === `tile ${regionTiles} ${i}`)
		.map($tile => $tile.innerHTML)
		.includes(tileValue)
	).length > 0
	    ? true
	    : isTileInRow(tileValue, ++ regionTiles, rowTiles, $tiles)

const isTileInColumn = (tileValue, regionTiles, columnTiles, $tiles) =>
    regionTiles >= columnTiles.length * 3
	? false
	: columnTiles.filter(i =>
	    Array
		.from($tiles)
		.filter($tile => $tile.id === `tile ${regionTiles} ${i}`)
		.map($tile => $tile.innerHTML)
		.includes(tileValue)
	).length > 0
	    ? true
	    : isTileInColumn(tileValue, regionTiles + 3, columnTiles, $tiles)

const setTileInBoard = $tile => {
    const random = Math.floor(Math.random() * 9) + 1
    $tile.appendChild(document.createTextNode(random))

    //console.log(isTileInRegion('1', '0', $tiles))
    //console.log(isTileInRow('1', 0, [0, 1, 2], $tiles))
    //console.log(isTileInColumn('1', 0, [0, 3, 6], $tiles))
}

export const fillBoardRandomTiles = () => {
    const $tiles = document.getElementsByClassName('tile')
 
    Array
	.from($tiles)
	.forEach(setTileInBoard)
}

