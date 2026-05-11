/**
 * 
 * @param {Object} params
 * @param {string} params.search
 * @param {string} params.platforms
 * @param {string} params.stores
 * @param {string} params.developers
 * @param {string} params.publishers
 * @param {string} params.ordering
 * 
 */
export async function searchGame(params){
    const urlParams = new URLSearchParams(params)
    console.log(params)
    console.log(urlParams)
    const response = await fetch("/api/searchGame?"+urlParams)
    const games = await response.json()

    return games;
}

export async function getGameById(id){
    const params = new URLSearchParams({
        "id": id
    })
    const response = await fetch("/api/getGameById?"+params)

    const game = await response.json()

    return game
}

export async function getGameAssets(gameId){
    const params = new URLSearchParams({
        "id": gameId
    })
    const response = await fetch("/api/getGameAssets?"+params)

    const gameAssets = await response.json()

    return gameAssets
}