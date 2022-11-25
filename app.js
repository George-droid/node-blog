const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const blogRoutes = require('./routes/blogRoutes')

//express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://layer3:Layer3.@nodeblog.3uj6rnf.mongodb.net/note-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));



//Register view engine
app.set('view engine', 'ejs');


 //middlewares and statics
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

/*mongoose and mongo sanbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });

    blog.save()
        .then((result) => {
            res.send(result)    
        })
        .catch((err) => {
            console.log(err)
        });
});
*/



app.get('/', (req, res) => {
    res.redirect('/blogs');
});

//blog routes
app.use(blogRoutes);

//404
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
})