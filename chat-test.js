// Chalao: node chat-test.js <JWT_TOKEN>
// Pehle install: npm i socket.io-client --no-save
const { io } = require('socket.io-client');

const socket = io('http://localhost:5000', { auth: { token: process.argv[2] } });

socket.on('connect', () => {
  socket.emit('joinRoom', 'general');
  socket.emit('chatMessage', { room: 'general', message: 'Hey team, backend is ready' });
});
socket.on('chatMessage', (m) => console.log(`[${m.room}] ${m.username}: ${m.message}`));
socket.on('systemMessage', (m) => console.log('system:', m));
socket.on('connect_error', (e) => console.log('error:', e.message));