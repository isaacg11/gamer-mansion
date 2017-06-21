import * as mongoose from 'mongoose';

let gameSchema = new mongoose.Schema({
  title: {
    type:String,
    required: true
  },
  genre: {
    type:String,
    required: true
  },
  platform: {
    type:String,
    required: true
  },
  review: {
    type:String,
    required: true
  }
})

export default mongoose.model('Game', gameSchema);
