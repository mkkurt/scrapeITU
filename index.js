//allRemaining vermediğim bütün dersleri dönüyor.
//TODO Automate cookie capture too.
//*Transcript uses Puppeteer for now.
//TODO Enter credentials to credentials.js before running. (It's not secure for github)

import checkCode from "./openCourses/checkCode.js";
import getTranscript from "./Transcript/getTranscript.js";
import coursePlan from "./coursePlan/coursePlan.js";
import allCodes from "./allCodes.js";

var openCourses = await checkCode("MST");
var tc = await getTranscript();
var plan = await coursePlan();

//Kalan tüm dersler
function findNeverPicked() {
  let tcCodesUniq = [
    ...new Set(
      tc.map((course) => {
        return course.Code;
      })
    ),
  ];
  let planCodesUniq = [
    ...new Set(
      plan.map((course) => {
        return course.Code;
      })
    ),
  ];
  let difference = planCodesUniq.filter((x) => !tcCodesUniq.includes(x));
  let neverPicked = [];
  for (let i = 0; i < difference.length; i++) {
    for (let j = 0; j < plan.length; j++) {
      if (difference[i] == plan[j].Code) {
        neverPicked.push(plan[j]);
      }
    }
  }
  return neverPicked;
}

//Tc de olup bu zamana kadar veremediklerim
function findNeverPassed() {
  let neverPassedCourses = {};
  for (let c of tc) {
    if (c.Grade === "FF") {
      neverPassedCourses[c.Code] = c;
    } else if (neverPassedCourses[c.Code] && c.Grade !== "FF") {
      delete neverPassedCourses[c.Code];
    }
  }
  return Object.values(neverPassedCourses);
}

function allRemaining() {
  let arr = [];
  arr.push(findNeverPicked());
  arr.push(findNeverPassed());
  console.log("allRemaining finished");
  return arr.flat();
}
async function findAllOpens() {
  let allOpens = [];
  //First gather all codes
  let all = await allCodes();
  console.log("allCodes finished");
  //Then give all codes to checkCode()
  console.log(`There is ${all.length} codes. Going to check all..`);
  for (let code of all) {
    let courses = await checkCode(code);
    allOpens.push(courses);
    console.log(`Checked and pushed the courses named ${code}`);
  }
  console.log("findAllOpens finished");
  return allOpens.flat();
}

let remainings = allRemaining();
let opens = await findAllOpens();

function findOpenButHaventPassed() {
  let openButHaventPassed = [];
  for (let i = 0; i < remainings.length; i++) {
    for (let j = 0; j < opens.length; j++) {
      //Intersection of all remaining and all opens
      if (remainings[i].Code == opens[j].Code) {
        openButHaventPassed.push(remainings[i]);
      }
    }
  }
  console.log("Finished findOpenButHaventPassed");
  console.log("Open but never passed courses:");
  console.log(openButHaventPassed);
  console.log("All remaining courses:");
  console.log(remainings);
  console.log(`Number of openButHaventPassed: ${openButHaventPassed.length}`);
  console.log(`Number of allRemaining: ${remainings.length}`);
  return openButHaventPassed;
}
findOpenButHaventPassed();
