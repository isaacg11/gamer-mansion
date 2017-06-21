import * as express from 'express';
import * as mongodb from 'mongodb';
import Platform from '../models/platform';
import Game from '../models/game';
let router = express.Router();


//Create or Update
router.post('/', (req, res) => {
  let game: any = new Game();
  game.title = req.body.title;
  game.genre = req.body.genre;
  game.platform = req.body.platform;
  game.review = req.body.review;
  game.save((err, newGame) => {
    Platform.findOne({name: req.body.platform}).exec((err, result:any) => {
      if (err) {
        res.send(err)
      } else if(result === null) {
        let platform = new Platform();
        platform.name = req.body.platform;
        platform.save((err, newPlatform) => {
          Platform.findByIdAndUpdate(newPlatform._id, { "$push": {"games": newGame._id}}, {"new": true, "upsert": true},
            function (err, updatedPlatform) {
              if(err) {
                res.send(err)
              } else {
                res.end();
              }
            }
         );
        })
      } else {
        Platform.findByIdAndUpdate(result._id, { "$push": {"games": newGame._id}}, {"new": true, "upsert": true},
          function (err, updatedPlatform) {
            if(err) {
              res.send(err)
            } else {
              res.end();
            }
          }
       );
      }
    });
  });
})


// Game.findByIdAndUpdate(req.body._id, { "$set": { "title": req.body.title, "genre": req.body.genre}}, {"new": true, "upsert": true},
// function(err, updatedPlatform) {
//   if(err) {
//     res.send(err)
//   } else {
//     res.send(updatedPlatform);
//   }
// }
// );


//Read
/*router.get('/:tag', (req, res) => {
  Platform.findOne({name: req.params['tag']}).populate('games').exec(function (err, results:any) {
    if (err) {
      res.send(err)
    } else {
      res.json(results.games)
    }
  });
})*/

//delete
/*router.delete('/:tag', (req, res) => {
  Game.remove({_id: req.params['tag']}, {err} => {
    if(err) {
      res.send(err)
    } else {
      res.send('Success');
    }
  })
})*/

/*router.post('/', (req, res) => {
  let game = req.body;
  game._id = new mongodb.ObjectID(game._id);
  database.db.collection('games').save(game).then(() =>{
    res.end();
  })
  /*if(req.body._id) {
    Game.findByIdAndUpdate(req.body._id, { "$set": { "title": req.body.title, "genre": req.body.genre}}, {"new": true, "upsert": true},
    function(err, updatedPlatform) {
      if(err) {
        res.send(err)
      } else {
        res.send(updatedPlatform);
      }
    }
  );
} else {
  let game: any = new Game();
  game.title = req.body.title;
  game.genre = req.body.genre;
  game.save((err, newGame) => {
    Platform.findOne({name: req.body.platform}).exec((err, result:any) => {
      if (err) {
        res.send(err)
      } else {
        Platform.findByIdAndUpdate(result._id, { "$push": {"games": newGame._id}}, {"new": true, "upsert": true},
          function (err, updatedPlatform) {
            if(err) {
              res.send(err)
            } else {
              res.send(updatedPlatform);
            }
          }
       );
      }
    });
  })
}
});*/

// router.get('/', (req, res) => {
//   database.db.collection('games').find().toArray().then((games) => {
//     res.json(games);
//   })
// });
//
//
//
// router.delete('/:id', (req, res) => {
//   let gameId = new mongodb.ObjectID(req.params['id']);
//   database.db.collection('games').remove({_id:gameId}).then(() => {
//     res.end();
//   })
// });




export default router
