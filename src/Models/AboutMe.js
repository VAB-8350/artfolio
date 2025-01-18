import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  aboutEnglish: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  aboutSpanish: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
},
{
  timestamps: true,
  versionKey: false
})

export default mongoose.models.About || mongoose.model('About', schema)