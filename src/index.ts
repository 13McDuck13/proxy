
//@ts-ignore
import socks from "socksv5"

// Создаем прокси-сервер
const server = socks.createServer((info:any, accept:any, deny:any) => {
    accept()
});

// Слушаем порт 1080 для входящих соединений
server.listen(1080, '0.0.0.0', () => {
    console.log('SOCKS v5 proxy server running on localhost:1080');
});

server.useAuth(socks.auth.None());