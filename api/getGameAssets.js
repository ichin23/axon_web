

module.exports = async function handler(req, res){
    const url = process.env.BASE_URL_RAWG
    const api_key = process.env.RAWG_API_KEY;

    const params = new URLSearchParams({
        'key': api_key
    })

    const responseVideos = await fetch(`${url}/games/${req.query.id}/movies?${params}`)
    const dataVideos = await responseVideos.json()

    const responseImg = await fetch(`${url}/games/${req.query.id}/screenshots?${params}`)
    const dataImg = await responseImg.json()

    const assets = [dataVideos.results[0], ...dataImg.results]

    return res.json(assets)

}