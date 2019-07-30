module.exports = {
    Config: {//must capitalized
        name: { type: String },
        content: { type: String },
    },
    User: {//must capitalized
        uuid: { type: String },
        name: { type: String },
        hashpwd: { type: String },
        resetPasswordCode: { type: String },
        resetPasswordTime: { type: Date },
        salt: { type: String },
        email: { type: String },
        updated: { type: Date, default: Date.now },
        created: { type: Date, default: Date.now },
        // avatar: { data: Buffer, contentType: String },
        avatarFileName: { type: String },
        role: { type: String, default: 'user' },
    },
    Admin: {//must capitalized
        name: { type: String },
        hashpwd: { type: String },
        salt: { type: String },
        email: { type: String },
    },
    Post: {//must capitalized
        author: { type: String, default: 'unknown' },
        authorId: { type: String, default: '-1' },
        postId: { type: String},
        anonymous: {type: Boolean, default: false},
        
        title: { type: String, default: 'no title' },
        content: { type: String, default: 'no content' },
        category: { type: String },

        commentNum: { type: Number, default: 0 },
        likeUser: [{
            _id: String,
            name: String,
        }],

        lastReplyId: { type: String},
        lastReplyName: { type: String},        
        lastReplyTime: { type: Date },
        updatedById: { type: String},//可能被作者以外的比如bm修改，所以需要记录
        updatedByName: { type: String},
        updated: { type: Date },
        created: { type: Date },        
        /**
         * 包含created+updated+lastReplyTime
         * 但是comment的update不包含，这个更新通常不影响帖子排序
         */
        allUpdated:{ type: Date },

        stickTop:{type: Boolean, default: false}, 

        extend: { 
            addChoice:{type: String},
            addLineup:{
                anonymous:{type: Boolean, default: false}, 
                // halfanonymous:{type: Boolean, default: false}, 
                // hasMessage:{type: Boolean, default: false}, 
                expireTime: { type: Date },
            },
            lineupData: [{
                _id: String, //ObjectId,
                name: String,
                anonymous: Boolean,
                message: String
            }],
            addVote:{
                anonymous:{type: Boolean, default: false}, 
                ifMulti:{type: String, default: 'single'}, 
                options:{type:[String], default:['']},
                expireTime: { type: Date },
                // expireTimeUTC: { type: Date },                
            },
            voteData:[[{
                _id: String, //ObjectId,
                name: String,
                anonymous: Boolean,
            }]]
        },

    },
    Comment: {//must capitalized
        author: { type: String, default: 'unknown' },
        authorId: { type: String, default: '-1' },
        // avatarFileName: { type: String},
        postId: { type: String, default: '-1' },
        content: { type: String, default: 'no content' },
        updatedById: { type: String},//可能被作者以外的比如bm修改，所以需要记录
        updatedByName: { type: String},
        updated: { type: Date },
        created: { type: Date },
        
        anonymous: {type: Boolean, default: false},

        likeUser: [{
            _id: String,
            name: String,
        }],

    }
}
