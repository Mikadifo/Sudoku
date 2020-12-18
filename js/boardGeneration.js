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
    const $regions = Array.from(document.getElementsByClassName('region'))

    $regions.forEach($region => $region.id = `${keyword} ${initial ++}`)
}

const addTextToTiles = ($regionTiles, tile, indexTile, indexRegion) => {
    const $tile = $regionTiles[indexTile]
    const $txt = document.createTextNode(tile)

    $tile.appendChild($txt)
    $tile.id = `tile ${indexRegion} ${indexTile}`
}

const addTilesToRegion = (boardTiles, region, indexRegion) => {
    region = arrayFromTo(1, 9, [])

    const $region = document.getElementById(`region ${indexRegion}`)
    const $regionTiles = $region.getElementsByClassName('tile')

    region.forEach((tile, index) =>
	addTextToTiles($regionTiles, tile, index, indexRegion)
    )

    boardTiles[indexRegion] = region
}

const arrayFromTo = (from, to, array) => {
    if (from > to) return array
    array.push(from)

    return arrayFromTo(from + 1, to, array)
}

export const fillBoard = (regions) => {
    const boardTiles = new Array(regions)
    boardTiles.fill()

    boardTiles.forEach((region, index) => 
	addTilesToRegion(boardTiles, region, index)
    )
}

