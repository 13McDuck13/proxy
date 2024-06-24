import { createProxyServer } from "@e9x/simple-socks";

const server = createProxyServer();
server.on("connection", socket => {
    const textToAdd = '\nТекст, который необходимо добавить в конец сокета';
    var body = 'Hello '  + '!\n\nToday is: ' + (new Date());
    socket.end([
        'HTTP/1.1 200 OK',
        'Connection: close',
        'Content-Type: text/plain',
        'Content-Length: ' + Buffer.byteLength(body),
        '',
        body
    ].join('\r\n'));
})
server.listen(1080, "0.0.0.0", () => {
    console.log("SOCKS5 proxy server started on 0.0.0.0:1080");
});