const express = require("express");
const { connect } = require("./bd/connect");
const routesUtilisateur = require("./route/utilisateur");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", routesUtilisateur);

connect("mongodb://localhost:27017/", (err) => {
  if (err) {
    console.log("Erreur lors de la connexion à la base de données");
    process.exit(-1);
  } else {
    console.log("Connexion avec la base de données établie");
    app.listen(3000);
    console.log("Attente des requêtes au port 3OOO");
  }
});
