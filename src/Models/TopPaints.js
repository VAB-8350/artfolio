import mongoose from 'mongoose'
import Paint from './Paint'

const schema = new mongoose.Schema({
  topPaints: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Paint,
      required: true
    }
  ]
},
{
  timestamps: true,
  versionKey: false
})

export default mongoose.models.TopPaints || mongoose.model('TopPaints', schema)