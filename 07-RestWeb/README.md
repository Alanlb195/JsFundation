# RESTful API Project and HTTP/HTTP2 Protocol Management

1. This project includes two routes, one for using HTTP and HTTP2. To test
   HTTP2, a certificate is required. Use the following command on macOS:

```
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
```

On Windows, installing and configuring additional components like OpenSSL may be
necessary.

2. On the other hand, the RESTful API project requires running the application
   in a development environment. A local database is needed, and in this case,
   PostgreSQL is used within a Docker container to avoid additional
   installations beyond Docker itself. Run the following command:

```
docker compose up -d
```

3. Now, the database created with Docker needs to be updated. For this, Prisma
   ORM is used:

```
npx prisma migrate deploy
```

4. To run the application, simply execute the following command inside the
   07-RestWeb directory: `npm run dev`

5. To run tests, modify env.test. Tests were performed using Jest and Supertest. To run the tests and apply
   migrations automatically, execute the following command: `npm run test:watch`
