# typescript-node-api

## Testing with cUrl

### GET

```sh
curl --location --request GET 'localhost:3000/users' \
--header 'Content-Type: application/json'
```

### POST

```sh
curl --location --request POST 'localhost:3000/users' \
--header 'Content-Type: application/json'
```

```json
{
   "error": "Missing required fields email and/or password"
}
```

```sh
curl --location --request POST 'localhost:3000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
   "email": "devjckennedy@gmail.com",
   "password": "Passw0rd!23"
}'
```

```json
{
    "id": "hJgUcVUX7"
}
```

`REST_API_EXAMPLE_ID="put_id_here"`

```sh
curl --location --request GET "localhost:3000/users/$REST_API_EXAMPLE_ID" \
--header 'Content-Type: application/json'
```

### PUT

```sh
curl --location --request PUT "localhost:3000/users/$REST_API_EXAMPLE_ID" \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "devjckennedy@gmail.com",
    "password": "Passw0rd!23",
    "firstName": "Kennedy",
    "lastName": "John",
    "permissionLevel": 8
}'
```

### PATCH

```sh
curl --location --request PATCH "localhost:3000/users/$REST_API_EXAMPLE_ID" \
--header 'Content-Type: application/json' \
--data-raw '{
    "lastName": "James"
}'
```

```json
[
  {
    "id": "hJgUcVUX7",
    "email": "devjckennedy@gmail.com",
    "password": "$argon2i$v=19$m=4096,t=3,p=1$sTpFisChUy3L6rYNzVb9HQ$fm2Dd5cy/7Dof0vv0WymRrktJG3CRzTJih5uWsf0ry8",
    "firstName": "Kennedy",
    "lastName": "James",
    "permissionLevel": 8
  }
]
```

### DELETE

```sh
curl --location --request DELETE "localhost:3000/users/$REST_API_EXAMPLE_ID" \
--header 'Content-Type: application/json'
```