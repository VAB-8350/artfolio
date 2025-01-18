import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  englishName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50,
    unique: true
  },
  spanishName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50,
    unique: true
  },
  visible: {
    type: Boolean,
    required: true,
    default: false
  }
},
{
  timestamps: true,
  versionKey: false
})

export default mongoose.models.Category || mongoose.model('Category', schema)