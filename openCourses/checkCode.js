import Course from "./Course.js";
import FormData from "form-data";
import fetch from "node-fetch";
import iconv from "iconv-lite";
import jsdom from "jsdom";
const { JSDOM } = jsdom;

const checkCode = async (code) => {
  var form = new FormData();
  form.append("derskodu", code);
  const options = {
    method: "POST",
    body: form,
  };
  const response = await fetch(
    "https://sis.itu.edu.tr/TR/ogrenci/ders-programi/ders-programi.php?seviye=LS",
    options
  );
  const resBuffer = await response.arrayBuffer();

  //Turkish character decoding (iso-8859-9)
  let bodyDecoded = iconv
    .decode(Buffer.from(resBuffer), "iso-8859-9")
    .toString();
  const dom = new JSDOM(bodyDecoded);
  const tdList = [...dom.window.document.querySelectorAll("td")];
  let arr = [];
  for (let i = 31; i < tdList.length; i = i + 15) {
    let crn = tdList[i - 1].textContent;
    let code = tdList[i].childNodes[0].textContent;
    let title = tdList[i + 1].textContent;
    let instructor = tdList[i + 3].textContent.replace(/\s{2,}/g, " ");
    let building = tdList[i + 4].childNodes[0].textContent;
    let day = tdList[i + 5].textContent.trim();
    let time = tdList[i + 6].textContent.trim();
    let room = tdList[i + 7].textContent;
    let capacity = `${tdList[i + 9].textContent}/${tdList[i + 8].textContent}`;
    let restrictions = tdList[i + 11].childNodes[0].textContent;
    let course = new Course(
      crn,
      code,
      title,
      instructor,
      building,
      day,
      time,
      room,
      capacity,
      restrictions
    );
    arr.push(course);
  }
  return arr;
};
export default checkCode;
