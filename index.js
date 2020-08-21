const express = require('express');
const exphbs = require('express-handlebars');
const fs = require('fs');

const port = 3000;

const app = express();
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/:lang?', (req, res) => {
    console.log('GET /:lang');
    const rawTranslations = fs.readFileSync('translations.json');
    const translations = JSON.parse(rawTranslations);
    let lang = req.params.lang;
    const defaultLang = 'fr';    

    if (typeof translations[lang] === 'undefined') {
        lang = defaultLang;
    }

    const chosenTranslation = translations[lang];
    const flag = `/img/${lang}.png`;

    // console.log(chosenTranslation);

    const { pageTitle, title } = chosenTranslation;

    res.render('home', {
        pageTitle,
        title,
        flag
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});