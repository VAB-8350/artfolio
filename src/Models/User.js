import mongoose from 'mongoose'
import { ROLES } from '@/utils/roles'

const schema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, 'Invalid Email']
  },
  role: {
    type: String,
    enum: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    required: true
  }
},
{
  timestamps: true,
  versionKey: false
})

export default mongoose.models.User || mongoose.model('User', schema)