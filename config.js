var path = require('path');

const sys = {
    appRoot: path.resolve(__dirname)
}

const smtp = {
    host: "smtp.126.com",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'hyyouwork',
        pass: 'FlYrtxItfYeS9JRr'
    },
    email:'hyyouwork@126.com',
    nickName:'hyyouwork@126.com',
    url_domain:'http://localhost:3000'
}

const user = {
    hmackey: 'koa2base hmackey'
}

const db = {
    host: 'mongodb://rbacAdmin:123456@127.0.0.1:27017/rbac'
}

const category = [
    {//第一个特殊，必须是All，表示所有
        idStr:'category_all', 
        name: 'All'
    },
    {
        idStr:'category_dev_web', 
        name: 'Web'
    },
    {
        idStr: 'category_dev_client',    
        name: 'Client'
    },
    // {
    //     idStr:'category_big_data',
    //     name: 'BigData'
    // },
    {
        idStr:'category_pm',
        name: 'PM'
    },
    {
        idStr: 'category_job',
        name: 'Job'
    },
    {
        idStr:'category_no_category', 
        name: 'Other'
    },
]
module.exports = {
    category,
    smtp,
    db,
    user,
    sys,
}