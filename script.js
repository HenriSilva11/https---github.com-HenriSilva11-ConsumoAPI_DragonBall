// Seleciona o container onde os personagens serão exibidos
const container = document.getElementById('personagens-container');

// URL da API (Limite de 50 personagens para um grid bem preenchido)
const API_URL = 'https://dragonball-api.com/api/characters?limit=100';

/**
 * Função principal para buscar e renderizar os personagens
 */
const carregarPersonagens = () => {
    // 1. Iniciamos o fetch
    fetch(API_URL)
        .then(response => {
            // Verifica se a resposta foi bem sucedida (status 200-299)
            if (!response.ok) {
                throw new Error('Erro na rede: ' + response.statusText);
            }
            return response.json(); // Converte a resposta para JSON
        })
        .then(data => {
            // A API do Dragon Ball retorna os itens dentro de um array chamado 'items'
            const personagens = data.items;
            
            // Limpa o container antes de carregar (bom para evitar duplicatas)
            container.innerHTML = '';

            // 2. Mapeia os dados e cria o HTML dinâmico
            personagens.forEach(p => {
                const card = document.createElement('div');
                card.classList.add('card');

                card.innerHTML = `
                    <img src="${p.image}" alt="${p.name}">
                    <div class="card-body">
                        <h3>${p.name}</h3>
                        <p><strong>Raça:</strong> ${p.race}</p>
                        <p><strong>KI:</strong> ${p.ki}</p>
                    </div>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => {
            // 3. Tratamento de erro caso a API falhe ou a internet caia
            console.error('Erro ao buscar personagens:', error);
            container.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; color: red; padding: 20px;">
                    <h2>Ocorreu um erro ao elevar o Ki!</h2>
                    <p>${error.message}</p>
                </div>
            `;
        });
};

// Executa a função ao carregar o arquivo
carregarPersonagens();