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
            let filmName = cols[1].textContent;
            let rating = cols[2].textContent;
            console.log(filmName, rating);
        }
    }
}