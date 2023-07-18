Yarn run dev to start the server


Routes ==> 

By default its its going tu use 3333 port

/GET - List all transactions in your session

/POST - Create new transaction with the folowwing data = { amount, type, name }

/GET/SUMMARY - List the total balance 






#RF

-O usuario pode criar uma nova transação;
-O usuário deve poder obter um resumo da conta;
-O usuario podera listar transações que ja ocorreram;
-O usuario deve poder visualizar uma transação unica;

#RN

-A transação pode ser do tipo crédito que vai somar ao valor total, e débito que subtrairá;
-Deve ser possivel indetifircamos o usuario entre as requisições;
-O usuario só podera visualizar as transações a qual criou;
