import express from 'express'
import { TextBoxControl } from './control/text-box-control'

const app: express.Express = express()

// CORSの許可
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

// body-parserに基づいた着信リクエストの解析
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// GetとPostのルーティング
const router: express.Router = express.Router()
router.get('/GetTopInfos/', (req: express.Request, res: express.Response) => {
    console.log('start GetTopInfos');
    res.send(req.query)
    console.log('end GetTopInfos');
});
router.all('/TextBoox', (req: express.Request, res: express.Response) => {
    console.log('start TextBoox');
    const control = new TextBoxControl(req, res);
    control.processRequest();
    console.log('end TextBoox');
});
router.post('/api/EditSentence', (req: express.Request, res: express.Response) => {
    res.send(req.body)
});



app.use(router)

// 3000番ポートでAPIサーバ起動
app.listen(3000, () => { console.log('Example app listening on port 3000!') })