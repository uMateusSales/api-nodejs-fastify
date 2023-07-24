Repositório inicial para criar API. Feita com Typescript e Fastify . A conexão padrão neste projeto é com um db gerado pelo Knex ja que o intuito do projeto seria pra estudo de regras de negocio 

Primeros pasos
Execute npm install para instalar as dependências. Execute npm run dev para iniciar o serviço.

Crie novas transações no banco de dados adicionando na rota POST de "/transactions" ela recebe os dados de quantidade, tipo e o nome da transação

Cheque o extrato das transações do usuario da session atual com a rota GET de "/transactions/summary"

Uma nova sessão é criada a partir da primeira transação feita

Testes da rotas também disponiveis 
