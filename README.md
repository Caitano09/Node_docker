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
docker inspect node-docker-mongo-1
docker network ls
docker network inspect node-docker_default

cat node index.js
touch testefile
printenv
ping mongo
export SESSION_SECRET="hello"
set -o allexport; source /root/.env; set +o allexport;
mkdir app

docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build -V --no-deps node-app --scale node-app=2
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v

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