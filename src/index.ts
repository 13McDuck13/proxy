import { createProxyServer } from "@e9x/simple-socks";

const server = createProxyServer();
server.on("connection", socket => {
    console.log(socket)
})
server.listen(1080, "0.0.0.0", () => {
    console.log("SOCKS5 proxy server started on 0.0.0.0:1080");
});