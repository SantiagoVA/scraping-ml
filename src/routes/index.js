const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const dataJson = require('../models/dataSchema');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()




router.get('/', (req, res) => {
    res.render('main')
});

router.post('/search', jsonParser, (req, res) => {
    const nameSearch = req.body.searchProduct;
    console.log(nameSearch)
    
async function scraping(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let cards = []
    async function getPageData(){

    
    await page.goto(`https://listado.mercadolibre.com.co/${nameSearch}`);
    const data = await page.evaluate(()=>{
        const $cards = document.querySelectorAll('.andes-card');
        const data = []
        $cards.forEach(($card)=>{
            data.push({
                title: $card.querySelector('.ui-search-result__content-wrapper .ui-search-item__group h2').textContent.trim(),
                link:  $card.querySelector('.ui-search-result__content-wrapper .ui-search-item__group a').href.trim(),
            })
        })
        
        return{
            cards: data,
        }
    })
    cards = data.cards
    console.log(cards)
    await dataJson.update({name: "nameID"}, {jsonObject: cards});
}
    
    getPageData();
    // await browser.close();
}

scraping();
res.redirect('/');
});


module.exports = router;