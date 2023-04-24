<p align="center">
  <a href="https://www.fathom3.com/">
    <img src="https://media.licdn.com/dms/image/C4E0BAQH9Tu6iQO5XYQ/company-logo_200_200/0/1602232630512?e=1690416000&v=beta&t=U5EbVU3ZBWJqz_0ZGU-N9FTX0OZgmeLIRlrlc5eri4A" width="150px" height="150px"/>
  </a>
</p>

<h1 align="center">
  🔶  Fathom3 Node.js Developer Task
</h1>


<p align="center">
  Este proyecto se ha desarrollado una API con <strong> Node.js, Typescript, Prisma, Postgres y Fastify</strong>.
   <br>
   Se han realizado pruebas automatizadas con <strong>TAP</strong> para garantizar la calidad del código y la funcionalidad de la API.
  <br>
  El frontend se ha desarrollado <strong>React TS, Redux Toolkit</strong> y <strong>TailwindsCss</strong>.
  <br />
  <br />
</p>

## 🚀 Setup

### 🔥  Ejecución
1. Ejecuta `docker-compose build`.
2. Ejecuta `docker-compose up -d`

Una vez los contenedores estén en marcha, tendrás los siguientes entornos:

* Base de datos en postgres en el puerto 5432.
* Backend `http://localhost:3000/`
* Frontend `http://localhost:3001/`


### ✅  Ejecución de los test.
1- Detener los contenedores

`docker-compose stop`

2- Iniciar el contenedor que contiene la base de datos

`docker-compose up -d db`

3- Iniciamos el backend en modo test

`cd ./backend && npm run test`
