import { createGameCard } from "./cardGame.js"
import { getFavorites } from "./games/useFavorite.js"
import {getGameAssets, getGameById, searchGame} from "./games/useGames.js"
import { getRecentlyPlayed } from "./games/useRecentlyPlayed.js"
import {trendingGames} from "./trendingGames.js"

const menu = ["#recentlySection", "#trendingSection", "#favoritesSection"]
const menuItens = document.querySelectorAll(".menuItem")


if(!location.hash || !menu.includes(location.hash)){
    location.hash = menu[0]
}

menuItens[menu.indexOf(location.hash)].classList.add("checked")

menuItens.forEach((menuItem)=>{
    menuItem.addEventListener('click', (event)=>{
        var url = new URL(menuItem.href)
        menuItens.forEach((item)=>item.classList.remove("checked"))
        menuItens[menu.indexOf(url.hash)].classList.add("checked")
    })
})

const recentlyPlayedSec = document.querySelector(".recentlyPlayed")
const notFound = document.querySelector(".notFound")
const recently = getRecentlyPlayed()

recently.forEach((game)=>{
    recentlyPlayedSec.appendChild(createGameCard(game.id, game.img, game.name, false))
    notFound.style.display='none'
})


const trendingGamesSec = document.querySelector(".trendingGames")
trendingGames.forEach((game)=>{
    trendingGamesSec.appendChild(createGameCard(game.id, game.img, game.name, false))
})

const favoritos = getFavorites()
const favoritesGames = document.querySelector(".favoritesGames")
const notFoundFavorite = document.querySelector(".notFoundFavorite")
favoritos.forEach((game)=>{
    favoritesGames.appendChild(createGameCard(game.id, game.img, game.name, false))
    notFoundFavorite.style.display='none'
})
