import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema=new Schema({
    videoFile:{
        type:String, //Cloudinary url
        required:true,
    },
    thumbnail:{
        type:String, //Cloudinary url
        required:true,
    },
    title:{
        type:String, 
        required:true,
    },
    description:{
        type:String, 
        required:true,
    },
    duration:{
        type:Number, //Cloudinary url
        required:true,
    },
    views:{
        type:String, //Cloudinary url
        required:true,
        default:0
    },

    isPublished:{
        type:Boolean, //Cloudinary url
        default:true,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    
    }
},{timestamps:true})


videoSchema.plugin(mongooseAggregatePaginate)

export const Video=mongoose.model("Video",videoSchema)