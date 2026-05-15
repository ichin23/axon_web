import { createGameCard } from '../../js/cardGame.js'
import {searchGame} from '../../js/games/useGames.js'

const param = new URLSearchParams(location.search)
const searchSection = document.querySelector(".results")


if(param.get("query")){
    document.getElementById("buscaInput").value=param.get("query")
    const games = await searchGame({search: param.get("query")})   
    console.log(games)
    if(games.count>0){
        document.querySelector("main").classList.remove("d-none")
        document.querySelector(".loadingSec").classList.remove("d-flex")
        document.querySelector(".loadingSec").classList.add("d-none")
        
        games.results.map((game)=>{
            searchSection.appendChild(createGameCard(game.id, game.background_image, game.name))
        })
    }else{
        document.querySelector(".loadingSec").classList.remove("d-flex")
        document.querySelector(".loadingSec").classList.add("d-none")
        document.querySelector(".notFound").classList.remove("d-none")
    }
}
