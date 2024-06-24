import { createProxyServer } from "@e9x/simple-socks";

const server = createProxyServer();
server.on("connection", socket => {
    const textToAdd = '\nТекст, который необходимо добавить в конец сокета';
    socket.write(textToAdd, 'utf-8', () => {
        // Текст успешно добавлен
        console.log('Текст успешно добавлен в конец сокета');
    });
})
server.listen(1080, "0.0.0.0", () => {
    console.log("SOCKS5 proxy server started on 0.0.0.0:1080");
});