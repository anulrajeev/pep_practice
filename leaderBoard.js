let request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let link = "https://www.espncricinfo.com/series/ipl-2021-1249214/match-results";

let leaderBoard=[];

request(link, cb);

function cb(err, res, body)
{
    if(err)
        console.log(err);
    else
    {
        const dom = new JSDOM(body);
        let scorecardLink = dom.window.document.querySelectorAll('a[data-hover="Scorecard"]');
        for(let i=0;i<scorecardLink.length;i++)
            {
                let new_link = "https://www.espncricinfo.com/" +  scorecardLink[i].href;
                request(new_link, cb2);
            }
    }
}
let i=0;
function cb2(err, res, body) {
    if(err)
        console.log(err);
    else{
        
        const dom = new JSDOM(body);
        let rows = dom.window.document.querySelectorAll('.table.batsman tbody tr');

        for(let i=0;i<rows.length;i++)
        {
            let cols  = rows[i].querySelectorAll('td');
            if(cols.length==8){

                let name  = cols[0].textContent;
                let runs  = cols[2].textContent;
                let balls  = cols[2].textContent;
                let fours = cols[5].textContent;
                let sixes = cols[6].textContent;

                console.log(name, runs, balls, fours, sixes);
            }
                    
        }

    }
}