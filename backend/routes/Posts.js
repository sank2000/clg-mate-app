var express = require('express');
var router = express.Router();

const Post = require('../models/Post');
const User = require('../models/User');

const today = new Date();
const oneDay = 86400000;
const yesterday = new Date(today - oneDay);

router.get('/', (req, res) => {
  var query = Post.find({ dueDate: { $gte: yesterday } }).limit(6).sort({
    'dueDate': 'asc'
  });
  query.exec(function (err, result) {
    if (!err) {
      res.send(result);
    }
    else {
      console.log(err);
    }
  })
}
);

router.post("/expired", function (req, res) {
    if (req.body.type === "All") {
      var query = Post.find({dueDate: { $lt: new Date().setHours(0,0,0,0) }}).sort({'dueDate': 'desc'});
    }
    else {
      var query = Post.find({ postType: req.body.type }).sort({'dueDate': 'desc'});
    }
  query.exec(function (err, result) {
    if (!err) {
      res.send(result);
    }
    else {
      console.log(err);
    }
  })
}
);

router.post("/full", function (req, res) {
  if (req.body.type === "All") {
    var query = Post.find({}).sort({'dueDate': 'desc'});
  }
  else {
    var query = Post.find({ postType: req.body.type }).sort({'dueDate': 'desc'});
  }
  query.exec(function (err, result) {
    if (!err) {
      res.send(result);
    }
    else {
      console.log(err);
    }
  })
}
);

router.post("/new", function (req, res) {
  User.findById(req.session.user, "username", function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      const newPost = new Post({
        title: req.body.title,
        author: result.username,
        description: req.body.description,
        subName: req.body.subName,
        postType: req.body.postType,
        dueDate: new Date(req.body.dueDate),
        file: req.body.file,
        url: req.body.url,
      });

      newPost.save(function (err) {
        if (err) {
          console.log(err);
        }
        else {
          res.redirect("./new/success");
        }
      });
    }
  });
})

module.exports = router;