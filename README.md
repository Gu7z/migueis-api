<h3 align="center">
  Migueis API 🚀
</h3>

## Overview

A Migueis-API é uma API desenvolvida na matéria de Projeto Integrador 6 com a finalidade de complementar o sistema desenvolvido para o restaurante da rede Migueis.

## Endpoints

- **[Products](#products)**
- **[Categorys](#categorys)**

#### Products

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
  ]
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
  ]
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

## License

MIT © [Gu7z](https://github.com/Gu7z)
