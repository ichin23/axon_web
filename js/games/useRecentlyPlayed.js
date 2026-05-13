
const RECENTLY_KEY = 'recently_played'

/**
 * 
 * @returns {Object[]}
 */
export function getRecentlyPlayed(){
    const recently = localStorage.getItem(RECENTLY_KEY) || '[]'

    return JSON.parse(recently)
}

function setRecentlyPlayed(recently){
    localStorage.setItem(RECENTLY_KEY, JSON.stringify(recently))
}

export function addRecentlyPlayed(game){
    const recently = getRecentlyPlayed()

    recently.unshift({
        id: game.id,
        name: game.name,
        img: game.background_image
    })

    setRecentlyPlayed(recently)
}
