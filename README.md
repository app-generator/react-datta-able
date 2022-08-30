# [Ngen React Frontend](https://github.com/CERTUNLP/ngen-frontend)
## ✨ Quick Start in `Docker`

> Get the code

```bash
$ git clone https://github.com/CERTUNLP/ngen-frontend.git
$ cd ngen-frontend
```

> Start the app in Docker

```bash
$ docker-compose up --build 
```

The React UI starts on port `3000` and expects an Ngen API server on port `8000` (saved in configuration).

<br />

## ✨ Configure the backend server

The product comes with a usable JWT Authentication flow that provides only the basic requests: login/logout/register. 

**API Server URL** - `src/config/constant.js` 

```javascript
const config = {
    ...
    API_SERVER: 'http://localhost:8000/api/'  // <-- The magic line
};
```

## ✨ Default credentials on Ngen Backend Api
```javascript
ngen:ngen
```