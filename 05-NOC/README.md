
# Proyecto NOC


The goal is to create a project capable of sending notification logs via File System, MongoDB, and PostgreSQL, using an approach based on Clean Architecture with:

- TypeScript to take advantage of strong typing.
- Docker Compose to create simulated test and development environments.
- Jest for unit testing and running tests in the Docker-based test environment.

# Dev

1. Clone the .env.template file and rename it to .env.
2. Configure the environment variables. Note: Obtain the Gmail key for the MAILER environment variables.
3. Run the command: ``` npm install ```
4. Start the databases with: ``` docker compose up -d ```
5. Run the project in development mode: ``` npm run dev ```
6. Run the project in test mode: ``` npm run test:watch ```
