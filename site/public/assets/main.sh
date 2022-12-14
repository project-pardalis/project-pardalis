#!/bin/bash 
#PARDALIS -> GNU/GPL3 LICENSE 
 

#vendo permissao root 
if [  `id -u ` != 0 ] ; then 
  echo "Execute como administrador a aplicação para funcionar"
  exit 0 
fi




printf "\e[33m_____        _____  _____          _      _____  _____\e[0m 
 \e[32m|  __ \ /\   |  __ \|  __ \   /\   | |    |_   _|/ ____|\e[0m 
 \e[33m| |__) /  \  | |__) | |  | | /  \  | |      | | | (___\e[0m  
 \e[31m|  ___/ /\ \ |  _  /| |  | |/ /\ \ | |      | |  \___ \e[0m 
 \e[35m| |  / ____ \| | \ \| |__| / ____ \| |____ _| |_ ____) |\e[0m
 \e[36m|_| /_/    \_\_|  \_\_____/_/    \_\______|_____|_____/\e[0m 
                                                         
  \e[1;96m Best video monitors system \e[0m                                                        "

  echo "Para que a instalação funcione perfeitamente, insira uma senha para login nas aplicações necessárias"
 
  echo "Verificando se dependências estão instaladas..."
  sleep 2
    
  j=0 
  if which java >/dev/sda1 ; then 
    echo "Java [X]"
    j=$((j+1))  
  else 
    echo "Java []"
  fi 
  sleep 1
  if which python >/dev/sda1 ; then
    j=$((j+1))  
    echo "Python [x]"
  else 
      echo "Python []"
  fi 
  sleep 1  
  if [ $j -lt 2 ] ; then
    printf "Deseja instalar as dependências?\n1 - Sim \n2 - Não\n"
    read  choose 
  else 
    echo "Todas suas dependências estão instaladas! "
  fi 
  sleep 1
while [ $j -lt 2 ]; do 
  if [ $choose -eq 1 ] ; then
    echo "Instalando aplicações..."
	#install docker
    sudo apt update -y  
    sudo apt upgrade -y 
    sudo apt install git -y 
    sudo apt install docker.io -y 
    sudo apt install systemd -y 
    systemctl start docker
    systemctl enable docker 

    #instalando java
    sudo apt install default-jre default-jdk -y 
    sudo apt install python3 -y
    #instalando python
    sudo apt install python3 pip -y 

    #instalando dependencias python 
    pip install pymysql psutil datetime getmac lib-platform pymssql 
    sudo apt upgrade -y 
    sudo apt update -y 
    j=2

    #configurando docker 

    break  
  elif [ $choose -eq 2 ]; then   
    echo "Não será possível continuar nosso software sem as dependências necessárias. "
    exit 0
  else 
    echo $choose


  fi 
done 
 


#clonando nosso projeto 
printf "Gostaria de continuar?\n 1-Sim \n 2-Não "
read choose 
if [ $choose -eq 1 ]; then
  #configurando docker
  echo "Instalando projeto... "
  sleep 1

  
  cd ~ && git clone https://github.com/project-pardalis/project-pardalis
  cd project-pardalis 
  #configurando docker 
  echo "Configurando container, a aplicação irá pedir a senha que inseriu anteriormente, com isso, insira a mesma aqui. "
  
  sudo docker rm -f pardalis_sql #se tiver, starta pra config
  sudo docker pull mysql:5.7 
  sudo docker run -d -p 3306:3306 --name pardalis_sql -e "MYSQL_DATABASE=PARDALIS" -e "MYSQL_ROOT_PASSWORD=urubu100" -e "MYSQL_USER=root" mysql:5.7 
  sudo docker start pardalis_sql
  clear
  echo "Aguardando servidor subir ... " 
  sleep 3
  echo "1 - Banco Local de Backup \n2 - Sem banco local para Backup \n " 
  read choose_banco 
  if [ $choose_banco -eq 1 ] ; then 
    echo "Por favor, copie o código abaixo no mysql : Nosso software não tem permissão para criar o Banco de Dados"
    sleep 2 
    cat ~/project-pardalis/banco-de-dados/SQL-PARDALIS.sql 
    echo "\n\n"
    sudo docker exec -it pardalis_sql mysql -uroot -p 

  else 
    echo "Nosso sistema está conectado na Azure! Contudo, não terás o backup local"
    exit 
  fi 
else 
  echo "Certo! Clone manualmente em  https://github.com/project-pardalis/project-pardalis
"
fi

echo "INSTRUÇÕES : 
\n 
Para executar nosso site, acesse a pasta /site e execute npm run dev\n
Para executar nossa aplicação python, acesse a pasta /python e execute o main.py \n 
Após executar nossa aplicação Python, apenas abra o site, cadastre-se e acesse nossa dashboard para ter acesso aos dados, clique em + e pegue o endereço mac pelo python"
