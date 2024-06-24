import { createServer } from "@pondwader/socks5-server"

const server = createServer()
server.setConnectionHandler((connection, sendStatus) => {
    console.log(connection)
    sendStatus('REQUEST_GRANTED');
})

server.listen(1080)