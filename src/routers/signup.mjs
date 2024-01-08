import User from '../../models/User.mjs'
import Post from '../../models/Post.mjs'
import * as validata from '../validata'
import { encryptPassword } from '../utils/encryptPassword'

const path = '/login'
const method = 'post'
const handler = async (req, res) => {
    const {
        name,
        id,
        password,
        email
    } = req.body

    if (!validata.checkString(name, [2, 20])) {
        return res.status(400).json({ // 200이 defualt 값
          errorCode: 'VaildationError',
          errorMessage: '"name"이 문제가 있습니다.'
        })
    }

    if (!validata.checkId(id)) {
        return res.status(400).json({ // 200이 defualt 값
          errorCode: 'VaildationError',
          errorMessage: '"id"이 문제가 있습니다.'
        })
    }

    if (!validata.checkEmail(email)) {
        return res.status(400).json({ // 200이 defualt 값
          errorCode: 'VaildationError',
          errorMessage: '"email"에 문제가 있습니다.'
        })
    }
    
    if (!validata.checkPassword(password)) {
        return res.status(400).json({ // 200이 defualt 값
          errorCode: 'VaildationError',
          errorMessage: '"password"에 문제가 있습니다.'
        })
    }


    const encryptedPassword = encryptPassword(password, id)

    const user = await User.create({
        name,
        id,
        password: encryptedPassword,
        email
    })

    return res.status(200).json(user)
}

export { path, method, handler }