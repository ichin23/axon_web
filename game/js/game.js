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

if(assets[0]){
    const video = document.createElement("video")
    video.setAttribute("controls", true)
    video.setAttribute("autoplay", true)
    video.src=assets[0].data['480']
    imagesSec.appendChild(video)
}
assets.shift()

const modalEl = document.getElementById("modalGamesImages")
var modalImages = new bootstrap.Modal(modalEl)

const carousel = document.querySelector(".carousel-games-images")

const imgs = document.createElement("div")
assets.forEach(asset => {
    var img = document.createElement("img")
    img.src = asset.image 

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

const gamePc = game.platforms.filter((e)=>{return e.platform.slug==="pc"})
console.log(gamePc)
document.querySelector(".minRequirements").innerHTML = gamePc[0].requirements.minimum
document.querySelector(".recomendedRequirements").innerHTML = gamePc[0].requirements.recommended

const imagesStore = {
    "steam": {
        type: "i",
        img: "bi-steam"
    },
    "playstation-store":{
        type: "i",
        img: "bi-playstation"
    },
    "epic-games": {
        type: "img",
        img: "/img/epic_logo.png"
    },
    "xbox360":{
        type: "i",
        img: "bi-xbox"
    },
    "xbox-store":{
        type: "i",
        img: "bi-xbox"
    }
}

const storesSec = document.querySelector(".storesSec")
game.stores.forEach((store)=>{
    console.log(store)
    var div = document.createElement("div")

    div.classList.add("store")

    const image = imagesStore[store.store.slug]
    if(image && image.type==="i"){
        const icon = document.createElement("i")
        icon.classList.add("bi")
        icon.classList.add(image.img)
        icon.classList.add("iconStore")
        div.appendChild(icon)
    }else if(image && image.type==="img"){
        const img = document.createElement("img")
        img.src = image.img
        img.classList.add("iconStore")
        div.appendChild(img)
    }
    
    var name = document.createElement("span")
    name.textContent = store.store.name
    div.appendChild(name)

    storesSec.appendChild(div)
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