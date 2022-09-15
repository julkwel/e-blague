import app from '../server.js'
import open from 'open'
import fs from 'fs'

const CLIENT_ID = 1295610731267135
const REDIRECT_URI = 'https://fb-cli-server.herokuapp.com/auth'
const SCOPES = 'groups_access_member_info,user_posts,publish_to_groups'

export const  login = () => {
    open(`https://www.facebook.com/v14.0/dialog/oauth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=fb-cli&scope=${SCOPES}`, {wait: true})
    .then(() => {
        console.log('Login...')
        app.get('/auth', (req, res) => {
            if(req.query.access_token){
                fs.writeFileSync('.config', `TOKEN=${req.query.access_token}`, {encoding: 'utf-8'})
                console.log('Token Registred')
            } else console.log('Token not registred!\nPlease try again!')
            res.send('Connection Done!\nYou can close your browser!')
            process.exit(0)
        })
        const server = app.listen(8000, () => setTimeout(() => {
            console.log('Timeout, please try again!')
            process.exit(-1)
        }, 60000))
    })
}