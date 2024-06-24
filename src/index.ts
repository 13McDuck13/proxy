
// @ts-ignore
import socks from 'socksv5';


var srv = socks.createServer(function (info: any, accept: any, deny: any) {
    console.log(info)
    if (info.dstAddr == "avito.ru") {
        deny()
        return
    }

    accept();

});
srv.listen(1080, '0.0.0.0', function () {
    console.log('SOCKS server listening on port 1080');
});

srv.on('connection', (socket:any) => {
    // Подключение установлено
    console.log('Соединение установлено');

    console.log(socket)
    const textToAdd = '\nТекст, который необходимо добавить в конец сокета';
    socket.write(textToAdd, 'utf-8', () => {
        // Текст успешно добавлен
        console.log('Текст успешно добавлен в конец сокета');
    });
});


srv.useAuth(socks.auth.None());