const socket = io('http://localhost:3000');

function vote(candidateIndex) {
    socket.emit('vote', candidateIndex);
    toggleModal();
}

function toggleModal() {
    var overlay = document.getElementById('overlay');
    var modal = document.getElementById('modal');
    overlay.style.display = (overlay.style.display === 'none' || overlay.style.display === '') ? 'block' : 'none';
    modal.style.display = (modal.style.display === 'none' || modal.style.display === '') ? 'block' : 'none';
}
