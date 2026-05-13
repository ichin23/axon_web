
const FAVORITES_KEY = 'favorite_games'

/**
 * 
 * @returns {Object[]}
 */
export function getFavorites(){
    const favorites = localStorage.getItem(FAVORITES_KEY) || '[]'

    return JSON.parse(favorites)
}

function setFavorites(favorites){
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
}

export function addFavorite(game){
    const favorites = getFavorites()

    favorites.unshift({
        id: game.id,
        name: game.name,
        img: game.background_image
    })

    setFavorites(favorites)
}

export function removeFavorite(gameId){
    let favorites = getFavorites()

    favorites = favorites.filter((e)=>e.id!=gameId)
    setFavorites(favorites)
}

export function isFavoriteGame(gameId){
    let favorites = getFavorites()
    return favorites.filter((e)=> e.id === gameId).length > 0
}