
export function createGameCard(id, imgUrl, name, isFavorite=false){
    const card = document.createElement("article")
    
    if(imgUrl){
        const img = document.createElement("img")
        img.src = imgUrl
        card.appendChild(img)

        img.addEventListener('mouseover',()=>{
            const colorThief = new ColorThief()
            // Retorna um array [R, G, B]
            const corDominante = colorThief.getColorSync(img);
            console.log(corDominante);
        })
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