const emailBox = '<input type="email" id="subscribeEmail" class="input-full J-email" name="subscribeEmail" autocorrect="off" autocapitalize="none" placeholder="Email">'


//--------------- Imports -----------------//

const puppeteer = require('puppeteer');
const fs = require('fs');

//--------------- Variables -----------------//

let code = ""
let desc = ""
let validFor = ""
let content = ""
//let email = "alibaba"+i+"@testing.no"
const url ="https://www.jackery.com/";

//--------------- Make output file -----------------//

fs.writeFile('output.txt');

//------------- Delay Function----------------//

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
        console.log("waiting for " + time + "ms");
    });
}

//--------------- Puppeteer function -----------------//

async function run() 
{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Input email and click gift button

    await page.waitForSelector('input[id="subscribeEmail"]');
    await page.type('input[id="subscribeEmail"]', "newmailierall"+i+"@gmail.com");
    await page.click('img[class="J-gift"]');

    await delay(5000);

    // Identyfy text elements

    const codeText = await page.$("[class='J-code-text']");

    const descText = await page.$("[class='percentage-wrap']");

    const validForText = await page.$("[class='time-wrap J-date-text']");

    // Save text elements to variables

    code = await (await codeText.getProperty('textContent')).jsonValue();

    desc = await (await descText.getProperty('textContent')).jsonValue();

    validFor = await (await validForText.getProperty('textContent')).jsonValue();

    // Print variables for testing purposes
    console.log("Var test")
    console.log("Code: " + code);
    console.log("Description: " + desc);
    console.log("Valid For: " + validFor);

    // Take screenshot to verify variable values

    await page.screenshot({path: 'example'+i+'.png'});

    // close browser

    await browser.close();
}

//--------------- Loop function -----------------//

async function main() 
{
    for (i = 0; i < 10; i++) 
    {
        await run();

        content = "----------------"+"\n"+"Image: example"+i+".png"+"\n"+"Code: " + code + "\n" + "Description: " + desc + "\n" + "Valid For: " + validFor + "\n";

        fs.appendFile('output.txt', content, err => {
            if (err) {
            console.error(err);
            }
        });


    }
}

//--------------- Stop function -----------------//

function stop(){
    process.exit(0);
}




