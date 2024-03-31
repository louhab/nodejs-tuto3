  const express = require('express');
  const bodyParser = require('body-parser');
  const app = express();
  const port = 3000;
  // Middleware de journalisation des requêtes
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()}: ${req.method} ${req.url}`);
    next();
  });
  // Middleware pour parser le corps des requêtes JSON
  app.use(bodyParser.json());
  // Simulons une base de données d'utilisateurs
  let users = [
    { id: 1, nom: 'John Doe', email: 'john@example.com' },
    { id: 2, nom: 'Jane Doe', email: 'jane@example.com' }
  ];
  // Route GET pour récupérer tous les utilisateurs
  app.get('/utilisateurs', (req, res) => {
    res.json(users);
  });
  // Route GET pour récupérer un utilisateur par son ID
  app.get('/utilisateur/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('Utilisateur non trouvé');
    }
  });
  // Route POST pour créer un nouvel utilisateur
  app.post('/utilisateur', (req, res) => {
    console.log(req);
    const newUser = req.body;
    console.log(newUser);
    users.push(newUser);
    res.status(201).json(newUser);
  });
  // Route PUT pour mettre à jour un utilisateur existant
  app.put('/utilisateur/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;
    users = users.map(user => {
      if (user.id === userId) {
        return { ...user, ...updatedUser };
      }
      return user;
    });
    res.json(updatedUser);
  });
  // Route DELETE pour supprimer un utilisateur par son ID
  app.delete('/utilisateur/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(user => user.id !== userId);
    res.send('Utilisateur supprimé avec succès');
  });
  // Middleware pour gérer les erreurs
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Quelque chose s\'est mal passé !');
  });
  // Gestion d'une route inexistante
  app.use((req, res, next) => {
    res.status(404).send('Désolé, la page demandée est introuvable.');
  });
  // Démarrage du serveur
  app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
  });
