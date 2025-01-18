import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  maxReviews: {
    type: Number,
    required: true,
    min: 10,
    max: 10000
  }
},
{
  timestamps: true,
  versionKey: false
})

export default mongoose.models.MaxReview || mongoose.model('MaxReview', schema)