import Post from '../../models/Post.mjs'

const path = '/board/:postId/view'
const method = 'get'
const handler = async (req, res) => {
    const { params: { postId }, query: { origin_page: originPage = '1' } } = req
    
    if (postId.length !== 24) {
        return res.redirect('/')
    }
    
    const post = await Post.findOneAndUpdate(
        { _id: postId },
        { $inc: { viewCount: 1 } },
        { new: true }
    )

    if (post === null) {
        return res.redirect('/')
    }

    return res.render('board/board', {post, originPage})
}

export { path, method, handler }
