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

var browser = new webdriver
    .Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

browser.get('https://vk.com/login');
browser.findElement(by.xpath('//*[@id="email"]')).sendKeys(login);
browser.findElement(by.xpath('//*[@id="pass"]')).sendKeys(password);
browser.sleep(1000);
browser.findElement(by.xpath('//*[@id="login_button"]'));
