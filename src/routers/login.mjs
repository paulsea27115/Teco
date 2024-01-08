import User from '../../models/User.mjs'
import Post from '../../models/Post.mjs'

const path = '/login'
const method = 'post'
const handler = async (req, res) => {
    const { id, password: originalPassword } = req.body

    const user = await User.findOne()
    
}

export { path, method, handler }