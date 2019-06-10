module.exports = {
    Config: {//must capitalized
        name: { type: String },
        content: { type: String },
    },
    User: {//must capitalized
        uuid: { type: String },
        name: { type: String },
        hashpwd: { type: String },
        salt: { type: String },
        email: { type: String },
        updated: { type: Date, default: Date.now },
        created: { type: Date, default: Date.now },
        avatar: { data: Buffer, contentType: String },
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
        title: { type: String, default: 'no title' },
        content: { type: String, default: 'no content' },
        commentNum: { type: Number, default: 0 },
        updated: { type: Date, default: Date.now },
        created: { type: Date, default: Date.now },
    },
    Comment: {//must capitalized
        author: { type: String, default: 'unknown' },
        authorId: { type: String, default: '-1' },
        postId: { type: String, default: '-1' },
        content: { type: String, default: 'no content' },
        updated: { type: Date, default: Date.now },
        created: { type: Date, default: Date.now },
    }
}
