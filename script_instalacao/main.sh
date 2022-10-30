#!bin/bash 
#PARDALIS -> GNU/GPL3 LICENSE 
echo "  _____        _____  _____          _      _____  _____ 
 |  __ \ /\   |  __ \|  __ \   /\   | |    |_   _|/ ____|
 | |__) /  \  | |__) | |  | | /  \  | |      | | | (___  
 |  ___/ /\ \ |  _  /| |  | |/ /\ \ | |      | |  \___ \ 
 | |  / ____ \| | \ \| |__| / ____ \| |____ _| |_ ____) |
 |_| /_/    \_\_|  \_\_____/_/    \_\______|_____|_____/ 
                                                         
  Best video monitors system                                                        "

sleep 2 

 

  echo "Instalando"
  #verificando java
   java -version

  #instalando java
  sudo apt install default-jre -y 

  clear

  sudo apt install default-jre default-jdk -y ; 
  echo "Java instalado! "

  #instalando python
  sudo apt install python3 pip -y 

  #instalando dependencias python 
  pip install pymysql psutil datetime  getmac tkinter json platform 

   #clonando nosso projeto
  cd ~/Documentos
  git clone https://github.com/project-pardalis/project-pardalis
  cd project-pardalis/site 
  
  #criando tabelas
 # npm start para rodarr paralelo
  sudo npm i 
  
