import express from 'express';
import { TextBoxControl } from './control/text-box-control';
import { ContentInfoControl } from './control/content-info-control';
import { MainInfoControl } from './control/main-info-control';

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

router.get('/TextBoox', (req: express.Request, res: express.Response) => {
    console.log('start TextBoox');
    console.log(req.body);
    const control = new TextBoxControl(req, res);
    control.processRequest();
    console.log('end TextBoox');
});

router.post('/TextBoox', (req: express.Request, res: express.Response) => {
    console.log('start TextBoox');
    console.log(req.body);
    const control = new TextBoxControl(req, res);
    control.processRequest();
    console.log('end TextBoox');
});
router.post('/ContentInfo', (req: express.Request, res: express.Response) => {
    console.log('start ContentInfo');
    console.log(req.body);
    const control = new ContentInfoControl(req, res);
    control.processRequest();
    console.log('end ContentInfo');
});

router.post('/MainInfo', (req: express.Request, res: express.Response) => {
    console.log('start MainInfo');
    console.log(req.body);
    const control = new MainInfoControl(req, res);
    control.processRequest();
    console.log('end MainInfo');
});



app.use(router)

// 3000番ポートでAPIサーバ起動
app.listen(3000, () => { console.log('Example app listening on port 3000!') })