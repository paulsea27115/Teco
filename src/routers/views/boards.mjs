import Post from '../../models/Post.mjs'
import User from '../../models/User.mjs'
import { checkString } from '../../validata/string.mjs'

const path = '/boards'
const method = 'get'
const handler = async (req, res) => {

    let { page: pageString = '1', limit: limitString = '10' } = req.query

    if (!checkString(pageString)) {
        pageString = '1'
    }

    if (!checkString(limitString)) {
        limitString = '10'
    }

    const page = parseInt(pageString)
    const limit = parseInt(limitString)

    const postList = await Post.find().skip((page - 1) * limit).limit(limit)

    const totalPageCount = await Post.countDocuments()
    const lastPage = Math.ceil(totalPageCount / limit)

    const user = await User.findOne({ _id: req.session._id })

    return res.render('boards/boards', { postList, page, lastPage, user })
}

export { path, method, handler }
