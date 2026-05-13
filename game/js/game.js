import { addFavorite, isFavoriteGame, removeFavorite } from "../../js/games/useFavorite.js"
import { getGameAssets, getGameById } from "../../js/games/useGames.js"
import { addRecentlyPlayed } from "../../js/games/useRecentlyPlayed.js"

var params = new URLSearchParams(location.search)

const gameId = params.get("id")

const results = await Promise.all([
    getGameById(gameId),
    getGameAssets(gameId),
    isFavoriteGame(gameId)
])
const game = results[0] 
const assets = results[1]
var isFavorite = results[2]

const imagesSec = document.querySelector(".imagesSec")

if(game.background_image){
    document.querySelector("body").style.backgroundImage = `url(${game.background_image})`
}

console.log(game)

document.querySelectorAll(".gameTitle").forEach((title)=>title.textContent = game.name)
document.querySelector(".gameRating").innerHTML = game.rating
document.querySelector(".ratingCount").innerHTML = `(${game.ratings_count} avaliações)`
document.querySelector(".gameDescription").innerHTML = game.description

if(assets[0].preview){
    const video = document.createElement("video")
    video.setAttribute("controls", true)
    video.setAttribute("autoplay", true)
    video.src=assets[0].data['480']
    imagesSec.appendChild(video)
    assets.shift()
}

const modalEl = document.getElementById("modalGamesImages")
var modalImages = new bootstrap.Modal(modalEl)

const carousel = document.querySelector(".carousel-games-images")

const imgs = document.createElement("div")
assets.forEach(asset => {
    var img = document.createElement("img")
    img.src = asset.image || asset.preview

    imgs.appendChild(img)

    img = img.cloneNode(true)

    const itemCarr = document.createElement("div")
    itemCarr.classList.add("carousel-item")
    if(assets.indexOf(asset)===0){
        itemCarr.classList.add("active")
    }

    img.classList.add("d-block")
    img.classList.add("w-100")
    

    itemCarr.appendChild(img)

    carousel.appendChild(itemCarr)
    
});

imagesSec.appendChild(imgs)
imagesSec.querySelector("div").addEventListener('click', ()=>{
        console.log("PRINT")
        modalImages.show()
})

const btnFavorite = document.querySelector(".favoriteBtn")
const btnPlay = document.querySelector(".playBtn")
if(isFavorite){
    const icon = btnFavorite.querySelector("i")
    icon.classList.remove("bi-heart")
    icon.classList.add("bi-heart-fill")

    btnFavorite.querySelector("span").textContent = "Remover dos Favoritos"
}

btnPlay.addEventListener('click', (ev)=>{
    addRecentlyPlayed(game)
})

btnFavorite.addEventListener('click', (ev)=>{
    if(isFavorite){
        removeFavorite(game.id)
        const icon = btnFavorite.querySelector("i")
        icon.classList.add("bi-heart")
        icon.classList.remove("bi-heart-fill")
        isFavorite=false

        btnFavorite.querySelector("span").textContent = "Adicionar aos Favoritos"
    }else{
        addFavorite(game)
        const icon = btnFavorite.querySelector("i")
        icon.classList.remove("bi-heart")
        icon.classList.add("bi-heart-fill")
        isFavorite=true

        btnFavorite.querySelector("span").textContent = "Remover dos Favoritos"
    }
})