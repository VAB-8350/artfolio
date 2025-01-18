import mongoose from 'mongoose'
import Paint from './Paint'

const schema = new mongoose.Schema({
  topWorks: [
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

export default mongoose.models.TopWorks || mongoose.model('TopWorks', schema)