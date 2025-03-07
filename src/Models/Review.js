import mongoose from 'mongoose'
import { avatarOptions } from '@/config.json'

const schema = new mongoose.Schema({
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 500
  },
  avatarOption: {
    type: Number,
    required: true,
    min: 1,
    max: avatarOptions,
  },
  visible: {
    type: Boolean,
    required: true
  }
},
{
  timestamps: true,
  versionKey: false
})

export default mongoose.models.Review || mongoose.model('Review', schema)