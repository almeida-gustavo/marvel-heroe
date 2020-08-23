Passos para Rodar Backend

- **Baixar projeto**
- **Rodar yarn ou npm install**

- **Configurar Banco de dados** 

    - Caso esteja rodando no postgres local: Abrir seu SGBD de preferência e criar um banco com nome api_golden_taxi
    - Caso esteja rodando docker: Criar um container -> docker run --name "Nome desejado" -e POSTGRES_PASSWORD=localhost -p 5432:5432 -d postgres
    - Observação: Caso já tenha um banco rodando com outra senha, basta trocar essa senha localhost no arquivo .env do projeto.

- **Depois de realizar os passos acima, rodar o comando: "yarn sequelize db:migrate"  para rodar as migrações no banco de dados**
    - Observação: Caso não tenha pegado os dados do banco antigo da golden, deleta a primeira migração que é da normalização do banco deles. Se não fizer isso, as migrações não vão rodar.

- **E por ultimo, rodar o projeto com:   yarn start**