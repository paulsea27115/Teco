const path = '/signup'
const method = 'get'
const handler = async (req, res) => {
    return res.render('register/signup')
}

export { path, method, handler }