module.exports = {
    User: {//must capitalized
        uuid: { type: String },
        name: { type: String },
        hashpwd: { type: String },
        salt: { type: String },
        email: { type: String },
    },
    Admin: {//must capitalized
        name: { type: String },
        hashpwd: { type: String },
        salt: { type: String },
        email: { type: String },
    },
    Post: {//must capitalized
        author: { type: String },
        authorId: { type: String },
        title: { type: String },
        content: { type: String },
    }
}
