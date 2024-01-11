import "../env.mjs"; // 코드 보안
import express from 'express';
import helmet from 'helmet'; // 서버 보안을 위해
import bodyParser from "body-parser"; // post body를 읽기 위해
import session from "express-session"
import methodOverride from 'method-override'
import cors from 'cors';
import multer from 'multer'
import fs from 'fs'
import path from 'path'
// import MongoStore from "connect-mongo";

import * as loginPost from './routers/login.mjs'
import * as signupPost from './routers/signup.mjs'
import * as getPost from './routers/board/getpost.mjs'
import * as createPost from './routers/board/createPost.mjs'
import * as deletePost from './routers/board/deletePost.mjs'

import * as indexPage from './routers/views/index.mjs'
import * as loginPage from './routers/views/login.mjs'
import * as signUpPage from './routers/views/signup.mjs'
import * as boardPage from './routers/views/board.mjs'
import * as boardsPage from './routers/views/boards.mjs'

import User from './models/User.mjs'

const routes = [
  loginPost,
  signupPost,
  getPost,
  deletePost,
  // createPost,

  // page
  indexPage,
  loginPage,
  signUpPage,
  boardPage,
  boardsPage
]

try {
	fs.readdirSync('uploads'); // 폴더 확인
} catch(err) {
	console.error('uploads 폴더가 없습니다. 폴더를 생성합니다.');
  fs.mkdirSync('uploads'); // 폴더 생성
}

async function startServer(){
  const server = express()
  const upload = multer({
    storage: multer.diskStorage({ // 저장한공간 정보 : 하드디스크에 저장
        destination(req, file, done) { // 저장 위치
            done(null, 'uploads/'); // uploads라는 폴더 안에 저장
        },
        filename(req, file, done) { // 파일명을 어떤 이름으로 올릴지
            const ext = path.extname(file.originalname); // 파일의 확장자
            done(null, path.basename(file.originalname, ext) + Date.now() + ext); // 파일이름 + 날짜 + 확장자 이름으로 저장
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 } // 5메가로 용량 제한
  });
  
  server.use(bodyParser.json()) // json 사용 가능
  server.use(bodyParser.urlencoded({ extended: true })) // extended qs 모듈 설치 되어야함
  server.use('/static', express.static('./src/static'))
  server.use('/uploads', express.static('./uploads'));

  server.use(methodOverride('_method'))
  server.set('trust proxy', 1) // trust first proxy

  server.use(session({
    secret: process.env.SESSION_SECRET, // 세션 암호화를 위한 비밀 키 설정
    resave: true, // 세션의 변경 사항이 없더라도 세션을 다시 저장할 것인지 여부
    saveUninitialized: false, // 초기화되지 않은 세션을 저장할 것인지 여부
    // store: MongoStore.create({ mongoUrl: process.env.DB_URL }) // 세션 데이터를 MongoDB에 저장하기 위한 설정
  }));

  // view 엔진
  server.set('view engine', 'ejs')
  server.set('views', './src/views')

  // helmet
  server.use(helmet())

  server.set("port", process.env.PORT)

  server.use((req, res, next)=>{
    if (req.session._id === undefined) return next()
    User.findOne({_id: req.session._id})
    .then(user=>{
      return next()
    })
    .catch(err=>{
      next(err)
    })
  })
  
  // 라우터 연결
  routes.forEach(({ path, method, handler }) => {
    server[method](path, cors(), (req, res, next) => {
      handler(req, res)
        .then(() => {
          next()
        })
        .catch((err) => {
          next(err)
        })
    })
  })

  // img 업로드 router
  server[createPost.method](createPost.path, upload.single('image'), createPost.handler)

  // 포트
  await new Promise((resolve)=>{
    server.listen(server.get('port'), () => {
      resolve(undefined)
    })
  })

  server.on('error', err => {
    console.error(err);
  })

  console.log('server is Ready!')

}
export {startServer}