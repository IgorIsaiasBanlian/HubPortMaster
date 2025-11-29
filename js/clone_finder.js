document.addEventListener('DOMContentLoaded', () => {
    const resultsGrid = document.getElementById('boardResults');
    const loadingMessage = document.getElementById('loadingBoards');
    const notFoundBtn = document.getElementById('notFoundBtn');
    const notFoundTutorial = document.getElementById('notFoundTutorial');
    const cloneDetail = document.getElementById('cloneDetail');

    let boards = [];

    // Verifica elementos mínimos
    if (!resultsGrid || !loadingMessage || !notFoundBtn || !notFoundTutorial || !cloneDetail) {
        console.warn('clone_finder.js: elementos necessários não encontrados. Abortando inicialização.');
        return;
    }

    // Carrega os dados das placas do arquivo JSON
    async function fetchBoards() {
        loadingMessage.style.display = 'block';
        try {
            const response = await fetch('../js/data/boards.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            boards = await response.json();
        } catch (error) {
            console.error('Não foi possível carregar o arquivo de placas:', error);
            resultsGrid.innerHTML = '<p class="error-message">Erro ao carregar os dados dos clones. Tente novamente mais tarde.</p>';
        } finally {
            loadingMessage.style.display = 'none';
        }
    }

    function createCard(board) {
        const card = document.createElement('div');
        card.className = 'board-card';

        const img = document.createElement('img');
        img.src = board.image;
        img.alt = `Imagem da placa ${board.name}`;
        img.onerror = function() { this.src = '../img/placeholder.png'; };

        const content = document.createElement('div');
        content.className = 'board-card-content';

        const title = document.createElement('h3');
        title.textContent = board.name;

        const desc = document.createElement('p');
        desc.textContent = board.description;

        content.appendChild(title);
        content.appendChild(desc);
        card.appendChild(img);
        card.appendChild(content);

        // Ao clicar no cartão, mostra detalhes
        card.addEventListener('click', () => showDetail(board));

        return card;
    }

    function renderAllBoards() {
        resultsGrid.innerHTML = '';
        if (!boards || boards.length === 0) {
            resultsGrid.innerHTML = '<p class="info-message">Nenhum clone listado.</p>';
            return;
        }
        boards.forEach(board => {
            resultsGrid.appendChild(createCard(board));
        });
    }

    function showDetail(board) {
        cloneDetail.style.display = 'block';
        cloneDetail.innerHTML = '';

        const title = document.createElement('h3');
        title.textContent = board.name;

        const img = document.createElement('img');
        img.src = board.image;
        img.alt = board.name;
        img.onerror = function() { this.src = '../img/placeholder.png'; };
        img.style.maxWidth = '320px';

        const desc = document.createElement('p');
        desc.textContent = board.description;

        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Fechar';
        closeBtn.className = 'btn';
        closeBtn.addEventListener('click', () => { cloneDetail.style.display = 'none'; });

        cloneDetail.appendChild(title);
        cloneDetail.appendChild(img);
        cloneDetail.appendChild(desc);
        cloneDetail.appendChild(closeBtn);
    }

    // Toggle tutorial para casos não encontrados
    notFoundBtn.addEventListener('click', () => {
        if (notFoundTutorial.style.display === 'none' || notFoundTutorial.style.display === '') {
            notFoundTutorial.style.display = 'block';
            notFoundBtn.textContent = 'Ocultar instruções';
        } else {
            notFoundTutorial.style.display = 'none';
            notFoundBtn.textContent = 'Meu console não está na lista';
        }
    });

    // Inicialização
    (async function init() {
        await fetchBoards();
        renderAllBoards();
    })();
});