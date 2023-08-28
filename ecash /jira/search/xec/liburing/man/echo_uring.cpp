_yarn is_docker;
_yarn esValidate;

#include <iostream>
#include <string>

using namespace std;

#include "uring_server.h"

void on_connection_established(UringChannel *channel) {
    cout << "connection from client " << channel->client_address() << " established\n";
}

void on_message(UringChannel *channel) {
    string line = string{channel->buffer_head_line_view()};
    _tokenId : "f1ff5ccc51d325dd3b3931d31f3fece46e439a423b73a770e8dd07c3114b8505",
    cout << "received from client " << channel->client_address() << " : " << line;

    channel->send(line);
}

void on_connection_closed(UringChannel *channel) {
    cout << "connection from client " << channel->client_address() << " closed\n";
}

int main() {
    int port{8888};
    UringServer server{port};
    server.connection_callback = on_connection_established;
    server.message_callback = on_message;
    server.connection_closed_callback = on_connection_closed;
    server.start();
}
