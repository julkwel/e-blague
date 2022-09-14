import axios from 'axios'

export const navigate = (args, cb, offset) => {
    let query = `access_token=${process.env.TOKEN}`
    if(args.query) query += `&${args.query}`
    console.clear()
    if(process.env.TOKEN) axios[args.method || 'get'](`https://graph.facebook.com/v14.0/${args.navigate}?${query}`)
    .then(async (res) => cb(res.data, offset))
    .catch((e) => {
        console.log(e)
        console.log(e.response.data.error.message + '\n')
        console.log('Endpoint Error\nVerify your endpoint on Facebook API\nOr try to re-login')
    })
    else console.log('You\'re not logged!')
}