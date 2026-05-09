const API_URL = '/api/games';

document.addEventListener('DOMContentLoaded', fetchGames);

function getBadge(rating) {
    const r = parseInt(rating);
    if (r === 0) return '<span class="badge badge-broken">❌ Kırık</span>';
    if (r === 1) return '<span class="badge badge-copper">🥉 Bakır</span>';
    if (r === 2) return '<span class="badge badge-silver">🥈 Gümüş</span>';
    if (r === 3) return '<span class="badge badge-gold">🥇 Altın</span>';
    if (r === 4) return '<span class="badge badge-emerald">💚 Zümrüt</span>';
    if (r >= 5) return '<span class="badge badge-diamond">💎 Elmas</span>';
    return '';
}

async function fetchGames() {
    try {
        const res = await fetch(API_URL);
        const games = await res.json();
        const list = document.getElementById('games-container');
        if (!list) return; // Güvenlik kontrolü
        list.innerHTML = ''; 

        games.forEach(game => {
            const div = document.createElement('div');
            div.className = 'game-card';
            div.innerHTML = `
                <div>
                    <strong>${game.title}</strong> ${getBadge(game.rating)} <br>
                    <small>${game.genre} | ${game.status}</small>
                </div>
                <button class="delete" onclick="deleteGame(${game.id})">Sil</button>
            `;
            list.appendChild(div);
        });
    } catch (error) {
        console.error("Hata:", error);
    }
}

async function addGame() {
    const titleVal = document.getElementById('title').value;
    const genreVal = document.getElementById('genre').value;
    const ratingVal = document.getElementById('rating').value;
    const statusVal = document.getElementById('status').value;

    const gameData = {
        title: titleVal,
        genre: genreVal,
        rating: ratingVal ? parseInt(ratingVal) : 0, 
        status: statusVal
    };

    if (!gameData.title) return alert("Lütfen oyun adini girin!");

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gameData)
        });

        if (res.ok) {
            alert("Oyun Eklendi!");
            document.getElementById('title').value = '';
            document.getElementById('genre').value = '';
            document.getElementById('rating').value = '';
            fetchGames(); 
        } else {
            const errorDetail = await res.json();
            alert("Hata: " + (errorDetail.message || "Veri hatasi"));
        }
    } catch (error) {
        console.error("Istek hatası:", error);
    }
}

async function deleteGame(id) {
    if (confirm("Silmek istedigine emin misin?")) {
        try {
            const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchGames(); 
            }
        } catch (error) {
            alert("Islem basarisiz.");
        }
    }
}