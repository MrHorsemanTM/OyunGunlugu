const API_URL = '/api/games';

document.addEventListener('DOMContentLoaded', fetchGames);

function getBadge(rating) {
    if (rating <= 0) return `<span class="badge badge-broken">❌ Kırık Rozet</span>`;
    if (rating == 1) return `<span class="badge badge-copper">🥉 Bakır Rozet</span>`;
    if (rating == 2 || rating == 3) return `<span class="badge badge-silver">🥈 Gümüş Rozet</span>`;
    if (rating == 4) return `<span class="badge badge-gold">🥇 Altın Rozet</span>`;
    if (rating >= 5) return `<span class="badge badge-diamond">💎 Elmas Rozet</span>`;
    return '';
}

async function fetchGames() {
    try {
        const res = await fetch(API_URL);
        const games = await res.json();
        const list = document.getElementById('games-container');
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
        console.error("Veriler çekilirken hata oluştu:", error);
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

    if (!gameData.title) return alert("Lütfen en azından oyun adını girin!");

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
            alert("Ekleme Hatası: " + (errorDetail.message || "Veri formatı hatalı"));
        }
    } catch (error) {
        console.error("İstek gönderilirken hata:", error);
        alert("Sunucuya ulaşılamadı!");
    }
}

async function deleteGame(id) {
    if (confirm("Bu oyunu silmek istediğine emin misin?")) {
        try {
            const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchGames(); 
            }
        } catch (error) {
            alert("Silme işlemi başarısız.");
        }
    }
}