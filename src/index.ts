
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
  
    // Прослушиваем данные, отправляемые через сокет
    socket.on('data', (data:any) => {
      // Добавляем текст в конец данных
      const textToAdd = '\nТекст, который необходимо добавить в конец сокета';
  
      // Модифицируем данные, добавляя текст в конце
      const modifiedData = Buffer.concat([data, Buffer.from(textToAdd)]);
  
      // Отправляем модифицированные данные дальше
      socket.emit('data', modifiedData);
    });
  });
  


srv.useAuth(socks.auth.None());