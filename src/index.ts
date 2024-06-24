import { createProxyServer } from "@e9x/simple-socks";

const server = createProxyServer();

server.listen(1080, "0.0.0.0", () => {
    console.log("SOCKS5 proxy server started on 0.0.0.0:1080");
});