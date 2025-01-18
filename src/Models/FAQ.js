import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  askEnglish: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  askSpanish: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  answerEnglish: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  answerSpanish: {
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

export default mongoose.models.FAQ || mongoose.model('FAQ', schema)