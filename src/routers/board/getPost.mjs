import Post from '../../models/Post.mjs'

const path = '/board/:postId'
const method = 'get'
const handler = async (req, res) => {
    const { postId } = req.params
    const post = await Post.findOneAndUpdate(
        { _id: postId },
        { $inc: { viewCount: 1 } },
        { new: true }
    )

    if (post === null) {
        return res.status(404).json({
            errorCode: 'ResourceNotFound',
            errorMessage: '해당 포스트를 찾을 수 없습니다.'
        })
    }

    return res.render(post)
}

export { path, method, handler }
