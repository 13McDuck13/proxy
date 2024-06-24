import { createProxyServer } from "@e9x/simple-socks";

const server = createProxyServer();
server.on("connection", socket => {
    socket.on('data', (data) => {
        // Добавляем текст в конец данных
        const textToAdd = '\nТекст, который необходимо добавить в конец сокета';

        // Модифицируем данные, добавляя текст в конце
        const modifiedData = Buffer.concat([data, Buffer.from(textToAdd)]);

        // Отправляем модифицированные данные дальше
        socket.emit('data', modifiedData);
    });
})
server.listen(1080, "0.0.0.0", () => {
    console.log("SOCKS5 proxy server started on 0.0.0.0:1080");
});