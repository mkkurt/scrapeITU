import fetch from "node-fetch";
import iconv from "iconv-lite";
import jsdom from "jsdom";
const { JSDOM } = jsdom;

const allCodes = async () => {
  const dropDownSelector =
    "body > div > div.main-container > div > div.project__filter > form ";
  const response = await fetch(
    "https://sis.itu.edu.tr/TR/ogrenci/ders-programi/ders-programi.php?seviye=LS"
  );
  const resBuffer = await response.arrayBuffer();
  //Turkish character decoding (iso-8859-9)
  let bodyDecoded = iconv
    .decode(Buffer.from(resBuffer), "iso-8859-9")
    .toString();
  const dom = new JSDOM(bodyDecoded);
  const optList = Array.from(
    [...dom.window.document.querySelectorAll(dropDownSelector)][0].childNodes[3]
  );
  let allCodes = optList.map((e) => {
    return e.textContent.trim();
  });
  allCodes.shift();
  return allCodes;
};

export default allCodes;
