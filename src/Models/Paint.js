import mongoose from 'mongoose'
import Category from './Category'

const schema = new mongoose.Schema({
  visible: {
    type: Boolean,
    required: true,
    default: false
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Category,
      required: true
    }
  ],
  year: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 4
  },
  titleSpanish: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50
  },
  titleEnglish: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50
  },
  descriptionSpanish: {
    type: String,
    required: true,
  },
  descriptionEnglish: {
    type: String,
    required: true,
  },
  images: [
    {
      publicId: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true,
        match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 'Invalid URL']
      }
    }
  ]
},
{
  timestamps: true,
  versionKey: false
})

export default mongoose.models.Paint || mongoose.model('Paint', schema)