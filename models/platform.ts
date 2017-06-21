import mongoose = require('mongoose');

let platformSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true
  },
  games:[{ type:mongoose.Schema.Types.ObjectId, ref: 'Games'}]
});

export default mongoose.model('Platform', platformSchema);
