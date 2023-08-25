import { Schema, model, models } from "mongoose";
const promptModel = new Schema({
   creator:{
    type:Schema.Types.ObjectId,
    ref:'User'
   },
   prompt:{
    type:String,
    required:[true, 'Prompt is required']
   },
   tag:{
    type:String,
    required:[true, 'Tag is required']
   },

});

const Prompt = models.Prompt || model('Prompt', promptModel);
export default Prompt;