export function handleSocketConnection(socket, io) {
	const helpId = socket.handshake.query.helpId;

    if (helpId) {
        socket.join(helpId);
    }
	else{
		socket.disconnect(true);
	}
}