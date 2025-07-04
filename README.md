docker build -t node-app-image . 
docker image ls       
docker rm node-app -fv  
docker run -v %cd%:/app:ro -v /app/node_modules --env-file ./.env -p 3000:4000 -d --name node-app node-app-image
docker ps -a
docker exec -it node-app bash
docker logs node-app -f
docker volume ls
docker volume rm nameVolume
docker volume prune
docker inspect node-docker-mongo-1
docker network ls
docker network inspect node-docker_default

docker login
docker image tag node-docker-node-app caitano09/node-app
docker push caitano09/node-app
docker run -d --name watchtower -e WATCHTOWER_TRACE=true -e WATCHTOWER_DEBUG=true -e WATCHTOWER_POLL_INTERVAL=50 -v var/run/docker.sock:/var/run/docker.sock containrrr/watchtower app_node-app_1
docker rm watchtower -f

docker info
docker swarm init

cat node index.js
touch testefile
printenv
ping mongo
export SESSION_SECRET="hello"
set -o allexport; source /root/.env; set +o allexport;
mkdir app

#use --help para ver o que significa os comandos
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build -V --no-deps node-app --scale node-app=2 --force-recreate 
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build
docker-compose -f docker-compose.yml -f docker-compose.prod.yml push 
docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull 

docker exec -it node-docker-mongo-1 mongosh -u "sanjeev" -p "mypassword"
mongosh -u "sanjeev" -p "mypassword"
db
use mydb
show dbs
db.books.insertOne({"name": "harry potter"})
db.books.find()

docker exec -it node-docker-redis-1 redis-cli
KEYS *
GET "sess:IyE2EPGGLqbG39cWo-gh92Um6fP4Ref6"