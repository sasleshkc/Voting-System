const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('updateVotes', (candidates) => {
    var ranked_candidates = candidates.slice(); // Clone the array to avoid mutation
    function compareByVote(a, b) {
        return b.votes - a.votes;
    }
    ranked_candidates.sort(compareByVote);
    console.log('Received updated votes:', ranked_candidates);
    updateDashboard(ranked_candidates);
});

function updateDashboard(candidates) {
    var dashboard = document.getElementById('dashboard');
    dashboard.innerHTML = ''; // Clear previous data    

    candidates.forEach(function(candidate, index) {
        var candidateInfo = document.createElement('div');
        candidateInfo.innerHTML = '<div class="rank">' + (index + 1) + '</div>' +
            '<div class="name">' + candidate.name + '</div>' +
            '<div class="stall_no">' + candidate.stall_no + '</div>' +
            '<div class="vote">' + candidate.votes + '</div>';

        dashboard.appendChild(candidateInfo);
    });
}
