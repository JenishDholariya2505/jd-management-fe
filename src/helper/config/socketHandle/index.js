import socketIOClient from 'socket.io-client';

export const engPoint = 'https://jenish-be.herokuapp.com/';

export const broadcastSocket = (dataSend) => {
  let socket = socketIOClient(engPoint)
  socket.emit('BROADCAST_SHARE', dataSend);
}