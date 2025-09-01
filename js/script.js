let allGames = [];
let filteredGames = [];
const loading = document.getElementById('loading');
const noResults = document.getElementById('noResults');
const gamesGrid = document.getElementById('gamesGrid');
const highlightsGrid = document.getElementById('highlightsGrid');
const searchInput = document.getElementById('searchInput');
const highlightsSection = document.getElementById('highlightsSection');
const gameModal = document.getElementById('gameModal');
const supportModal = document.getElementById('supportModal');
const subscribeModal = document.getElementById('subscribeModal');

// Dados mockados para demonstração. Em um ambiente real, você pode remover isso
// e usar apenas a chamada `fetch` para o seu arquivo `games.json`.
const mockGames = {
    "games": [
        {
            "name": "Super Mario World",
            "description": "Uma aventura clássica do encanador Mario em busca de resgatar a princesa Peach.",
            "genre": "Plataforma",
            "size": "5MB",
            "version": "1.0",
            "developer": "Nintendo",
            "releaseDate": "1990-11-21",
            "image": "https://placehold.co/400x300/a8d8e0/1a1a1a?text=Super+Mario+World",
            "downloadLink": "https://example.com/super-mario-world.zip",
            "highlight": true
        },
        {
            "name": "Chrono Trigger",
            "description": "Um RPG épico sobre viagens no tempo para salvar o mundo.",
            "genre": "RPG",
            "size": "10MB",
            "version": "1.2",
            "developer": "Square Enix",
            "releaseDate": "1995-03-11",
            "image": "https://placehold.co/400x300/e0a8d8/1a1a1a?text=Chrono+Trigger",
            "downloadLink": "https://example.com/chrono-trigger.zip",
            "highlight": true
        },
        {
            "name": "The Legend of Zelda: A Link to the Past",
            "description": "Link embarca em uma jornada para derrotar Ganon e salvar Hyrule.",
            "genre": "Aventura",
            "size": "7MB",
            "version": "1.1",
            "developer": "Nintendo",
            "releaseDate": "1991-11-21",
            "image": "https://placehold.co/400x300/d8e0a8/1a1a1a?text=Zelda",
            "downloadLink": "https://example.com/zelda.zip",
            "highlight": false
        },
        {
            "name": "Final Fantasy VI",
            "description": "O jogo que definiu uma geração de RPGs com sua história complexa e personagens inesquecíveis.",
            "genre": "RPG",
            "size": "12MB",
            "version": "1.5",
            "developer": "Square Enix",
            "releaseDate": "1994-04-02",
            "image": "https://placehold.co/400x300/a8d8e0/1a1a1a?text=Final+Fantasy+VI",
            "downloadLink": "https://example.com/ff6.zip",
            "highlight": true
        },
        {
            "name": "Street Fighter II Turbo",
            "description": "Versão aprimorada do clássico jogo de luta, com novos personagens e movimentos.",
            "genre": "Luta",
            "size": "6MB",
            "version": "2.0",
            "developer": "Capcom",
            "releaseDate": "1992-07-10",
            "image": "https://placehold.co/400x300/e0a8d8/1a1a1a?text=Street+Fighter+II",
            "downloadLink": "https://example.com/sf2.zip",
            "highlight": false
        },
        {
            "name": "Tetris",
            "description": "Um dos jogos de quebra-cabeça mais famosos e viciantes de todos os tempos.",
            "genre": "Puzzle",
            "size": "1MB",
            "version": "1.0",
            "developer": "Alexey Pajitnov",
            "releaseDate": "1984-06-06",
            "image": "https://placehold.co/400x300/d8e0a8/1a1a1a?text=Tetris",
            "downloadLink": "https://example.com/tetris.zip",
            "highlight": false
        }
    ]
};

// Função para carregar dados dos jogos
async function loadGames() {
    try {
        // Tenta carregar os dados do arquivo games.json.
        const response = await fetch('games.json');
        const data = await response.json();
        
        // Gerar IDs dinamicamente e reverter a ordem para mostrar os mais novos primeiro
        const reversedGames = data.games.slice().reverse();
        allGames = reversedGames.map((game, index) => ({
            ...game,
            id: index + 1
        }));

        filteredGames = allGames;
        renderHighlights();
        renderGames();
        loading.style.display = 'none';
    } catch (error) {
        console.warn('Erro ao carregar games.json. Usando dados de exemplo:', error);
        
        // Se a busca falhar, utiliza os dados mockados
        const data = mockGames;
        const reversedGames = data.games.slice().reverse();
        allGames = reversedGames.map((game, index) => ({
            ...game,
            id: index + 1
        }));
        
        filteredGames = allGames;
        renderHighlights();
        renderGames();
        loading.style.display = 'none';
    }
}

