docker build -t node-app-image . 
docker image ls       
docker rm node-app -fv  
docker run -v %cd%:/app:ro -v /app/node_modules --env-file ./.env -p 3000:4000 -d --name node-app node-app-image
docker ps -a
docker exec -it node-app bash
docker logs node-app
docker volume ls
docker volume rm nameVolume
docker volume prune


cat node index.js
touch testefile
printenv

docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
docker-compose up --help
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v

