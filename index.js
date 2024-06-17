import express from 'express'
import urlRoutes from './routes/url.js'
import handleMongoDBConnect from './connect.js';
import URL from './models/url.js';
import ejs from 'ejs'
import path from 'path'
import staticRoute from './routes/staticRouter.js'

const app = express();
const PORT = 8001;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));  

handleMongoDBConnect('mongodb://localhost:27017/short-url')
app.use(express.json({extended: false}))
app.use(express.urlencoded({extended: false}))

app.use('/url',urlRoutes);
app.use('/', staticRoute);

app.get('/test', async (req,res)=> { 
    const allUrls = await URL.find({});
    res.render('home', {
        urls: allUrls,
        data:'Keyur', 
    })
})

app.get('/ssr/:shortId', async (req,res)=>{
    const allUrls = await URL.find({});
    res.end(`
        <html>
            <head></head>
            <body>
                <ol>
                ${allUrls.map((url)=> `<li>${url.shortId} ___ ${url.redirectURL} ___ ${url.visitHistory.length}</li>`).join('')}
                </ol>
            </body>
        </html>
        `)
})

app.listen(PORT, ()=> console.log(`Server is runnig on port: ${PORT}`))