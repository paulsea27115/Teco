import {connectDB} from "./mongodb/db.mjs"
import {startServer} from "./server.mjs"

async function main(){
    await connectDB()
    await startServer()
    console.log('Application is Ready!')
}

main().catch(console.error)