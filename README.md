# **Api Webschool**

Essa api tem como função trazer todas as funcionalidades de uma escola com gerenciamento online

#

## **Escola**

#### **POST: /schools**

<br>

<hr>

O Corpo da requisição deve ser enviado da seguinte forma:

```json
{
  "name": "Centro Educacional Salesiano",
  "email": "salesiano@email.com",
  "password": "123456",
  "director": "Gabriel Salesiano",
  "address": {
    "state": "BA",
    "city": "Serrinha",
    "district": "Primeira Travessa Antonio Pinheiro da Mota",
    "number": "166",
    "zipCode": "48700000"
  }
}
```

<br>
Como retorno obteremos a seguinte json:

<br>

```json
{
  "name": "Centro Educacional Salesiano",
  "email": "salesiano@email.com",
  "password": "123456",
  "director": "Gabriel Salesiano",
  "address": {
    "state": "BA",
    "city": "Serrinha",
    "district": "Primeira Travessa Antonio Pinheiro da Mota",
    "number": "166",
    "zipCode": "48700000"
  }
}
```

<hr>

#### **GET: /schools**

<hr>

Deve retornar um array com todas as escolas:

```json
[
  {
    "name": "Centro Educacional Salesiano",
    "email": "salesiano@email.com",
    "password": "123456",
    "director": "Gabriel Salesiano",
    "address": {
      "state": "BA",
      "city": "Serrinha",
      "district": "Primeira Travessa Antonio Pinheiro da Mota",
      "number": "166",
      "zipCode": "48700000"
    }
  }
]
```

<hr>

#### **GET: /schools/:id**

<hr>
Deve retornar um objeto com a escola expecífica:

```json
{
  "name": "Centro Educacional Salesiano",
  "email": "salesiano@email.com",
  "password": "123456",
  "director": "Gabriel Salesiano",
  "address": {
    "state": "BA",
    "city": "Serrinha",
    "district": "Primeira Travessa Antonio Pinheiro da Mota",
    "number": "166",
    "zipCode": "48700000"
  }
}
```

<hr>

#### **PATCH: /schools/:id**

<hr>
Deve enviar um objeto com a escola expecífica:

```json
{
  "name": "Centro Educacional Salesiano",
  "email": "salesiano@email.com",
  "password": "123456",
  "director": "Gabriel Salesiano",
  "address": {
    "state": "BA",
    "city": "Serrinha",
    "district": "Primeira Travessa Antonio Pinheiro da Mota",
    "number": "166",
    "zipCode": "48700000"
  }
}
```

<br>
Como retorno obteremos a seguinte json:

<br>

```json
{
  "name": "Centro Educacional Salesiano",
  "email": "salesiano@email.com",
  "password": "123456",
  "director": "Gabriel Salesiano",
  "address": {
    "state": "BA",
    "city": "Serrinha",
    "district": "Primeira Travessa Antonio Pinheiro da Mota",
    "number": "166",
    "zipCode": "48700000"
  }
}
```

<hr>

#### **DELETE: /schools/:id**

<hr>
Deve enviar um id, não deve retonar nada

<br>
<hr>
<hr>
<hr>
<br>

## **Professor**

#### **POST: /teachers**

<br>

<hr>

O Corpo da requisição deve ser enviado da seguinte forma:

```json
{
  "name": "Fábio Junior",
  "email": "fabio@mail.com.br",
  "password": "123456",
  "shift": "Matutino",
  "matter": "Back-End"
}
```

<br>
Como retorno obteremos a seguinte json:

<br>

```json
{
  "name": "Fábio Junior",
  "email": "fabio@mail.com.br",
  "password": "123456",
  "shift": "Matutino",
  "matter": "Back-End"
}
```

<hr>

#### **GET: /teachers**

<hr>

Deve retornar um array com todas as escolas:

```json
[
  {
    "name": "Fábio Junior",
    "email": "fabio@mail.com.br",
    "password": "123456",
    "shift": "Matutino",
    "matter": "Back-End"
  }
]
```

<hr>

#### **GET: /teachers/:id**

<hr>
Deve retornar um objeto com a escola expecífica:

```json
{
  "name": "Fábio Junior",
  "email": "fabio@mail.com.br",
  "password": "123456",
  "shift": "Matutino",
  "matter": "Back-End"
}
```

<hr>

#### **PATCH: /teachers/:id**

<hr>
Deve enviar um objeto com a escola expecífica:

```json
{
  "name": "Fábio Junior",
  "email": "fabio@mail.com.br",
  "password": "123456",
  "shift": "Matutino",
  "matter": "Back-End"
}
```

<br>
Como retorno obteremos a seguinte json:

