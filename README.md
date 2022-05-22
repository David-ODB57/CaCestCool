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
### Installation des packages
```
npm install
```

### Lancement du backend
```
npm run backend
```
### Lancement du frontend
```
npm run serve
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
