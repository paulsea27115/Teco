import User from '../../models/User.mjs'
import Post from '../../models/Post.mjs'

const path = '/'
const method = 'get'
const handler = async (req, res) => {
    return res.render('index')
}

export { path, method, handler }