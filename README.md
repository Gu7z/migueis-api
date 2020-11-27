<h3 align="center">
  Migueis API 🚀
</h3>

## Overview

A Migueis-API é uma API desenvolvida na matéria de Projeto Integrador 6 com a finalidade de complementar o sistema desenvolvido para o restaurante da rede Migueis.

## Fluxos

- **[Login/Registro de Usuários](#user)**
- **[Header Generation](#header-generation)**

### User

#### Registro

Para registrar um usuário, o trabalho de criar a chave privada e chave publica é do Front-End. O Back apenas armazena essas informações. O Front deve encriptar a chave privada com a senha pura do usuário e para evitar que alguem no meio do caminho pegue essa senha pura, o Front deve hashear essa senha antes de enviar. No Back pegamos esse hash e fazemos o encrypt com o bcrypt e então guardamos a senha no banco.

#### Registro de Admin

_O admin tem todas as caracteristicas de um usuário normal_

Apenas um admin consegue cadastrar outro admin. Para fazermos isso, no momento de implantação sistema, deve ser colocado um admin generico no banco apenas para criar os outros e então esse admin deve ser <strong>REMOVIDO</strong>.

#### Login

Para logar, o Front deve mandar um header com authenticação _"Basic"_ enviando o email e o hash da senha.

#### Auth

Para fazer as requisições que precisam de auth o front deve criar um jwt com a chave privada do user e mandar no header:

```js
Authorization: `Bearer ${jwt}`,
'X-User-Email': userEmail
```

##### Header generation

```js
const token = jwt.sign({ email }, privateKey, { algorithm: "RS256" });
const headers = {
  Authorization: `Bearer ${token}`,
  "X-User-Email": email,
};
```

## Endpoints

_Admin Auth_

- **[Products](#products)**
- **[Categorys](#categorys)**
- **[Orders](#orders)**

_User Auth_

- **[User](#user-1)**

#### Products

_Autenticação Necessaria_
**[Header Generation](#header-generation)**

- [List All](#list)
- [List One](#list-one)
- [Add](#add)
- [Update](#update)
- [Delete](#delete)

##### List

```
GET /products
```

###### Response

```json
[
  {
    "id": 1,
    "name": "water",
    "description": "To drink",
    "price": 5.5,
    "quantity": 10,

    "category": {
      "name": "drink",
      "id": 1
    },

    "images": [
      {
        "id": 1,
        "url": "${url}/uploads/image-name.ext"
      }
    ]
  }
]
```

##### List One

```
GET /products/:id
```

###### Response

```json
{
  "id": 1,
  "name": "water",
  "description": "To drink",
  "price": 5.5,
  "quantity": 10,

  "category": {
    "name": "drink",
    "id": 1
  },

  "images": [
    {
      "id": 1,
      "url": "${url}/uploads/image-name.ext"
    }
  ]
}
```

##### Add

```
PUT /products
```

###### Input

| Name          | Type     |
| ------------- | -------- |
| `name`        | `string` |
| `description` | `string` |
| `price`       | `number` |
| `quantity`    | `number` |
| `category`    | `number` |
| `image`       | `file`   |

`Category need to exist`

###### Response

```json
{
  "id": 1,
  "name": "water",
  "description": "To drink",
  "price": 5.5,
  "quantity": 10,

  "category": {
    "name": "drink",
    "id": 1
  },

  "images": [
    {
      "id": 1,
      "url": "${url}/uploads/image-name.ext"
    }
  ]
}
```

##### Update

```
PUT /products/:id
```

###### Input

| Name          | Type     |
| ------------- | -------- |
| `name`        | `string` |
| `description` | `string` |
| `price`       | `number` |
| `quantity`    | `number` |
| `category`    | `number` |
| `image`       | `file`   |

`Category need to exist`

###### Response

```json
{
  "id": 1,
  "name": "water",
  "description": "To drink",
  "price": 5.5,
  "quantity": 10,

  "category": {
    "name": "drink",
    "id": 1
  },

  "images": [
    {
      "id": 1,
      "url": "${url}/uploads/image-name.ext"
    }
  ]
}
```

##### Delete

```
DELETE /products/:id
```

###### Response

`204 No Response`

#### Categorys

_Autenticação Necessaria_
**[Header Generation](#header-generation)**

- [List All](#list-1)
- [List One](#list-one-1)
- [Add](#add-1)
- [Update](#update-1)
- [Delete](#delete-1)

##### List

```
GET /categorys
```

###### Response

```json
[
  {
    "id": 10,
    "name": "drink"
  }
]
```

##### List One

```
GET /categorys/:id
```

###### Response

```json
{
  "id": 10,
  "name": "drink"
}
```

##### Add

```
PUT /categorys
```

###### Input

| Name   | Type     |
| ------ | -------- |
| `name` | `string` |

###### Response

```json
{
  "id": 10,
  "name": "Food"
}
```

##### Update

```
PUT /categorys/:id
```

###### Input

| Name   | Type     |
| ------ | -------- |
| `name` | `string` |

###### Response

```json
{
  "id": 10,
  "name": "drink"
}
```

##### Delete

```
DELETE /categorys/:id
```

###### Response

`204 No Response`

#### Orders

_Autenticação Necessaria_
**[Header Generation](#header-generation)**

- [List All](#list-2)
- [List One](#list-one-2)
- [Add](#add-2)
- [Update](#update-2)
- [Delete](#delete-2)

##### List

```
GET /order
```

###### Response

```json
[
  {
    "id": 1,
    "value": 24.1,
    "table": 5,
    "items": [
      {
        "id": 1,
        "quantity": 1,
        "description": "Com muito molho",
        "product": {
          "description": "É bom",
          "id": 3,
          "name": "Macarrão",
          "price": 14.5
        }
      },
      {
        "id": 2,
        "quantity": 2,
        "description": "Com Gás",
        "product": {
          "description": "Geladinha",
          "id": 4,
          "name": "Agua mineral",
          "price": 4.8
        }
      }
    ]
  }
]
```

##### List One

```
GET /order/:id
```

###### Response

```json
{
  "id": 1,
  "value": 24.1,
  "table": 5,
  "items": [
    {
      "id": 1,
      "quantity": 1,
      "description": "Com muito molho",
      "product": {
        "description": "É bom",
        "id": 3,
        "name": "Macarrão",
        "price": 14.5
      }
    },
    {
      "id": 2,
      "quantity": 2,
      "description": "Com Gás",
      "product": {
        "description": "Geladinha",
        "id": 4,
        "name": "Agua mineral",
        "price": 4.8
      }
    }
  ]
}
```

##### Add

```
PUT /order
```

###### Input

```json
{
  "items": [
    {
      "productId": 3,
      "quantity": 1,
      "description": "Com muito molho"
    },
    {
      "productId": 4,
      "quantity": 2,
      "description": "Com Gás"
    }
  ],
  "table": 5
}
```

###### Response

`204 No Response`

##### Update

```
PUT /order/:id
```

###### Input

```json
{
  "items": [
    {
      "productId": 3,
      "quantity": 1,
      "description": "Com muito molho"
    },
    {
      "productId": 4,
      "quantity": 2,
      "description": "Com Gás"
    }
  ],
  "table": 5
}
```

###### Response

`204 No Response`

##### Delete

```
DELETE /order/:id
```

###### Response

`204 No Response`

#### User

- [Register](#register)
- [Register Admin](#register-admin)
- [Login / Auth](#login-1)

##### Register

```
Post /register
```

###### Input

```json
{
  "name": "user-batata-${randomNumber}",
  "encryptedPrivateKey": "${encryptedPrivateKey}",
  "publicKey": "${publicKey}"
}
```

Header generation:

```js
const headers = {
  Authorization: `Basic ${btoa("user:senhaHasheada")}`,
};
```

###### Response

```json
{
  "userId": 0,
  "email": "teste@teste.com",
  "encryptedPrivateKey": "${encryptedPrivateKey}",
  "publicKey": "${publicKey}"
}
```

##### Register Admin

_Autenticação Necessaria_
**[Header Generation](#header-generation)**

```
Post /registerAdmin
```

###### Input

```json
{
  "name": "user-batata-${randomNumber}",
  "encryptedPrivateKey": "${encryptedPrivateKey}",
  "publicKey": "${publicKey}"
}
```

###### Response

```json
{
  "userId": 0,
  "email": "teste@teste.com",
  "encryptedPrivateKey": "${encryptedPrivateKey}",
  "publicKey": "${publicKey}"
}
```

##### Login

```
GET /login
```

Header generation:

```js
const headers = {
  Authorization: `Basic ${btoa("user:senhaHasheada")}`,
};
```

###### Response

```json
{
  "userId": 0,
  "email": "teste@teste.com",
  "encryptedPrivateKey": "${encryptedPrivateKey}",
  "publicKey": "${publicKey}"
}
```

## License

MIT © [Gu7z](https://github.com/Gu7z)
