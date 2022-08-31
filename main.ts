import readline from 'readline';
import puppeteer, { ElementHandle } from 'puppeteer';
const scrape = async (a:string, ab: string, abc: string) => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        // UserAgent Setup
        await page.setUserAgent(
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
        );

        // Set message in localStorage for later use 
        await page.evaluateOnNewDocument((a) => {
            localStorage.setItem("msg", a);
        }, a)

        // Navigate to whatsapp
        await page.goto("https://web.whatsapp.com/");

        // Watch for side panel 
        await page.waitForSelector("#pane-side", {timeout: 0});
        await delay(1000);

        //Change contact you want to send messages to
        await page.click(`span[title='${abc}']`);
        await page.waitForSelector(".p3_M1", { timeout: 0 });

        //Finds the message bar and focuses on it
        const editor = await page.$("div[data-tab='10']");
        await editor?.focus();
        for (var i = 0; i < parseInt(ab); i++) {
            await page.evaluate(() => {
                const message:any = localStorage.getItem("msg");
                document.execCommand("insertText", false, message);
            });
            await page.click("span[data-testid='send']");
            await delay(500);
        }
    } catch (e) {
        console.error("error mine", e);
    }
};

const delay = (time: number) => {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

// Command line utilities 
const prc = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

prc.question("Enter message: ", (msg) => {
    prc.question("Enter reps: ", (reps) => {
        prc.question("Enter contact: ", (p) => {
            scrape(msg, reps, p);
        });
    });
});
