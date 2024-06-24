
//@ts-ignore
import socks from "socksv5"

// Создаем прокси-сервер
const server = socks.createServer((info: any, accept: any, deny: any) => {
    if (info.dstPort === 80) {
        const socket = accept(true);
        const body = 'Hello ' + info.srcAddr + '!\n\nToday is: ' + (new Date());

        // Отправляем ответ клиенту
        socket.end([
            'HTTP/1.1 200 OK',
            'Connection: close',
            'Content-Type: text/plain',
            'Content-Length: ' + Buffer.byteLength(body),
            '',
            body
        ].join('\r\n'));

        // Добавим ваш собственный код для обработки данных
        socket.on('data', (data:any) => {
            console.log(`Received data from ${info.srcAddr}:${info.srcPort}: ${data}`);
            // Здесь можно добавить вашу обработку данных
        });
    } else {
        accept();
    }
});

// Слушаем порт 1080 для входящих соединений
server.listen(1080, '0.0.0.0', () => {
    console.log('SOCKS v5 proxy server running on localhost:1080');
});

server.useAuth(socks.auth.None());