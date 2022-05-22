# cacestcool

## Project setup
### Set up MongoDB
Lancer la commande suivante dans mongosh
```
db.createUser({ user: "admin", pwd: "CaCestCool57", roles: [{ role: "dbOwner", db: "cacestcool" }] })
```
Ensuite créer une BDD Mongo avec Mongo Compass dans l'onglet 'Databases':
```
Nom de la DB : cacestcool
collection: users
```
## Installation des packages
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
