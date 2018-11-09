require('chromedriver');
var webdriver = require('selenium-webdriver'),
    by = webdriver.By,
    Promise = require('promise'),
    settings = require('./settings.json');

var login = settings.login;
var password = settings.password;
var donor = settings.account_donor;
var log4js = require('log4js');
log4js.configure({
    appenders: {'file': {type: 'file', filename: 'instabot.log'}},
    categories: {
        default: {appenders: ['file'], level: 'debug'}
    }
});
var logger = log4js.getLogger('instabot');

var browser = new webdriver
    .Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

browser.get('https://vk.com/login');
browser.findElement(by.xpath('//*[@id="email"]')).sendKeys(login);
browser.findElement(by.xpath('//*[@id="pass"]')).sendKeys(password);
browser.sleep(1000);
browser.findElement(by.xpath('//*[@id="login_button"]')).click();
browser.get(donor);
browser.findElement(by.xpath('//*[@id="wide_column"]/div[1]/div[2]/a[1]')).click();
for (var i = 1; i < settings.subcount; i++) {
    browser.findElement(by.xpath('/*[@id="fans_rowsfans"]/div['+i+']/div[2]/a')).getText().then(
        function (a) {
            console.log(a);
        }
    );
}