

module.exports = async function handler(req, res){
    const url = process.env.BASE_URL_RAWG
    const api_key = process.env.RAWG_API_KEY;

    const params = new URLSearchParams({
        'key': api_key
    })

    const response = await fetch(`${url}/games/${req.query.id}?${params}`)
    
    const data = await response.json()
    return res.status(response.status).json(data)
}