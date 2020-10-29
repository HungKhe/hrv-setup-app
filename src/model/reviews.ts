import mongoose from './index';
import mongoosePaginate from 'mongoose-paginate-v2';
const schema = {
    shopId: {
        type: Number,
        default: 0
    },
    shopName: {
        type: String,
        required: true
    },
    shopDomain: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    productList: [
        {
            id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            review: [
                {
                    email: {
                        type: String,
                        required: true
                    },
                    name: {
                        type: String,
                        required: true
                    },
                    title: {
                        type: String,
                        required: true
                    },
                    content: {
                        type: String,
                        required: true
                    },
                    time: {
                        type: Date
                    },
                    star: {
                        type: Number,
                        required: true
                    },
                }
            ]
        }
    ]
};
const collectionName = "reviews";
const postSchema = new mongoose.Schema(schema);
postSchema.plugin(mongoosePaginate);
const PostsModel = mongoose.model(collectionName, postSchema);
export default PostsModel;