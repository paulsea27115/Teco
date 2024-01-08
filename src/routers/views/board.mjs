import User from '../../models/User.mjs'
import Post from '../../models/Post.mjs'

const path = '/board'
const method = 'get'
const handler = async (req, res) => {
    return res.render('board/board')
}

export { path, method, handler }