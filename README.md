# README

![Docker Compose](https://img.shields.io/badge/Docker%20Compose-3.8-blue) ![DynamoDB](https://img.shields.io/badge/DynamoDB-Latest-orange) ![Elasticsearch](https://img.shields.io/badge/Elasticsearch-8.8.1-yellow) ![Kibana](https://img.shields.io/badge/Kibana-8.8.1-yellow)

Este README proporciona una visión general de la solución y las instrucciones para ejecutar y visualizar la API de Node.js para el registro de usuarios, mensajería y visualización de datos utilizando de Discord contenedores Docker. La solución utiliza DynamoDB para almacenar los datos de los usuarios, Elasticsearch para almacenar los mensajes y Kibana para la visualización de datos.

## Requisitos previos

Antes de ejecutar la solución, asegúrese de tener instaladas las siguientes dependencias:

- Docker
- Node.js
- Yarn (opcional, si utiliza Yarn en lugar de npm)

## Empezando

Siga los pasos a continuación para configurar y ejecutar la solución:

1. Clone el repositorio en su máquina local:

   ```bash
   git clone https://github.com/hyanezs/bbddnr.git
   ```

2. Navegue hasta el directorio del proyecto:

   ```bash
   cd bbddnr
   ```

3. Inicie los contenedores de Docker utilizando Docker Compose:

   ```bash
   docker-compose up -d
   ```

   Este comando iniciará los contenedores de DynamoDB, Elasticsearch y Kibana con las configuraciones especificadas.
   **Espere a que termine de inicializar.**

4. Instale las dependencias de la API de Node.js:

   ```bash
   npm install
   ```

   o

   ```bash
   yarn
   ```

5. Inicie el servidor de la API de Node.js:

   ```bash
   yarn start
   ```

   El servidor de la API estará accesible en `http://localhost:5000`.

## Almacenamiento y Visualización de Datos

La solución utiliza los siguientes componentes para el almacenamiento y visualización de datos:

- **DynamoDB**: Los usuarios se almacenan junto con su configuración en una instancia de DynamoDB. Puede visualizar los datos utilizando la herramienta [NoSQL Workbench](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.html) o cualquier cliente de DynamoDB de su elección. Para conectarse al contenedor de DynamoDB, utilice las siguientes credenciales:

  - Endpoint: `http://localhost:8000`
  - Región: `us-east-1`
  - Access Key ID: `fakeAcessKey`
  - Secret Access Key: `fakeSecretAccessKey`

- **Elasticsearch**: Los mensajes se almacenan en Elasticsearch. El contenedor de Elasticsearch es accesible en `http://localhost:9200`. Sin embargo, no se requiere una interacción directa con Elasticsearch para esta solución.

- **Kibana**: Kibana se utiliza para la visualización de datos. Acceda al panel de Kibana visitando `http://localhost:5601` en su navegador web. La conexión a Elasticsearch se configura automáticamente. Desde el panel de Kibana, puede explorar y visualizar los datos de mensajes almacenados en Elasticsearch.

Tenga en cuenta que Elasticsearch puede tardar unos segundos en iniciarse antes de que se pueda acceder a él a través de Kibana o la aplicacion.

## Uso de la API

La API proporciona puntos finales para el registro de usuarios, mens

ajería y recuperación de datos. A continuación se muestran algunos de los puntos finales disponibles:

- `POST /users`: Registrar un nuevo usuario.
- `POST /messages`: Enviar un mensaje.

`NO UTILIZADO - VISUALIZAR POR HERRAMIENTAS`

- `GET /messages/:id`: Obtener mensajes
- `GET /users`: Obtener usuarios

Consulte el código fuente de la API para obtener información detallada sobre los puntos finales disponibles y su uso.

Dejamos una [coleccion de postman](./postman_collection.json) con requests para publicar usuarios y mensajes.
