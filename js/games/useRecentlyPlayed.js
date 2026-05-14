
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
    let recently = getRecentlyPlayed()

    recently = recently.filter((g)=> g.id!==game.id)

    recently.unshift({
        id: game.id,
        name: game.name,
        img: game.background_image
    })

    setRecentlyPlayed(recently)
}
