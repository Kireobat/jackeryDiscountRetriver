const emailBox = '<input type="email" id="subscribeEmail" class="input-full J-email" name="subscribeEmail" autocorrect="off" autocapitalize="none" placeholder="Email">'


//--------------- Imports -----------------//

const puppeteer = require('puppeteer');
const fs = require('fs');

//--------------- Variables -----------------//

let code = ""
let desc = ""
let validFor = ""
let email = "allah+8@testing.no"
const url ="https://www.jackery.com/";

//------------- Delay Function----------------//

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
        console.log("waiting for " + time + "ms");
    });
}

//--------------- Main -----------------//

async function run() 
{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Input email and click gift button

    await page.waitForSelector('input[id="subscribeEmail"]');
    await page.type('input[id="subscribeEmail"]', email);
    await page.click('img[class="J-gift"]');

    await delay(4000);

    // Identyfy text elements

    const codeText = await page.$("[class='J-code-text']");

    const descText = await page.$("[class='percentage-wrap']");

    const validForText = await page.$("[class='time-wrap J-date-text']");

    // Save text elements to variables

    code = await (await codeText.getProperty('textContent')).jsonValue();

    desc = await (await descText.getProperty('textContent')).jsonValue();

    validFor = await (await validForText.getProperty('textContent')).jsonValue();

    // Print variables for testing purposes

    console.log("Code: " + code);
    console.log("Description: " + desc);
    console.log("Valid For: " + validFor);

    // Take screenshot to verify variable values

    await page.screenshot({path: 'example.png'});

    await browser.close();
}

run();