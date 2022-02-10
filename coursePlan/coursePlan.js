import fetch from "node-fetch";
import Course from "./Course.js";
import iconv from "iconv-lite";
import jsdom from "jsdom";
const { JSDOM } = jsdom;

const selector = "body > div.main-container > div > div";

const coursePlan = async () => {
  const response = await fetch(
    "https://www.sis.itu.edu.tr/TR/ogrenci/lisans/ders-planlari/plan/MEN/201610.html"
  );
  const resBuffer = await response.arrayBuffer();
  //Turkish character decoding (iso-8859-9)
  let bodyDecoded = iconv
    .decode(Buffer.from(resBuffer), "iso-8859-9")
    .toString();
  const dom = new JSDOM(bodyDecoded);
  const tables = dom.window.document.querySelectorAll(selector);
  let arr = [];
  for (let i = 0; i < tables.length; i++) {
    let courses = tables[i].querySelectorAll("table > tbody > tr");
    for (let j = 0; j < courses.length; j++) {
      //Get only courses
      if (courses[j].querySelector("td").innerHTML != "Ders Kodu") {
        let code = courses[j].querySelector("td > a").innerHTML;
        let title = courses[j].querySelector("td:nth-child(2)").innerHTML;
        let credit = courses[j].querySelector("td:nth-child(3)").innerHTML;
        if (!code.includes("Zorunlu") & !title.includes("Selective")) {
          let course = new Course(code, title, credit);
          arr.push(course);
        }
      }
    }
  }
  return arr;
};

export default coursePlan;
