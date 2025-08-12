let allGames = [];
let filteredGames = [];


// Função para carregar dados dos jogos
async function loadGames() {
    try {
        const response = await fetch('games.json'); // Carrega o arquivo JSON
        const data = await response.json();
        
        // Gerar IDs dinamicamente
        const reversedGames = data.games.slice().reverse(); // Cria uma cópia invertida
        allGames = reversedGames.map((game, index) => ({

            ...game, // Copia todas as propriedades existentes do jogo
            id: index + 1 // Adiciona um ID baseado no índice (começando do 1)
        }));

        filteredGames = allGames;
        renderHighlights();
        renderGames();
        document.getElementById('loading').style.display = 'none';
    } catch (error) {
        console.error('Erro ao carregar os jogos:', error);
        document.getElementById('loading').textContent = 'Erro ao carregar jogos. Tente novamente mais tarde.';
    }
}

// Função para renderizar jogos em destaque
function renderHighlights() {
    // Certifique-se de que 'highlightsGrid' é o ID correto para a grade interna
    const highlightsGrid = document.getElementById('highlightsGrid');
    const highlights = allGames.filter(game => game.highlight);
    
    highlightsGrid.innerHTML = highlights.map(game => `
        <div class="game-card highlight" onclick="openModal(${game.id})">
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
    const gamesGrid = document.getElementById('gamesGrid');
    const noResults = document.getElementById('noResults');
    
    if (filteredGames.length === 0) {
        gamesGrid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    gamesGrid.innerHTML = filteredGames.map(game => `
        <div class="game-card" onclick="openModal(${game.id})">
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

// Função para abrir modal do jogo
function openModal(gameId) {
    const game = allGames.find(g => g.id === gameId);
    if (!game) return;

    document.getElementById('modalImage').src = game.image;
    document.getElementById('modalTitle').textContent = game.name;
    document.getElementById('modalDescription').textContent = game.description;
    document.getElementById('downloadButton').onclick = () => {
    showSubscribePrompt(game.downloadLink);
};

    
    const details = document.getElementById('modalDetails');
    details.innerHTML = `
        <div class="detail-item">
            <div class="detail-label">Gênero</div>
            <div class="detail-value">${game.genre}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">Tamanho</div>
            <div class="detail-value">${game.size}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">Versão</div>
            <div class="detail-value">${game.version}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">Desenvolvedor</div>
            <div class="detail-value">${game.developer}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">Lançamento</div>
            <div class="detail-value">${new Date(game.releaseDate).toLocaleDateString('pt-BR')}</div>
        </div>
    `;
    
    // Adicionar o aviso abaixo do botão de download
    const modalBody = document.querySelector('#gameModal .modal-body');
    let feedbackDiv = modalBody.querySelector('.game-feedback-notice');
    if (!feedbackDiv) {
        feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'game-feedback-notice';
        feedbackDiv.style.marginTop = '20px';
        feedbackDiv.style.textAlign = 'center';
        modalBody.appendChild(feedbackDiv);
    }
    feedbackDiv.innerHTML = `
        <small style="color: #636e72; font-size: 0.9rem;">
            Encontrou um link quebrado ou imagem ausente neste jogo?
            <br>
            Por favor, <a href="https://discord.gg/tN8vr5Ea5X" target="_blank" style="color: #667eea; text-decoration: none; font-weight: bold;">avise-nos no Discord</a>!
        </small>
    `;

    document.getElementById('gameModal').style.display = 'block';
}

// Função para fechar modal do jogo
function closeModal() {
    document.getElementById('gameModal').style.display = 'none';
}

function showSubscribePrompt(downloadLink) {
    // Cria o modal temporário
    const modal = document.createElement('div');
    modal.className = 'subscribe-modal';
    modal.innerHTML = `
        <div class="subscribe-content">
            <h2>🎮 Antes de baixar...</h2>
            <p>Ajude o projeto se inscrevendo no nosso canal no YouTube!</p>
            <a href="https://www.youtube.com/@PidiottoRetroHub?sub_confirmation=1" 
               target="_blank" 
               class="subscribe-btn">✅ Inscrever-se</a>
            <button class="continue-btn">Continuar para o Download</button>
        </div>
    `;

    // Adiciona o modal na tela
    document.body.appendChild(modal);

    // Evento para continuar para o download
    modal.querySelector('.continue-btn').onclick = () => {
        window.open(downloadLink, '_blank');
        modal.remove();
    };

    // Fechar clicando fora
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}


// Função de pesquisa
function searchGames() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    filteredGames = allGames.filter(game => 
        game.name.toLowerCase().includes(searchTerm) ||
        game.description.toLowerCase().includes(searchTerm) ||
        game.genre.toLowerCase().includes(searchTerm)
    );
    renderGames();
}

// Função para abrir modal de apoio
function openSupportModal() {
    document.getElementById('supportModal').style.display = 'block';
}

// Função para fechar modal de apoio
function closeSupportModal() {
    document.getElementById('supportModal').style.display = 'none';
}

// Função para copiar chave PIX
function copyPixKey() {
    const pixKey = document.getElementById('pixKey').textContent;
    navigator.clipboard.writeText(pixKey).then(() => {
        alert('Chave PIX copiada para a área de transferência! 📋');
    }).catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = pixKey;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Chave PIX copiada! 📋');
    });
}

// Event listeners
document.getElementById('searchInput').addEventListener('input', searchGames);
document.querySelector('#gameModal .close').addEventListener('click', closeModal);
document.querySelector('#supportModal .support-close').addEventListener('click', closeSupportModal);

// Fechar modais clicando fora
window.addEventListener('click', function(event) {
    const gameModal = document.getElementById('gameModal');
    const supportModal = document.getElementById('supportModal');
    if (event.target === gameModal) {
        closeModal();
    }
    if (event.target === supportModal) {
        closeSupportModal();
    }
});

// --- CONTROLE DE VISIBILIDADE DA SEÇÃO DE DESTAQUES ---
// Obtém a referência aos elementos
const searchInput = document.getElementById('searchInput');
const highlightsSection = document.getElementById('highlightsSection'); // Usando o novo ID da seção inteira

// Verifica se os elementos existem antes de adicionar o event listener
if (searchInput && highlightsSection) {
    searchInput.addEventListener('input', () => {
        // Se houver texto na pesquisa, esconde a seção de destaques
        if (searchInput.value.trim() !== '') {
            highlightsSection.style.display = 'none';
        } else {
            // Se o campo estiver vazio, mostra a seção de destaques
            highlightsSection.style.display = 'block'; // Ou 'flex' se for um contêiner flexbox no CSS
        }
    });
}
// --- FIM DO CONTROLE DE VISIBILIDADE ---


// Mostrar modal de apoio automaticamente após 30 segundos
setTimeout(() => {
    openSupportModal();
}, 30000);

// Inicializar a aplicação
loadGames();

