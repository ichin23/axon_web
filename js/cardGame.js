import { getColorSync, getSwatches } from 'https://unpkg.com/colorthief@3/dist/index.js';


export function createGameCard(id, imgUrl, name, isFavorite=false){
    const card = document.createElement("article")
    
    if(imgUrl){
        const img = document.createElement("img")
        img.crossOrigin = "anonymous";
        img.src = imgUrl+"?v=" + Date.now()

        img.addEventListener('load', async ()=>{
            const color = await getSwatches(img)

            card.addEventListener('mouseover', ()=>{
                img.style.boxShadow = `0px 0px 30px ${color.Vibrant.color.hex()}`
            })
            card.addEventListener('mouseleave', ()=>{
                img.style.boxShadow = `none`
            })
        })

        card.appendChild(img)
    }else{
        const div = document.createElement("div")
        const icon = document.createElement("i")
        icon.classList.add("bi", "bi-controller")
        div.appendChild(icon)
        card.appendChild(div)
    }

    card.addEventListener("click", ()=>{
        window.location.href = "/game/index.html?id="+id
    })
    
    const title = document.createElement("h4")
    title.textContent = name
    card.appendChild(title)
    
    card.classList.add("cardGame")

    return card
}