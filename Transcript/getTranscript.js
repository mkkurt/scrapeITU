import puppeteer from "puppeteer";
import CONSTANTS from "./CONSTANTS.js";
import credentials from "./../credentials.js";

async function getTranscript() {
  //Browser
  const browser = await puppeteer.launch({
    // headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  //New Page
  const page = await browser.newPage();
  page.setDefaultTimeout(0);
  await page.goto(CONSTANTS.link, { waitUntil: "networkidle0" });
  await page.type(CONSTANTS.user, credentials.user);
  await page.type(CONSTANTS.pass, credentials.pass);
  await Promise.all([page.waitForNavigation(), page.click(CONSTANTS.loginBtn)]);
  await page.type(CONSTANTS.pin, credentials.pin);
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle0" }),
    page.click(CONSTANTS.pinBtn),
  ]);
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle0" }),
    page.click(CONSTANTS.ogrenciServisi),
  ]);
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle0" }),
    page.click(CONSTANTS.ogrenciBilgileri),
  ]);
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle0" }),
    page.click(CONSTANTS.tcrptSelector),
  ]);
  let transcript = await page.$$eval(CONSTANTS.tableSelector, (elements) => {
    class Course {
      constructor(code, title, credit, grade) {
        this.Code = code;
        this.Title = title;
        this.Credit = credit;
        this.Grade = grade;
      }
    }
    let arr = [];
    for (let i = 1; i < elements.length; i = i + 2) {
      let courseList = elements[i].querySelectorAll(
        "td:nth-child(1) > table > tbody > tr"
      );
      for (let j = 1; j < courseList.length; j++) {
        let code = courseList[j].querySelectorAll("td > font")[0].innerHTML;
        let title = courseList[j].querySelectorAll("td > font")[1].innerHTML;
        let credit = courseList[j]
          .querySelectorAll("td > font")[2]
          .innerHTML.replace("&nbsp;", "")
          .trim();
        let grade = courseList[j]
          .querySelectorAll("td > font")[3]
          .innerHTML.trim();
        arr.push(new Course(code, title, credit, grade));
      }
    }
    return arr;
  });
  await browser.close();
  return transcript;
}

export default getTranscript;
