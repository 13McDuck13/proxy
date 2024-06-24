
// @ts-ignore
import socks from 'socksv5';


var srv = socks.createServer(function (info: any, accept: any, deny: any) {
    if (info.dstAddr == "avito.ru") {
        deny()
        return
    }

    const socket = accept(true)
    console.log(socket)
    socket.on('data', (data:any) => {
        // Добавляем текст в конец данных
        const textToAdd = '\nТекст, который необходимо добавить в конец сокета';
    
        // Модифицируем данные, добавляя текст в конце
        const modifiedData = Buffer.concat([data, Buffer.from(textToAdd)]);
    
        // Отправляем модифицированные данные дальше
        socket.emit('data', modifiedData);
      });

});
srv.listen(1080, '0.0.0.0', function () {
    console.log('SOCKS server listening on port 1080');
});




srv.useAuth(socks.auth.None());