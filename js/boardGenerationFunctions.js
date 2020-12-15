const createTiles = (tiles, region) => {
    if (tiles < 1) return

    let tile = document.createElement('div')
    tile.className = 'tile'
    region.appendChild(tile)

    createTiles(tiles - 1, region)
}

export const createBoard = (regions, board) => {
    if (regions < 1) return

    let region = document.createElement('div')
    region.className = 'region'
    board.appendChild(region)

    createTiles(9, region)
    createBoard(regions - 1, board)
}

export const addRegionIds = (keyword, initial) => {
    const regions = Array.from(document.getElementsByClassName('region'))

    regions.forEach(region => region.id = `${keyword} ${initial ++}`)
}

const arrayFromTo = (from, to, array) => {
    if (from > to) return array
    array.push(from)

    return arrayFromTo(from + 1, to, array)
}

export const fillBoard = board => {
    let bidArray = new Array(9)
    bidArray.fill(0)

    bidArray.forEach((n, i) => {
	n = arrayFromTo(1, 9, [])
	let reg = document.getElementById(`region ${i}`)

	const tiles = reg.getElementsByClassName('tile')

	n.forEach((nn, ii) => {
	    let tile = tiles[ii]
	    let txt = document.createTextNode(nn)
	    tile.appendChild(txt)

	    tile.id = `tile ${i} ${ii}`
	    tile.addEventListener('click', evt => {console.log('heyy im ', evt.path[0].id)})
	})

	bidArray[i] = (n)
    })

    console.log(bidArray)
}

