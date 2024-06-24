import * as http from 'http';
//@ts-ignore
import { createServer, SocksProxy } from 'socksv5';

const SOCKS_PROXY_PORT = 1080; // Порт вашего SOCKSv5 прокси-сервера

// Создание SOCKSv5 прокси-сервера
const server = createServer((info:any, accept:any, deny:any) => {
    accept();
});

server.listen(SOCKS_PROXY_PORT, '0.0.0.0', () => {
    console.log(`SOCKSv5 proxy server is listening on port ${SOCKS_PROXY_PORT}`);
});

server.useAuth(server.auth.None());

// Создание HTTP прокси-сервера
server.on('proxyConnect', (info:any, socket:any, head:any) => {
    const requestOptions = {
        hostname: info.dstAddr,
        port: info.dstPort,
        method: 'GET',
        path: '/',
        headers: {
            Host: info.dstAddr // Устанавливаем хост для заголовка Host
        }
    };

    // Создание HTTP запроса к целевому серверу через SOCKSv5 туннель
    const proxyReq = http.request(requestOptions, (proxyRes) => {
        let body = '';

        // Считываем данные из ответа
        proxyRes.on('data', (chunk) => {
            body += chunk;
        });

        // Обработка завершения ответа от целевого сервера
        proxyRes.on('end', () => {
            // Добавляем "hello world" в конец тела ответа
            body += ' hello world';

            // Отправляем ответ клиенту через SOCKSv5 туннель
            socket.write(`HTTP/${proxyRes.httpVersion} ${proxyRes.statusCode} ${proxyRes.statusMessage}\r\n`);
            Object.keys(proxyRes.headers).forEach((key) => {
                socket.write(`${key}: ${proxyRes.headers[key]}\r\n`);
            });
            socket.write('\r\n');
            socket.write(body);
            socket.end();
        });
    });

    // Обработка ошибок HTTP запроса
    proxyReq.on('error', (err) => {
        console.error('Error during proxy request:', err);
        socket.end();
    });

    // Отправляем данные через SOCKSv5 туннель
    proxyReq.end();
});