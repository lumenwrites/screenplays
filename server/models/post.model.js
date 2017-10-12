import mongoose from 'mongoose'
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: { type: 'String', required: true },    
    slug: { type: 'String', required: true },
    body: { type: 'String' },
    author: { type: 'String' },
    series: { type: 'String' },
    image: { type: 'String' },
    imdb: { type: 'String' },
    pdf: { type: 'String' }
})
/* 
   tags: [String],
   published: { type: 'Boolean', default: true },   
   dateAdded: { type: 'Date', default: Date.now, required: true },
 */
export default mongoose.model('Post', postSchema)

