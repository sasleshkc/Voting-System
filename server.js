const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const candidates = [
    { name: 'Candidate 1', stall_no: 1, votes: 0 },
    { name: 'Candidate 2', stall_no: 2, votes: 0 }
];

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Send the current candidates list to the newly connected client
    socket.emit('updateVotes', candidates);

    socket.on('vote', (candidateIndex) => {
        if (candidateIndex >= 0 && candidateIndex < candidates.length) {
            candidates[candidateIndex].votes += 1;
            io.emit('updateVotes', candidates); // Broadcast updated votes to all clients
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
