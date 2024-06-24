
// @ts-ignore
import socks from 'socksv5';


var srv = socks.createServer(function (info: any, accept: any, deny: any) {
    console.log(info)
    if (info.dstAddr == "avito.ru") {
        deny()
        return
    }
    var socket;
    if (socket = accept(true)) {
        console.log(socket)
        // var body = 'Hello ' + info.srcAddr + '!\n\nToday is: ' + (new Date());
        // socket.end([
        //     'HTTP/1.1 200 OK',
        //     'Connection: close',
        //     'Content-Type: text/plain',
        //     'Content-Length: ' + Buffer.byteLength(body),
        //     '',
        //     body
        // ].join('\r\n'));
    }
    accept();

});
srv.listen(1080, '0.0.0.0', function () {
    console.log('SOCKS server listening on port 1080');
});

srv.useAuth(socks.auth.None());