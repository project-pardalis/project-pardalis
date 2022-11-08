sudo docker rm -f pardalis_sql #se tiver, starta pra config

sudo docker pull mysql/mysql-server:latest 
sudo docker run -d -p 3306:3306 --name pardalis_sql -e MYSQL_ROOT_PASSWORD=urubu100 -e MYSQL_USER=root mysql/mysql-server:latest
docker exec -it pardalis_sql mysql -uroot -p < ~/Documentos/project-pardalis/banco-de-dados/SQL-PARDALIS.sql bash
