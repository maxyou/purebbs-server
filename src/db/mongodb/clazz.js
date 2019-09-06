module.exports = {
    Config: {//must capitalized
        name: { type: String },
        content: { type: String },
    },
    User: {//must capitalized
        //个人基本信息
        uuid: { type: String },
        name: { type: String },
        hashpwd: { type: String },
        resetPasswordCode: { type: String },
        resetPasswordTime: { type: Date },
        salt: { type: String },
        email: { type: String },
        updated: { type: Date, default: Date.now },
        created: { type: Date, default: Date.now },
        avatarFileName: { type: String },
        role: { type: String, default: 'user' },

        //第三方登录信息
        source: { type: String, default: 'register' },//缺省是'register'，还可能是'oauth'
        oauth: { //oauth第三方，比如GitHub
            oauthName: { type: String },
            type: { type: String },
            login: { type: String },
            id: { type: Number },
            name: { type: String },
            email: { type: String },
            avatarUrl: { type: String },
            homepageUrl: { type: String },
        },

        //个人设置
        setting: {
            language: { type: String },
            postPageSize: { type: Number },
            commentPageSize: { type: Number },
        }
    },
    Admin: {//must capitalized
        name: { type: String },
        hashpwd: { type: String },
        salt: { type: String },
        email: { type: String },
    },
    Post: {//must capitalized
        //作者相关信息
        author: { type: String, default: 'unknown' },
        authorId: { type: String, default: '-1' },
        postId: { type: String },
        avatarFileName: { type: String },
        anonymous: { type: Boolean, default: false },
        source: { type: String, default: 'register' },//缺省是'register'，还可能是'oauth'
        oauth: { //oauth第三方，比如GitHub
            avatarUrl: { type: String },
        },
        
        //post信息
        title: { type: String, default: 'no title' },
        content: { type: String, default: 'no content' },
        category: { type: String },
        updated: { type: Date },
        created: { type: Date },

        //评论、点赞、置顶等等
        commentNum: { type: Number, default: 0 },
        likeUser: [{
            _id: String,
            name: String,
        }],
        lastReplyId: { type: String },
        lastReplyName: { type: String },
        lastReplyTime: { type: Date },
        updatedById: { type: String },//可能被作者以外的比如bm修改，所以需要记录
        updatedByName: { type: String },
        /**
         * 包含created+lastReplyTime，可考虑包含update
         * 但不包含comment的update，这个更新不应该影响帖子排序
         */
        allUpdated: { type: Date },
        stickTop: { type: Boolean, default: false },

        //扩展
        extend: {
            addChoice: { type: String },
            addLineup: {
                anonymous: { type: Boolean, default: false },
                // halfanonymous:{type: Boolean, default: false}, 
                // hasMessage:{type: Boolean, default: false}, 
                expireTime: { type: Date },
            },
            lineupData: [{
                _id: String, //ObjectId,
                name: String,
                anonymous: Boolean,
                message: String,
                avatarFileName: String,
                source: String,
                oauth: { //oauth第三方，比如GitHub
                    login: { type: String },
                    name: { type: String },
                    avatarUrl: { type: String },
                },
            }],
            addVote: {
                anonymous: { type: Boolean, default: false },
                ifMulti: { type: String, default: 'single' },
                options: { type: [String], default: [''] },
                expireTime: { type: Date },
                // expireTimeUTC: { type: Date },                
            },
            voteData: [[{
                _id: String, //ObjectId,
                name: String,
                anonymous: Boolean,
                avatarFileName: String,
                source: String,
                oauth: { //oauth第三方，比如GitHub
                    login: { type: String },
                    name: { type: String },
                    avatarUrl: { type: String },
                },
            }]]
        },

    },
    Comment: {//must capitalized
        //评论者信息
        author: { type: String, default: 'unknown' },
        authorId: { type: String, default: '-1' },
        avatarFileName: { type: String },
        source: String,
        oauth: { //oauth第三方，比如GitHub
            login: { type: String },
            name: { type: String },
            avatarUrl: { type: String },
        },
        anonymous: { type: Boolean, default: false },

        //评论内容
        postId: { type: String, default: '-1' },
        content: { type: String, default: 'no content' },
        updated: { type: Date },
        created: { type: Date },        
        
        //互动
        likeUser: [{
            _id: String,
            name: String,
        }],        
        updatedById: { type: String },//可能被作者以外的比如bm修改，所以需要记录
        updatedByName: { type: String },
    }
}
