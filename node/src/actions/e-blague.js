import moment from 'moment'
import prompt from 'prompt'

export const eblague = (feeds) => {
    prompt.start()
    feeds.data.forEach((e) => {
        console.log('-------------------------------------------------------')
        console.log(e.message)
        console.log('\nCreated Date: ' + moment(e.created_time).format('DD MMMM YYYY HH:mm'))
        console.log('Updated Date: ' + moment(e.updated_time).format('DD MMMM YYYY HH:mm'))
        console.log('-------------------------------------------------------')
    })
    prompt.get(['Action'], (err, result) => {
        const link = feeds.paging[result.Action]
        if(link){
            const url = new URL(link).searchParams
            url.delete('access_token')
            url.append('limit', '3')
            console.log('Command: ')
            console.log(`fb --eblague --query "${url.toString()}"`)
        }
    });
}