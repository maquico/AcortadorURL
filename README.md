# Proyecto AcortadorURL
## Descripción del proyecto
Minimum viable product (MVP) del proyecto de Acortador URL de la asignatura de Laboratorio de Tendencias de Software (IDS347L) en el cual se tuvo que aplicar los 12 Factores, especificamente: 
- Code Base (I)
- Dependencias (II)
- Config (III)
- Backing Services (IV)
- Port Binding (VII)

# Docker
## Instalación
Para instalar Docker en Windows, se debe descargar el instalador de la página oficial de Docker: https://www.docker.com/products/docker-desktop

## Uso
Para ejecutar el proyecto, se debe ejecutar el siguiente comando en la carpeta raíz del proyecto:
-- docker build -t mongo .
-- docker run --name urlmongo -p 27017:27017 -d mongo

## Docker hub
El primer paso es hacer login usando tu usario de dockerhub:
 -- docker login 
  -- (Te pedirá colocar usuario y contraseña)

Si vas a crear una nueva imagen de los contenedores ya sea de la web o de la bd ve a los comandos A. Si la imagen que vas a utilizar esta creada ve a los comandos B.

Comandos A:
    Para montar en dockerhub tanto el contenedor de la base de datos como el de la aplicación se deben correr los siguientes comandos         sustituyendo por tu usuario de dockerhub:
      bd:
      -- docker build -t usuario/acortador_bd .
      -- docker tag usuario/acortador_bd usuario/acortador_bd:v1.3
      -- docker push usuario/acortador_bd:v1.3
      app:
      -- docker build -t usuario/acortador_url .
      -- docker tag usuario/acortador_url usuario/acortador_url:v1.3
      -- docker push usuario/acortador_url:v1.3

Comandos B:
    Si ya se hizo build de la imagen luego del login ejecutar:
      -- docker pull usuario/acortador_bd:v1.3
      -- docker pull usuario/acortador_url:v1.3

Correr: 
-- docker-compose up
Dirigirse a http://localhost:5000/

# Integrantes del equipo: 
- Eros Bencosme 1104510
- Gleidy Espinal 1104225
- Angel Moreno 1104666
- Rolbik Urbaez 1105721 
- Huan Hao Wu 1104326
