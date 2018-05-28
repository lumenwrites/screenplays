import mongoose from 'mongoose'
const Schema = mongoose.Schema

const postSchema = new Schema({
    /* Title */
    title: { type: 'String', required: true, index: true },    
    slug: { type: 'String', unique: true, required: true, lowercase: true, index: true },
    /* Author */
    author: { type: 'String', index: true },
    authorSlug: { type: 'String', index: true },
    /* Series */
    series: { type: 'String', index: true },
    seriesSlug: { type: 'String', index: true },
    /* Content */
    titlePage: { type: 'String' }, // first page of the screenplay
    body: { type: 'String' },
    /* Meta */
    image: { type: 'String' },
    imdb: { type: 'String' },
    pdf: { type: 'String' }
})
/* 
   tags: [String],
   published: { type: 'Boolean', default: true },   
   dateAdded: { type: 'Date', default: Date.now, required: true },
 */

postSchema.index({ title: 'text', author: 'text', series: 'text' });

export default mongoose.model('Post', postSchema)

