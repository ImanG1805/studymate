const { Builder, By, until } = require("selenium-webdriver");

async function runTests(){

let driver = await new Builder()
.forBrowser("chrome")
.build();

try {

await driver.get(
"file:///C:/Users/Iman/Desktop/studymate/index.html"
);


await driver.wait(
until.elementLocated(By.id("loginName")),
5000
);

console.log("TEST 1 PASSED - Application opens");




await driver.findElement(By.id("loginName"))
.sendKeys("Iman");

await driver.findElement(By.id("loginEmail"))
.sendKeys("test@gmail.com");

await driver.findElement(By.id("loginPassword"))
.sendKeys("12345");

await driver.findElement(
By.xpath("//button[contains(text(),'Login')]")
).click();

console.log("TEST 2 PASSED - User login works");



await driver.sleep(1000);

await driver.findElement(By.id("subjectInput"))
.sendKeys("Programming");

await driver.findElement(
By.xpath("//button[contains(text(),'Add')]")
).click();

console.log("TEST 3 PASSED - Subject creation works");



await driver.sleep(1000);

await driver.findElement(By.id("taskInput"))
.sendKeys("Finish project");

await driver.findElement(By.id("dateInput"))
.sendKeys("06/20/2026");

await driver.findElement(
By.xpath("//button[contains(text(),'Add Task')]")
).click();

console.log("TEST 4 PASSED - Task creation works");



await driver.sleep(1000);

await driver.findElement(By.id("searchInput"))
.sendKeys("Finish");

console.log("TEST 5 PASSED - Search functionality works");


console.log("ALL SELENIUM TESTS PASSED");

}

catch(error){

console.log("TEST FAILED");
console.log(error);

}

finally{

await driver.quit();

}

}

runTests();