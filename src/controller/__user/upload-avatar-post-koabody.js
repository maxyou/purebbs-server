const fs = require('fs')
const os = require('os')
const path = require('path')

module.exports = async (ctx, next) => {

    /**
     * 这是官方github中example的案例，但并不完美
     * 过程似乎是
     *      调用formidable解析后存入系统tmp目录，这个可能不能改
     *      本页代码则将系统tmp目录中已经解析好的文件拷贝到需要的目录而已
     */

    console.log('koabody')
    try {
        const file = ctx.request.files.file
        console.log(JSON.stringify(ctx.request.files))
        console.log('koabody 1')
        const reader = fs.createReadStream(file.path)
        console.log('koabody 2')
        const d = os.tmpdir()
        const r = Math.random().toString()
        const stream = fs.createWriteStream(path.join(d, r))
        console.log('koabody 3 path:'+d+':'+r)
        reader.pipe(stream)
        console.log('koabody 4')
        console.log('uploading %s -> %s', file.name, stream.path)
    } catch (e) {
        console.log('in catch e')
        console.log(e)
    }
    await ctx.render('upload-avatar-success', {
        title: 'Upload avatar success',
    })

}