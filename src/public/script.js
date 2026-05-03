const API_URL = '/api/games';

// Sayfa yüklendiğinde oyunları getir
document.addEventListener('DOMContentLoaded', fetchGames);

async function fetchGames() {
    const res = await fetch(API_URL);
    const games = await res.json();
    const list = document.getElementById('games-container');
    list.innerHTML = ''; 

    games.forEach(game => {
        const div = document.createElement('div');
        div.className = 'game-card';
        div.innerHTML = `
            <div>
                <strong>${game.title}</strong> (${game.genre}) - 
                <span>${game.status}</span> | Puan: ${game.rating}/10
            </div>
            <button class="delete" onclick="deleteGame(${game.id})">Sil</button>
        `;
        list.appendChild(div);
    });
}

async function addGame() {
    const gameData = {
        title: document.getElementById('title').value,
        genre: document.getElementById('genre').value,
        rating: document.getElementById('rating').value,
        status: document.getElementById('status').value
    };

    // Frontend Doğrulama
    if (!gameData.title) return alert("Lütfen oyun adını girin!");

    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameData)
    });

    if (res.ok) {
        alert("Oyun Eklendi!");
        fetchGames(); 
    }
}

async function deleteGame(id) {
    if (confirm("Bu oyunu silmek istediğine emin misin?")) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchGames(); 
    }
}