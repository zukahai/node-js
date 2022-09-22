import express from 'express';
import configViewEngine from './configs/viewEngine.js';
import homeRouter from "./route/web.js";
import { Router } from 'express';
import RouteGroup from 'express-route-grouping';

require('dotenv').config();
const app = express()
const root = new RouteGroup('/', Router());

root.group('blogs', blogs => {
    // -> /blogs
    blogs.get('/', (req, res) => {
        res.render('admin/index.ejs')
    });

    blogs.group(':blogId', blog => {
        // -> /blogs/:blogId
        blog.get('/', (req, res) => {
            res.send("Blogs");
        });

        // -> /blogs/:blogId
        blog.post('/', (req, res) => {});

        // -> /blogs/:blogId/comments
        blog.get('comments', (req, res) => {});

        // -> /blogs/:blogId/likes
        blog.get('likes', (req, res) => {});
    });
});
console.log(root.export())
app.use('/', root.export());



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);
homeRouter(app);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Start: http://localhost:${port}`)
})