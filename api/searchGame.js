

module.exports = async function handler(req, res){
    const url = process.env.BASE_URL_RAWG
    const api_key = process.env.RAWG_API_KEY;

    const params = new URLSearchParams(req.query)

    params.append("key", api_key)
    const response = await fetch(`${url}/games?${params}`)
    
    const data = await response.json()
    return res.status(response.status).json(data)
}