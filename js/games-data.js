// Dados dos jogos - Substitua por carregamento de arquivo JSON ou API
const gameData = {
    "games": [
        {
            "id": 1,
            "name": "Adventure Quest",
            "description": "Um RPG épico com aventuras incríveis e batalhas emocionantes. Explore masmorras, colete itens raros e forme alianças com outros jogadores.",
            "image": "https://via.placeholder.com/400x300/FF6B6B/FFFFFF?text=Adventure+Quest",
            "genre": "RPG",
            "size": "2.5 GB",
            "version": "v1.2.0",
            "developer": "Epic Games Studio",
            "releaseDate": "2024-01-15",
            "downloadLink": "https://www.4shared.com/example1",
            "highlight": true
        },
        {
            "id": 2,
            "name": "Space Explorer",
            "description": "Explore galáxias distantes neste jogo de aventura espacial. Descubra planetas exóticos e enfrente alienígenas em combates estratégicos.",
            "image": "https://via.placeholder.com/400x300/4ECDC4/FFFFFF?text=Space+Explorer",
            "genre": "Aventura",
            "size": "1.8 GB",
            "version": "v2.0.1",
            "developer": "Cosmic Studios",
            "releaseDate": "2024-02-20",
            "downloadLink": "https://www.4shared.com/example2",
            "highlight": false
        },
        {
            "id": 3,
            "name": "Racing Thunder",
            "description": "Corridas em alta velocidade com carros incríveis. Customize seu veículo e participe de campeonatos mundiais.",
            "image": "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Racing+Thunder",
            "genre": "Corrida",
            "size": "3.2 GB",
            "version": "v1.5.2",
            "developer": "Speed Games",
            "releaseDate": "2024-03-10",
            "downloadLink": "https://www.4shared.com/example3",
            "highlight": true
        },
        {
            "id": 4,
            "name": "Puzzle Master",
            "description": "Desafie sua mente com quebra-cabeças complexos. Mais de 500 níveis únicos com mecânicas inovadoras.",
            "image": "https://via.placeholder.com/400x300/96CEB4/FFFFFF?text=Puzzle+Master",
            "genre": "Puzzle",
            "size": "800 MB",
            "version": "v1.0.3",
            "developer": "Brain Games",
            "releaseDate": "2024-04-05",
            "downloadLink": "https://www.4shared.com/example4",
            "highlight": false
        },
        {
            "id": 5,
            "name": "Combat Arena",
            "description": "Lute contra adversários em batalhas épicas. Sistema de combate profundo com múltiplas classes de personagens.",
            "image": "https://via.placeholder.com/400x300/FFEAA7/000000?text=Combat+Arena",
            "genre": "Ação",
            "size": "2.1 GB",
            "version": "v1.3.0",
            "developer": "Fight Studios",
            "releaseDate": "2024-05-15",
            "downloadLink": "https://www.4shared.com/example5",
            "highlight": true
        },
        {
            "id": 6,
            "name": "Mystery Island",
            "description": "Desvende os mistérios de uma ilha perdida. Colete pistas, resolva enigmas e descubra segredos ancestrais.",
            "image": "https://via.placeholder.com/400x300/74B9FF/FFFFFF?text=Mystery+Island",
            "genre": "Aventura",
            "size": "1.5 GB",
            "version": "v1.1.0",
            "developer": "Island Games",
            "releaseDate": "2024-06-01",
            "downloadLink": "https://www.4shared.com/example6",
            "highlight": false
        },
        {
            "id": 7,
            "name": "Cyber City",
            "description": "Aventura cyberpunk em uma cidade futurística. Hackeie sistemas, customize implantes e escolha seu destino.",
            "image": "https://via.placeholder.com/400x300/A29BFE/FFFFFF?text=Cyber+City",
            "genre": "RPG",
            "size": "4.2 GB",
            "version": "v2.1.0",
            "developer": "Future Games",
            "releaseDate": "2024-07-12",
            "downloadLink": "https://www.4shared.com/example7",
            "highlight": false
        },
        {
            "id": 8,
            "name": "Farm Simulator",
            "description": "Gerencie sua própria fazenda. Plante, colha, crie animais e construa o império agrícola dos seus sonhos.",
            "image": "https://via.placeholder.com/400x300/55A3FF/FFFFFF?text=Farm+Simulator",
            "genre": "Simulação",
            "size": "1.2 GB",
            "version": "v1.4.0",
            "developer": "Rural Studios",
            "releaseDate": "2024-08-03",
            "downloadLink": "https://www.4shared.com/example8",
            "highlight": false
        }
    ]
};