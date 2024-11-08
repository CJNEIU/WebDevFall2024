import mongoose from "mongoose";

const postSchema =  mongoose.Schema({
    title: {type : String, require:true},
    content: {type : String, require:true}
});

export default mongoose.model('Post', postSchema)