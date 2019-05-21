const signInPost = require('./sign-in-post')
const signUpPost = require('./sign-up-post')
const signOutPost = require('./sign-out-post')
const uploadAvatarPost = require('./upload-avatar-post-multer')
// const uploadAvatarPost = require('./upload-avatar-post-formidable')
// const uploadAvatarPost = require('./upload-avatar-post-koabody')

module.exports = {signInPost, signUpPost, signOutPost, uploadAvatarPost}