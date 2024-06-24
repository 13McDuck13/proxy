
// @ts-ignore
import socks from 'socksv5';
 

var srv = socks.createServer(function(info:any, accept:any, deny:any) {
    console.log(info)
    accept();
  });
  srv.listen(1080, '0.0.0.0', function() {
    console.log('SOCKS server listening on port 1080');
  });
   
  srv.useAuth(socks.auth.None());