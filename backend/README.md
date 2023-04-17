# TechnicalTest 

### Prerequisitos:

* Docker

### Ejecutando la aplicación con Docker

1. Clonar el repositorio.

	`git clone https://github.com/antonioglezf/TechnicalTest-.git`

2. Navegar al directorio del proyecto.

	`cd TechnicalTest`


3. Ejecutar Docker Compose.

	`docker-compose up`

4. Visitar la [aplicación]((http://localhost:3000))
5. Para detener la aplicación, use CTRL+C en la ventana de la terminal donde inició Docker Compose y eliminar el contenedor:

	`docker-compose down`

### Ejecución en local

1. Crear contenedor con postgres en local
`docker run --name dev_test_local -e POSTGRES_PASSWORD=antonio -p 5414:5432 -d postgres`

2. Generar una migración usando
`npx prisma migrate dev --name my-migration`

3. Aplicar la mirgación en la base de datos
`npx prisma migrate deploy`
