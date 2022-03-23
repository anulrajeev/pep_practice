let request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');

let link = "https://www.espncricinfo.com/series/ipl-2021-1249214/match-results";

let leaderBoard=[];
let count=0;

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
                count++;
                request(new_link, cb2);
            }
    }
}

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
                let balls  = cols[3].textContent;
                let fours = cols[5].textContent;
                let sixes = cols[6].textContent;

                produceLeaderboardObject(name, runs, balls, fours, sixes);
            }
                    
        }

    }
    count--;
    if(count==0)
        {
            const data = JSON.stringify(leaderBoard);
            fs.writeFileSync('leaderboard.json', data, (err) => {
                if (err) {
                    throw err;
                }
                console.log("JSON data is saved.");
            });

            

        }
}

function produceLeaderboardObject(name, runs, balls, fours, sixes)
{
    runs  = Number(runs);
    balls = Number(balls);
    fours = Number(fours);
    sixes = Number(sixes);
    
    for(let i=0;i<leaderBoard.length;i++)
        if(leaderBoard[i].Batsman==name)
          {
              leaderBoard[i].Matches+=1;
              leaderBoard[i].Runs+=runs;
              leaderBoard[i].Balls+=balls;
              leaderBoard[i].Fours+=fours;
              leaderBoard[i].Sixes+=sixes;              
              return;
          }
    
    let obj = {
        Batsman : name,
        Matches : 1,
        Runs    : runs,
        Balls   : balls,
        Fours   : fours,
        Sixes   : sixes,   
    };

    leaderBoard.push(obj);

}