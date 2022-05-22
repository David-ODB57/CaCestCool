//PAS UTILSE --- A FAIRE//
const Post = require("../models/post");
const postServices = require("../services/postsService");

//contrôleur de la route GET /posts
exports.list = async (req, res) => {
  try {
    //Stock la réponse de la query faite sur la DB par le service propre aux Posts
    const posts = await postServices.list();
    if (posts) res.status(200).json(posts);
  } catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
};

//contrôleur de la route POST /todos/
exports.newPost = (req, res) => {
  // console.log(req.body)
  // on fait des vérifications sur les données passées dans le body
  if (!req.body.title || !req.body.author || !req.body.body) {
    // si il y a une erreur on interrompt l'opération...
    res.status(400).json({
      error: "Les paramètres contenu, auteur et titre sont obligatoires.",
    });
  }
  //si tout va bien
  //on crée un nouveau document Mongo avec le model Post
  const post = new Post({
    ...req.body, //ici on passe les données envoyées dans le body de la requête
  });

  //sauvegarde en BDD, retourne la donnée sauvegardée
  post
    .save()
    .then(() => {
      // retourne la réponse au format JSON
      //le status code 201 indique que la ressource a bien été créée
      res.status(201).json({
        message: `Nouveau post "${req.body.title}" créé !`,
      });
      // en cas d'erreur à l'enregistrement en BDD...
    })
    .catch((error) => res.status(400).json({ error }));
};

//contrôleur de la route PUT /Post/:id
exports.patchItem = (req, res) => {
  //mise à jour de l'élément en BDD
  Todo.updateOne({ _id: req.params.id }, { ...req.body })
    .then(() => {
      // retourne la réponse au format JSON
      //le status code 201 indique que la ressource a bien été créée
      res.status(201).json({
        message: "Tache mise à jour !",
      });
      // en cas d'erreur à l'enregistrement en BDD...
    })
    .catch((error) => res.status(400).json({ error }));
};

//contrôleur de la route DELETE /Post/:id
exports.deleteItem = (req, res) => {
  // on interroge la base de donnée
  Post.deleteOne({
    _id: req.params.id,
  })
    .then((post) => {
      // si la tache est trouvée, on la supprime, puis renvoie un message de confirmation
      res.status(201).json({
        message: "Post supprimé",
      });
      // en cas d'erreur on capture le message d'erreur pour l'aficher dans la réponse en JSON
    })
    .catch((error) => res.status(400).json({ error }));
};
