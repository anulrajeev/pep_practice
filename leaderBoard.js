let request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let link = "https://www.espncricinfo.com/series/ipl-2021-1249214/match-results";
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
                //printing the scorecard link
                console.log("https://www.espncricinfo.com/" +  scorecardLink[i].href);
            }
    }
}