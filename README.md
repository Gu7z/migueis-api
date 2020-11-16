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

## License

MIT © [Gu7z](https://github.com/Gu7z)
