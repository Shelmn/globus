var read = require('read');

/*read({ prompt : 'Password: '}, function (err, pass) {
    password = pass;*/
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
var element = 0;
var unsubable;
function unsubTrue() {
    if (settings.whitelist.indexOf(sub)>=0) {
        unsubable = false;
    }
    else {
        unsubable = true;
    }
}
var logger = log4js.getLogger('instabot');
var sub;
var toLike = function () {
    return Math.floor(Math.random()*10)+Math.random();
};var browser = new webdriver
    .Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();
browser.manage().window().setSize(800, 600);
browser.get('https://www.instagram.com/accounts/login/');
browser.sleep(settings.sleep_delay+toLike());
browser.findElement(by.name('username')).sendKeys(login);
browser.findElement(by.name('password')).sendKeys(password);
browser.sleep(settings.sleep_delay+Math.random()+1000);
browser.findElement(by.xpath('//button')).click();
do {
    browser.sleep(settings.sleep_delay + Math.random() + 1000);
    browser.get('https://instagram.com/' + login);
    browser.findElement(by.xpath('//*[@id="react-root"]/section/main/div/header/section/ul/li[3]/a')).click();
    browser.sleep(settings.sleep_delay + Math.random());
    for (var i = 1; i < 7; i++) {
            browser.sleep(settings.sleep_delay + toLike() + Math.random() + 1000);
            browser.findElement(by.xpath('/html/body/div[3]/div/div[2]/div/div[2]/ul/div/li['
                + i + ']/div/div[1]/div/div[1]/a')).getText().then(function (text) {
                sub = text;
                unsubTrue();
            });
            browser.sleep(settings.sleep_delay);
            browser.findElement(by.xpath('/html/body/div[3]/div/div[2]/div/div[2]/ul/div/li['
                + i + ']/div/div[2]/span/button')).then(function (a) {
                if (unsubable) {
                    a.click();
                    browser.sleep(settings.sleep_delay + toLike());
                }

            });
            browser.sleep(1000+Math.random());
            browser.findElement(by.xpath('/html/body/div[4]/div/div/div/div[3]/button[1]')).click();
    }
    element += 10;
}while(element<settings.unsubcount);
