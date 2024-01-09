# TS Quiz Games
- Este projeto é um jogo de quiz simples implementado em Typescript, HTML e CSS, usando o json-server de banco de dados para armazenar as perguntas e respostas. Ele permite que os usuários respondam a uma série de perguntas de múltipla escolha e verifica suas respostas, fornecendo feedback imediato.

## Funcionalidades Principais
1. Obtenção de Perguntas:
- O jogo faz uma solicitação assíncrona para um servidor local para obter perguntas de um banco de dados.

2. Temporizador:
- Cada pergunta é associada a um temporizador de contagem regressiva. Os jogadores têm um tempo limitado para responder cada pergunta.

3. Feedback Imediato:
- Após a escolha de uma resposta, o jogador recebe feedback imediato sobre se a resposta está correta ou incorreta.

4. Pontuação:
- A pontuação do jogador é rastreada ao longo do jogo. A pontuação final é exibida no final do quiz.

5. Interface Gráfica:
- O jogo possui uma interface simples com cabeçalho, barra de separação, área principal de perguntas e um painel de pontuação.

6. Restart e Encerramento:
- Os jogadores têm a opção de reiniciar o quiz após a conclusão ou encerrar o jogo.

## Pré-requisitos
- Node.js

## Uso
1. Clone o repositório para o seu ambiente local e acesse o repositório.
    ```bash 
    git clone https://github.com/Joao123433/ts-quiz-game.git
    cd ts-quiz-game

2. Instale as dependências usando o npm.
    ```bash 
    npm install

3. Inicie o servidor JSON usando o json-server para simular o banco de dados.
    ```bash 
    npm run json-server

4. Abra o arquivo index.html em um navegador da web para iniciar o jogo.