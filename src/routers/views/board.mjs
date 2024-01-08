const path = '/board'
const method = 'get'
const handler = async (req, res) => {
    return res.render('board/board')
}

export { path, method, handler }