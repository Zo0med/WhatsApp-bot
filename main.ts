import readline from 'readline'
import puppeteer from 'puppeteer'

const scrape = async (a:string, ab:string, abc:string) => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto("https://web.whatsapp.com/");
    await page.waitForSelector(`span [title="${abc}"]`,{timeout: 0});
    const target = await page.$(`span [title="${abc}"]`);
    await target?.click();
    const inp = await page.$(
        "#main > footer > div._2BU3P.tm2tP.copyable-area > div > span:nth-child(2) > div > div._2lMWa > div.p3_M1 > div > div.fd365im1.to2l77zo.bbv8nyr4.mwp4sxku.gfz4du6o.ag5g9lrv"
    );
    for(let i = 0; i < parseInt(ab); i++){
        await inp?.type(a)
        await page.keyboard.press("Enter")
    }
}

const prc = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

prc.question("Enter message: ", (msg) => {
    prc.question("Enter reps: ", (reps) => {
        prc.question("Enter contact: ", (p) => {
            console.log(msg,reps,p)
            scrape(msg, reps, p)
        }) 
    })
});
