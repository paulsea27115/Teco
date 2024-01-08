import User from '../../models/User.mjs'
import Post from '../../models/Post.mjs'

const path = '/signup'
const method = 'get'
const handler = async (req, res) => {
    return res.render('register/signup')
}

export { path, method, handler }