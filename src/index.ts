import { createProxyServer } from "@e9x/simple-socks";

const server = createProxyServer();
server.on("connection", socket => {
    socket.on('data', (data) => {
        const textToAdd = '\nТекст, который необходимо добавить в конец сокета';
        const modifiedData = Buffer.concat([data, Buffer.from(textToAdd)]);

        // Отправляем модифицированные данные обратно через сокет
        socket.write(modifiedData);
    });
})
server.listen(1080, "0.0.0.0", () => {
    console.log("SOCKS5 proxy server started on 0.0.0.0:1080");
});