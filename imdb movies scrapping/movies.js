let request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let link = "https://www.imdb.com/chart/top/?ref_=nv_mv_250";
request(link, cb);

function cb(err, res, body)
{
    if(err)
        console.log(err);
    else{
        const dom = new JSDOM(body);
        let rows = dom.window.document.querySelectorAll(".lister-list tr");
        for(let i=0;i<rows.length;i++)
        {
            let cols = rows[i].querySelectorAll('td');
            let filmLink = cols[1].querySelector('a').href;
            let new_link = "https://www.imdb.com/" + filmLink;
            // console.log(new_link);
            request(new_link, cb2);
        }
    }
}


function cb2(err, res, body){
    if(err)
        console.log(err);
    else{
       
        const dom = new JSDOM(body);
        let filmDetails = dom.window.document.querySelectorAll(".ipc-metadata-list-item__content-container");
        let name     = dom.window.document.querySelector('h1[data-testid="hero-title-block__title"]').textContent;
        let director = filmDetails[0].textContent;
        let writer   = filmDetails[1].textContent;
        let stars    = filmDetails[2].textContent;
        let rating   = dom.window.document.querySelector('.sc-7ab21ed2-1.jGRxWM').textContent;
        console.log('------------------------------------------------------');
        console.log("Name    :   ", name);
        console.log("Director:   ", director);
        console.log("Writer  :   ", writer);
        console.log("Stars   :   ", stars);
        console.log("Rating  :   ", rating);
        console.log('------------------------------------------------------');
        
    }
}