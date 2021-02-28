const express = require('express');
const app = express();
const indexRoutes = require('./routes/index');
const path = require('path');
const puppeteer = require('puppeteer');
const {promises: fsp} = require('fs');
const {join} = require('path');





//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

//Routes 
app.use('/', indexRoutes);

const arr = ["celular", "televisor", "nevera", "electrodomesticos", "computadora"]

//Scraping 
async function scraping(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let cards = []
    async function getPageData(){

    for(element of arr){
        await page.goto(`https://listado.mercadolibre.com.co/${element}`);
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
        fsp.writeFile(join(process.cwd(), 'src','public', 'dataFiles', `${element}.json`), `${JSON.stringify(cards)}`, ()=>{
            console.log('data received')
        })
    }
    }
    
    
    getPageData();
    // await browser.close();
}

scraping();

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});