import Post from '../../models/Post.mjs'
import User from '../../models/User.mjs'

const path = '/board/:postId/view'
const method = 'get'
const handler = async (req, res) => {
    const { params: { postId }, query: { origin_page: originPage = '1' } } = req
    
    if (postId.length !== 24) {
        return res.redirect('/boards')
    }

    const user = await User.findOne({ _id: req.session._id })

    console.log(req.session._id)

    const post = await Post.findOne(
        { _id: postId }
    )

    let newPost;

    const today = new Date()
    
    console.log(today.getFullYear(), today.getMonth(), today.getDate())
    
    const today_format = today.getFullYear() + "/" + (today.getMonth()+1) + "/" + today.getDate()
    
    const postAuthorId = post.authorId.toString()
    const currentUserId = req.session._id ? req.session._id.toString() : null // req.session._id가 정의되어 있지 않으면 null로 초기화
    const isCurrentUserAuthor = postAuthorId === currentUserId
    
    if (currentUserId && isCurrentUserAuthor) { // currentUserId가 정의되어 있을 때만 처리
        const isUserAlreadyViewed = post.view_users.some(
            (viewUser) => viewUser.userId.toString() === currentUserId
        )

        console.log(isUserAlreadyViewed)

        if (!isUserAlreadyViewed) {
            console.log("isUserAlreadyViewed is false")
            await Post.updateOne(
                { _id: postId },
                {
                  $push: { view_users: { userId: currentUserId, lastViewed: today_format } },
                  $inc: { viewCount: 1 }
                },
                { new: true }
            );
            await post.save()
        } else {
            console.log("isUserAlreadyViewed is true")

            const user = post.view_users.find(
                (viewUser) => viewUser.userId.toString() === currentUserId
            )

            const lastViewed = user.lastViewed

            if (lastViewed !== today_format) {
                await Post.updateOne({ _id: postId }, {$inc: { viewCount: 1 }})
            }

            await post.save()
        }
        
    }

    console.log(today_format)

    if (post === null) {
        return res.redirect('/boards')
    }

    // console.log(req.session._id === post.authorId)

    console.log(post._id)

    return res.render('board/board', {post, originPage, user, id:req.session._id})
}

export { path, method, handler }
