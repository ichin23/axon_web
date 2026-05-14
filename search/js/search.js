import { createGameCard } from '../../js/cardGame.js'
import {searchGame} from '../../js/games/useGames.js'

const param = new URLSearchParams(location.search)
const searchSection = document.querySelector(".results")


if(param.get("query")){
    document.getElementById("buscaInput").value=param.get("query")
    const games = await searchGame({search: param.get("query")})   
    console.log(games)

    games.results.map((game)=>{
        searchSection.appendChild(createGameCard(game.id, game.background_image, game.name))
    })
}
