import User from '../../models/User.mjs'
import Post from '../../models/Post.mjs'

const path = '/login'
const method = 'get'
const handler = async (req, res) => {
    return res.render('login')
}

export { path, method, handler }