// Função para renderizar jogos em destaque
function renderHighlights() {
    const highlights = allGames.filter(game => game.highlight);
    highlightsGrid.innerHTML = highlights.map(game => `
        <div class="game-card highlight" onclick="openGameModal(${game.id})">
            <div class="highlight-badge">Destaque</div>
            <img src="${game.image}" alt="${game.name}" class="game-image">
            <div class="game-info">
                <h3 class="game-title">${game.name}</h3>
                <p class="game-description">${game.description}</p>
                <div class="game-meta">
                    <span>${game.genre}</span>
                    <span>${game.size}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Função para renderizar todos os jogos
function renderGames() {
    if (filteredGames.length === 0) {
        gamesGrid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    noResults.style.display = 'none';
    gamesGrid.innerHTML = filteredGames.map(game => `
        <div class="game-card" onclick="openGameModal(${game.id})">
            <img src="${game.image}" alt="${game.name}" class="game-image">
            <div class="game-info">
                <h3 class="game-title">${game.name}</h3>
                <p class="game-description">${game.description}</p>
                <div class="game-meta">
                    <span>${game.genre}</span>
                    <span>${game.size}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function openGameModal(gameId) {
    const game = allGames.find(g => g.id === gameId);
    if (!game) return;

    document.getElementById('modalImage').src = game.image;
    document.getElementById('modalTitle').textContent = game.name;
    document.getElementById('modalDescription').textContent = game.description;

    const downloadButton = document.getElementById('downloadButton');
    downloadButton.onclick = (e) => {
        e.preventDefault();
        handleDownload(game.downloadLink);
    };

    gameModal.style.display = 'block';
}
// Função para fechar o modal de detalhes do jogo
function closeGameModal() {
    gameModal.style.display = 'none';
}

// Função para mostrar o modal de inscrição
function showSubscribeModal(downloadLink) {
    subscribeModal.style.display = 'flex';
    
    document.getElementById('continueBtn').onclick = () => {
        window.open(downloadLink, '_blank');
        subscribeModal.style.display = 'none';
    };
}

// Função de pesquisa
function searchGames() {
    const searchTerm = searchInput.value.toLowerCase();
    filteredGames = allGames.filter(game =>
        game.name.toLowerCase().includes(searchTerm) ||
        game.description.toLowerCase().includes(searchTerm) ||
        game.genre.toLowerCase().includes(searchTerm)
    );
    renderGames();
}

// Função para abrir modal de apoio
function openSupportModal() {
    supportModal.style.display = 'block';
}

// Função para fechar modal de apoio
function closeSupportModal() {
    supportModal.style.display = 'none';
}

// Função para copiar chave PIX
function copyPixKey() {
    const pixKey = document.getElementById('pixKey').textContent.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(pixKey).then(() => {
            console.log('Chave PIX copiada!');
            showToast('Chave PIX copiada para a área de transferência! 📋');
        }).catch(err => {
            console.error('Falha ao copiar o texto:', err);
            fallbackCopy(pixKey);
        });
    } else {
        fallbackCopy(pixKey);
    }
}

// Função de fallback para copiar em navegadores mais antigos
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        console.log('Chave PIX copiada (fallback)!');
        showToast('Chave PIX copiada! 📋');
    } catch (err) {
        console.error('Falha ao copiar o texto com fallback.', err);
    }
    document.body.removeChild(textArea);
}

// Função para mostrar uma notificação temporária
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 50px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 25px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10002;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = 1;
    }, 10);
    
    setTimeout(() => {
        toast.style.opacity = 0;
        toast.addEventListener('transitionend', () => toast.remove());
    }, 3000);
}


// Event listeners
searchInput.addEventListener('input', searchGames);

// Fechar modais clicando fora
window.addEventListener('click', function(event) {
    if (event.target === gameModal) {
        closeGameModal();
    }
    if (event.target === supportModal) {
        closeSupportModal();
    }
    if (event.target === subscribeModal) {
        subscribeModal.style.display = 'none';
    }
});

// Controle de visibilidade da seção de destaques
if (searchInput && highlightsSection) {
    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim() !== '') {
            highlightsSection.style.display = 'none';
        } else {
            highlightsSection.style.display = 'block';
        }
    });
}

// Inicializar a aplicação
window.onload = loadGames;

// Definições
const MAX_FREE_DOWNLOADS = 2;
const ACCESS_KEY = "121215"; // chave fixa, pode mudar
let pendingDownload = null; // guarda o link enquanto valida

// Verifica se usuário já tem acesso autorizado
function hasAccess() {
    return localStorage.getItem("downloadKey") === ACCESS_KEY;
}

// Conta quantos downloads já foram feitos
function getDownloadCount() {
    return parseInt(localStorage.getItem("downloadCount") || "0", 10);
}

function incrementDownloadCount() {
    const count = getDownloadCount() + 1;
    localStorage.setItem("downloadCount", count);
}

// Mostra modal para chave de acesso
function showKeyModal(downloadLink) {
    pendingDownload = downloadLink;
    const modal = document.getElementById("keyModal");
    modal.style.display = "flex";
}

// Valida chave digitada
function validateKey() {
    const input = document.getElementById("keyInput").value.trim();
    if (input === ACCESS_KEY) {
        localStorage.setItem("downloadKey", input); // grava a chave em vez de "true"
        document.getElementById("keyModal").style.display = "none";
        if (pendingDownload) {
            window.open(pendingDownload, "_blank");
            pendingDownload = null;
        }
    } else {
        alert("Chave incorreta! Peça no Discord.");
    }
}

// Função para iniciar download com controle
function handleDownload(downloadLink) {
    if (hasAccess()) {
        // Já autorizado, baixa direto
        window.open(downloadLink, "_blank");
        return;
    }

    const count = getDownloadCount();
    if (count < MAX_FREE_DOWNLOADS) {
        incrementDownloadCount();
        window.open(downloadLink, "_blank");
    } else {
        // Bloqueia e pede chave
        showKeyModal(downloadLink);
    }
}