# [React Datta Able](https://appseed.us/product/datta-able/api-server-nodejs/react/)

**Datta Able** is an open-source **React Dashboard** that provides a colorful and modern design. Datta Able React Free is the most stylised React Free Admin Template, around all other admin templates in the market. It comes with high feature-rich pages and components with fully developer-centric code. The product comes with a simple JWT authentication flow: login/register/logout.

<br />

> Features

- Modern aesthetics UI design - Designed by [CodedThemes](https://bit.ly/37fF9RT)
- React, Redux, Redux-persist
- Authentication: JWT Login/Register/Logout
- Full-stack ready using **[Node JS API Server](https://github.com/app-generator/api-server-nodejs)** (open-source project)
  - Features: Typescript / SQLite / TypeORM / Joy (validation) / Passport library - `passport-jwt` strategy.

<br />

> Links

- 👉 [React Node JS Datta Able](https://appseed.us/product/datta-able/api-server-nodejs/react/) - product page
- 👉 [React Node JS Datta Able](https://react-node-js-datta-able.appseed-srv1.com/) - LIVE Demo
- 👉 Free [Support](https://appseed.us/support) via **Github** (issues tracker), Email and [Discord](https://discord.gg/fZC6hup).

<br />

![React Datta Able - Full-stack product powered by a simple NodeJS API backend.](https://user-images.githubusercontent.com/51070104/175767137-e9b7cb1b-ae57-4ea3-9e31-4b976ab4465f.png)

<br >

## ✨ Quick Start in `Docker`

> Get the code

```bash
$ git clone https://github.com/app-generator/react-datta-able.git
$ cd react-datta-able
```

> Start the app in Docker

```bash
$ docker-compose up --build 
```

The React UI starts on port `3000` and expects an API server on port `5000` (saved in configuration).

<br /> 

> **Note**: This product can be used with other API Servers for a complete fullstack experience. **ALL API servers use an unified interface**

- [Django API Server](https://github.com/app-generator/api-server-django) - open-source product
- [Flask API Server](https://github.com/app-generator/api-server-flask) - open-source product
- [Node JS API Server](https://github.com/app-generator/api-server-nodejs) - open-source product / Typescript / SQLite / TypeORM / Joy for validation
- [Node JS API Server PRO](https://github.com/app-generator/api-server-nodejs-pro) - **commercial product**
    - Typescript / SQLite / TypeORM / Joy Validation / Docker
    - Typescript / MongoDB / Mongoose / Joy Validation / Docker (separate branch, same project)

<br />

## ✨ How to use it

To use the product Node JS (>= 12.x) is required and GIT to clone/download the project from the public repository.

**Step #1** - Clone the project

```bash
$ git clone https://github.com/app-generator/react-datta-able.git
$ cd react-datta-able
```

<br >

**Step #2** - Install dependencies via NPM or yarn

```bash
$ npm i
// OR
$ yarn
```

<br />

**Step #3** - Start in development mode

```bash
$ npm run start 
// OR
$ yarn start
```

<br />

## ✨ Configure the backend server

The product comes with a usable JWT Authentication flow that provides only the basic requests: login/logout/register. 

**API Server URL** - `src/config/constant.js` 

```javascript
const config = {
    ...
    API_SERVER: 'http://localhost:5000/api/'  // <-- The magic line
};
```

<br />

**API Server Descriptor** - POSTMAN Collection

The API Server signature is provided by the [Unified API Definition](https://docs.appseed.us/boilerplate-code/api-unified-definition)

- [API POSTMAN Collection](https://github.com/app-generator/api-server-unified/blob/main/api.postman_collection.json) - can be used to mock (simulate) the backend server or code a new one in your preferred framework. 

<br />

## ✨ Node JS API Server

The product is also open-source and is already configured to work with Berry Dashboard Template - product features:

- Typescript / Node js / Express server
- JWT authentication (`passport-jwt` strategy)
- Persistence: SQLite 

> Links

- [Node JS API](https://github.com/app-generator/api-server-nodejs) - source code
- [Node JS API](https://appseed.us/boilerplate-code/nodejs-starter) - product page

<br />

![Node JS API - Open-source API server built on top of Express Nodejs Framework.](https://user-images.githubusercontent.com/51070104/124934824-c210a700-e00d-11eb-9d01-e05bd8bfb608.png)

<br />

### Compile the API Server

**Step #1** - Clone the project

```bash
$ git clone https://github.com/app-generator/api-server-nodejs.git
$ cd api-server-nodejs
```

**Step #2** - Install dependencies via NPM or Yarn

```bash
$ npm i
// OR
$ yarn
```

**Step #3** - Run the SQLite migration via TypeORM

```
$ yarn typeorm migration:run
```

**Step #4** - Start the API server (development mode)

```bash
$ npm dev
// OR
$ yarn dev
```

The API server will start using the `PORT` specified in `.env` file (default 5000).

<br />

---
[React Node JS Datta Able](https://appseed.us/product/react-node-js-datta-able) - Provided by [CodedThemes](https://codedthemes.com/) and **AppSeed [App Generator](https://appseed.us/app-generator)**.
