import Post from '../../models/Post.mjs'
import { checkString } from '../../validata/string.mjs'

const path = '/board/:postId/delete'
const method = 'get'
const handler = async (req, res) => {
  // req.body 또는 req.params에서 게시글 ID를 가져옵니다.
  // 이는 클라이언트에서 요청을 보낼 때 어떻게 데이터를 보내는지에 따라 달라집니다.
  const postId = req.params.postId;
  console.log(postId)
  
  // 게시글 ID가 유효한지 확인합니다. (옵션)
  if (!checkString(postId)) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  // 데이터베이스에서 해당 게시글을 삭제합니다.
  const post = await Post.findByIdAndDelete({_id:postId});

  return res.redirect('/boards');
}

export { path, method, handler }
