import conf from 'dotenv'
import yargs from 'yargs'
import { help } from './src/actions/help.js'
import { login } from './src/core/auth.js'
import { navigate } from './src/actions/navigation.js'
import { profile } from './src/actions/profile.js'
import { eblague } from './src/actions/e-blague.js'

const args = yargs(process.argv).argv
conf.config({path: '.config'})

if(args.login) login()
else if(args.profile) navigate({query: 'fields=first_name,last_name,picture,about', navigate: '/me'}, profile)
else if(args.eblague) navigate({query: args.query || 'limit=4&fields=created_time,updated_time,message', navigate: '/374671114188268/feed'}, eblague)
else if(args.navigate) navigate(args, (data) => console.log(data))
else if(args.helps) help()
else console.log('Command Allowed : try fb --helps')
