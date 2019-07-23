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
        // avatarFileName: { type: String},
        postId: { type: String},
        title: { type: String, default: 'no title' },
        content: { type: String, default: 'no content' },
        commentNum: { type: Number, default: 0 },
        updated: { type: Date, default: Date.now },
        created: { type: Date, default: Date.now },
        extend: { 
            addChoice:{type: String},
            addLineup:{
                anonymous:{type: Boolean, default: false}, 
                halfanonymous:{type: Boolean, default: false}, 
                hasMessage:{type: Boolean, default: false}, 
            },
            lineupData: [{
                id: String, //ObjectId,
                name: String,
                anonymous: String,
                message: String
            }],
            addVote:{type: String}
        },

    },
    Comment: {//must capitalized
        author: { type: String, default: 'unknown' },
        authorId: { type: String, default: '-1' },
        // avatarFileName: { type: String},
        postId: { type: String, default: '-1' },
        content: { type: String, default: 'no content' },
        updated: { type: Date, default: Date.now },
        created: { type: Date, default: Date.now },
    }
}
