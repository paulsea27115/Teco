const path = '/login'
const method = 'get'
const handler = async (req, res) => {
    return res.render('register/login')
}

export { path, method, handler }