import socket
import base64

def proxy_server():
    username = "admin"
    password = "password"

    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind(('0.0.0.0', 8888))
    server.listen(5)

    print("[*] Listening on localhost:8888")

    while True:
        client_socket, addr = server.accept()
        print(f"[*] Accepted connection from {addr[0]}:{addr[1]}")

        request = client_socket.recv(4096)
        print(f"[*] Received data: {request.decode()}")

        # Проверка наличия заголовка с данными аутентификации
        if "Authorization: Basic" not in request.decode():
            client_socket.send("HTTP/1.1 401 Unauthorized\nWWW-Authenticate: Basic realm=\"Restricted\"\n\n".encode())
            client_socket.close()
            continue

        # Извлечение данных аутентификации
        auth_info = request.decode().split("\r\n")[2]
        auth_data = auth_info.split(" ")[2]
        username_password = base64.b64decode(auth_data).decode().split(":")
        if username_password[0] != username or username_password[1] != password:
            client_socket.send("HTTP/1.1 401 Unauthorized\nWWW-Authenticate: Basic realm=\"Restricted\"\n\n".encode())
            client_socket.close()
            continue

        # Продолжение выполнения прокси-сервера
        # Проксирование запроса к удаленному серверу
        remote_server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        remote_server.connect(('www.example.com', 80))
        remote_server.send(request)

        # Получаем ответ от удаленного сервера
        remote_response = remote_server.recv(4096)
        print(f"[*] Received response: {remote_response.decode()}")

        # Отправляем ответ клиенту
        client_socket.send(remote_response)

        # client_socket.close()
        # remote_server.close()

    server.close()

if __name__ == "__main__":
    proxy_server()
