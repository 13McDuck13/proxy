
//@ts-ignore
import socks from "socksv5"

// Создаем прокси-сервер
const server = socks.createServer((info:any, accept:any, deny:any) => {
    console.log(`New SOCKS connection from ${info.srcAddr}:${info.srcPort}`);

    if (info.dstAddr === 'example.com' && info.dstPort === 80) {
        // Разрешаем соединение к нужному адресу и порту
        const clientSocket = accept(true);

        clientSocket.on('data', (data:any) => {
            // Печатаем все данные, полученные от клиента
            console.log(`Received data from ${info.srcAddr}:${info.srcPort}: ${data}`);
        });

        clientSocket.on('close', () => {
            console.log(`Connection to ${info.dstAddr}:${info.dstPort} closed`);
        });
    } else {
        // Отклоняем соединение к ненужному адресу и порту
        deny();
    }
});

// Слушаем порт 1080 для входящих соединений
server.listen(1080, 'localhost', () => {
    console.log('SOCKS v5 proxy server running on localhost:1080');
});
