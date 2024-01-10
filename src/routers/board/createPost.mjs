import multer from 'multer'
import Post from '../../models/Post.mjs'
import { checkString } from '../../validata/string.mjs'

const path = '/board'
const method = 'post'
const handler = async (req, res) => {
  if (req.session._id === undefined) {
    return res.status(401).json({
      errorCode: 'Unauthorized',
      errorMessage: '로그인이 되어 있지 않습니다.'
    })
  }

  const { title, content } = req.body

  if (!checkString(title)) {
    return res.status(400).json({ // 200이 defualt 값
      errorCode: 'VaildationError',
      errorMessage: '"title"에 문제가 있습니다.'
    })
  }

  if (!checkString(content)) {
    return res.status(400).json({ // 200이 defualt 값
      errorCode: 'VaildationError',
      errorMessage: '"content"에 문제가 있습니다.'
    })
  }

  // const post = await Post.create({
  //   title,
  //   content,
  //   authorId: req.session._id
  // })

  const post = await Post.create({
    title: title,
    content: content,
    image: {
      data: req.file.filename,
      contentType: 'image/png'
    },
    authorId: req.session._id
  })

  // Post.save().then(()=>res.send("successfully uploaded")).catch((err)=>{console.log(err)})

  return res.json(post)
}

export { path, method, handler }
