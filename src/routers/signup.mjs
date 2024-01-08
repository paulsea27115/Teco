import User from '../models/User.mjs'
import Post from '../models/Post.mjs'
import { encryptPassword } from '../utils/encryptPassword.mjs'
import { checkString } from '../validata/string.mjs'
import { checkId } from '../validata/id.mjs'
import { checkEmail } from '../validata/email.mjs'
import { checkPassword } from '../validata/password.mjs'

const path = '/signup'
const method = 'post'
const handler = async (req, res) => {
    const {
        name,
        id,
        password,
        email
    } = req.body

    if (!checkString(name, [2, 20])) {
        return res.status(400).json({ // 200이 defualt 값
          errorCode: 'VaildationError',
          errorMessage: '"name"이 문제가 있습니다.'
        })
    }

    if (!checkId(id)) {
        return res.status(400).json({ // 200이 defualt 값
          errorCode: 'VaildationError',
          errorMessage: '"id"이 문제가 있습니다.'
        })
    }

    if (!checkEmail(email)) {
        return res.status(400).json({ // 200이 defualt 값
          errorCode: 'VaildationError',
          errorMessage: '"email"에 문제가 있습니다.'
        })
    }
    
    if (!checkPassword(password)) {
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