<br>

```json
{
  "name": "Fábio Junior",
  "email": "fabio@mail.com.br",
  "password": "123456",
  "shift": "Matutino",
  "matter": "Back-End"
}
```

<hr>

#### **DELETE: /teachers/:id**

<hr>
Deve enviar um id, não deve retonar nada

<br>
<hr>
<hr>
<hr>
<br>

## **Salas**

#### **POST: /teams**

<br>

<hr>

O Corpo da requisição deve ser enviado da seguinte forma:

```json
{
  "name": "307"
}
```

<br>
Como retorno obteremos a seguinte json:

<br>

```json
{
  "name": "307"
}
```

<hr>

#### **GET: /teams**

<hr>

Deve retornar um array com todas as escolas:

```json
[
  {
    "name": "307"
  }
]
```

<hr>

#### **GET: /teams/:id**

<hr>
Deve retornar um objeto com a escola expecífica:

```json
{
  "name": "307"
}
```

<hr>

#### **PATCH: /teams/:id**

< hr/ >

Deve enviar um objeto com a escola expecífica:

```json
{
  "name": "307"
}
```

<br>
Como retorno obteremos a seguinte json:

<br>

```json
{
  "name": "307"
}
```

<hr>

#### **DELETE: /teams/:id**

<hr>
Deve enviar um id, não deve retonar nada

<br>
<hr>
<hr>
<hr>
<br>

## **Estudantes**

#### **POST: /estudents**

<br>

<hr>

O Corpo da requisição deve ser enviado da seguinte forma:

```json
{
  "name": "307"
}
```

<br>
Como retorno obteremos a seguinte json:

<br>

```json
{
  "name": "307"
}
```

<hr>

#### **GET: /teams**

<hr>

Deve retornar um array com todas as escolas:

```json
[
  {
    "name": "307"
  }
]
```

<hr>

#### **GET: /teams/:id**

<hr>
Deve retornar um objeto com a escola expecífica:

```json
{
  "name": "307"
}
```

<hr>

#### **PATCH: /teams/:id**

<hr>
Deve enviar um objeto com a escola expecífica:

```json
{
  "name": "307"
}
```

<br>
Como retorno obteremos a seguinte json:

<br>

```json
{
  "name": "307"
}
```

<hr>

#### **DELETE: /teams/:id**

<hr>
Deve enviar um id, não deve retonar nada

<br>
<hr>
<hr>
<hr>
<br>

## **Feedback**

#### **POST: /feedback**

<br>

<hr>

O Corpo da requisição deve ser enviado da seguinte forma:

```json
{
  "name": "fabio",
  "feedback": "você não fez a atividade",
  "email": "joana@mail.com"
}
```

<br>
Como retorno obteremos a seguinte json:

<br>

```json
{
  "name": "fabio",
  "feedback": "você não fez a atividade",
  "email": "joana@mail.com"
}
```

<hr>

#### **GET: /feedback**

<hr>

Deve retornar um array com todas as escolas:

```json
[
  {
    "name": "fabio",
    "feedback": "você não fez a atividade",
    "email": "joana@mail.com"
  }
]
```

<hr>

#### **GET: /feedback/:id**

<hr>
Deve retornar um objeto com a escola expecífica:

```json
{
  "name": "fabio",
  "feedback": "você não fez a atividade",
  "email": "joana@mail.com"
}
```

<hr>

#### **PATCH: /feedback/:id**

<hr>
Deve enviar um objeto com a escola expecífica:

```json
{
  "name": "fabio",
  "feedback": "você não fez a atividade",
  "email": "joana@mail.com"
}
```

<br>
Como retorno obteremos a seguinte json:

<br>

```json
{
  "name": "fabio",
  "feedback": "você não fez a atividade",
  "email": "joana@mail.com"
}
```

<hr>

#### **DELETE: /feedback/:id**

<hr>
Deve enviar um id, não deve retonar nada

<br>
<hr>
<hr>
<hr>
<br>

## **Login**

#### **POST: /login**

<br>

<hr>

O Corpo da requisição deve ser enviado da seguinte forma:

```json
{
  "email": "salesiano@email.com",
  "password": "123456"
}
```

<br>
Como retorno obteremos a seguinte json:

<br>

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoic2Nob29sIiwiaWF0IjoxNjYyODY3MjE0LCJleHAiOjE2NjI5NTM2MTQsInN1YiI6ImViMzllMGY3LTJlODItNGE3Mi05ZDc4LWQxZDE3ZmNiMzVlMyJ9.1_-fmXrXfq3P1NcGtpmswbO20LhmwM2r1Z7YxSuKROo"
}
```

<hr>
