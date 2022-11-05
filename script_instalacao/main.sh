#!bin/bash 
#PARDALIS -> GNU/GPL3 LICENSE 
 

echo "  _____        _____  _____          _      _____  _____ 
 |  __ \ /\   |  __ \|  __ \   /\   | |    |_   _|/ ____|
 | |__) /  \  | |__) | |  | | /  \  | |      | | | (___  
 |  ___/ /\ \ |  _  /| |  | |/ /\ \ | |      | |  \___ \ 
 | |  / ____ \| | \ \| |__| / ____ \| |____ _| |_ ____) |
 |_| /_/    \_\_|  \_\_____/_/    \_\______|_____|_____/ 
                                                         
  Best video monitors system                                                        "

  echo "Verificando se dependências estão instaladas..."
  sleep 1
  
  j=0 
  if which java >/dev/sda1 ; then 
    echo "Java [X]"
    let j=j+1  
  else 
    echo "Java []"
  fi 
  sleep 1
  if which python >/dev/sdba ; then
    let j=$j+1  
    echo "Python [x]"
  else 
      echo "Python []"
  fi 
  
  if [ $j -lt 2 ] ; then
    printf "Deseja instalar as dependências?\n1 - Sim \n2 - Não"
    read  choose 
  else 
    echo "Todas suas dependências estão instaladas! "
  fi 
  sleep 1
while [ $j -lt 2 ]; do 
  if [ $choose -eq 1 ] ; then
    echo "Instalando aplicações..."
    sudo apt install git -y 
    sudo apt install docker.io 
    systemctl start docker
    systemctl enable docker 

    #instalando java
    sudo apt install default-jre -y 

    clear

    sudo apt install default-jre default-jdk -y ; 
    echo "Java instalado! "

    sudo apt install python3 -y
    #instalando python
    sudo apt install python3 pip -y 

    #instalando dependencias python 
    pip install pymysql psutil datetime getmac json platform 
    sudo apt upgrade -y 
    sudo apt update -y 
    let j=2
    break  
  elif [ $choose -eq 2 ]; then   
    echo "Não será possível continuar nosso software sem as dependências necessárias. "
    exit 0
  else 
    echo $choose


  fi 
done 
 


#clonando nosso projeto

clear 
printf "Gostaria de continuar?\n 1-Sim \n 2-Não "
read choose 
if [ $choose -eq 1 ]; then 
  cd ~/Documentos
  git clone https://github.com/project-pardalis/project-pardalis
  cd project-pardalis/site 
  npm start
else 
  echo "Certo! Clone manualmente em  https://github.com/project-pardalis/project-pardalis
"
fi
