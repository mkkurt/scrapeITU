const CONSTANTS = {
  link: "http://uzay.sis.itu.edu.tr/login/index.php",
  user: "#ContentPlaceHolder1_tbUserName",
  pass: "#ContentPlaceHolder1_tbPassword",
  loginBtn: "#ContentPlaceHolder1_btnLogin",
  pin: "#PIN > input[type=password]",
  pinBtn: "body > div.pagebodydiv > form > p > input[type=submit]:nth-child(1)",
  ogrenciServisi:
    "body > div.pagebodydiv > table.menuplaintable > tbody > tr:nth-child(1) > td:nth-child(2) > a",
  ogrenciBilgileri:
    "body > div.pagebodydiv > table.menuplaintable > tbody > tr:nth-child(2) > td:nth-child(2) > a",
  tcrptSelector:
    "body > div.pagebodydiv > table.menuplaintable > tbody > tr:nth-child(3) > td:nth-child(2) > a",
  tableSelector:
    "body > div.pagebodydiv > table > tbody > tr > td > table:nth-child(3) > tbody > tr",
};

export default CONSTANTS;
