# MARVEL HEROE
## About the projeto
- This project was design for you to see your favorites characters and comic and favorite them. 

## Runing backend
- yarn or npm install
- To run the database you can choose from two options
  - DB directly in machine: 
    - Need to have postgres downloaded
    - Remove password from file src/config/database.js
    - Create DB with the name "marvel" 
  - DB as a contianer in docker: 
    - Create container: docker run --name localhost -e POSTGRES_PASSWORD=localhost -p 5432:5432 -d postgres
    - Create DB with the name "marvel" 
 - After you choose one of the methods above, you must run yarn sequelize db:migrate
- yarn start to start project
- Access: http://localhost:3333/api-docs to test application in swagger

### Observation
- The .env was not ommited on purpose. In case you want to change the name of the DB or password, you can do it in there.

## Runing frontend
- yarn or npm install
- open browser on port
  
