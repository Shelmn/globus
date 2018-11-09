require('chromedriver');
var webdriver = require('selenium-webdriver'),
    by = webdriver.By,
    Promise = require('promise'),
    settings = require('./settings.json');

var login = settings.login;
var password = settings.password;
var log4js = require('log4js');
log4js.configure({
    appenders: {'file': {type: 'file', filename: 'instabot.log'}},
    categories: {
        default: {appenders: ['file'], level: 'debug'}
    }
});
var logger = log4js.getLogger('instabot');
var lostBtn;
var subBtn;
var toLike = function () {
    return 5000 + (Math.floor(Math.random()*25000)+Math.random());
};
var browser = new webdriver
    .Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

browser.get('https://www.instagram.com/accounts/login/');
browser.sleep(settings.sleep_delay+1500);
browser.findElement(by.name('username')).sendKeys(login);
browser.findElement(by.name('password')).sendKeys(password);
browser.findElement(by.xpath('//*[@id="react-root"]/section/main/div/article/div/div[1]/div/form/div[3]/button')).click().then(
    function () {
        console.log("click");
    }
);
browser.sleep(settings.sleep_delay+2000);
browser.get('https://instagram.com/' + settings.account_donor[0]);
browser.findElement(by.xpath('//*[@id="react-root"]/section/main/div/header/section/ul/li[2]/a')).click();
for (var i = 1; i < settings.subcount; i++) {
    browser.sleep(settings.sleep_delay);
        browser.findElement(by.xpath('/html/body/div[3]/div/div/div[2]/ul/div/li['+i+']/div/div[2]/button')).getText().then(
            function (text) {
                subBtn = text;
            }
        );
    browser.findElement(by.xpath('/html/body/div[3]/div/div/div[2]/ul/div/li['+i+']/div/div[2]/button')).then(
            function (a) {
                if (subBtn === "Подписаться") {
                    lostBtn = 0;
                    a.click();
                    console.log('sub');
                } else {
                    console.log('req');
                }
            });
    browser.sleep(toLike());
}
browser.quit();