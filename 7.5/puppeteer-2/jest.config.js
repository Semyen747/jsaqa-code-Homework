module.exports = {
    verbose: true, //указывает на то, что каждый тест будет показан в отчете о процессе запуска 
     preset: "jest-puppeteer", //указываем, что будем использовать эту библиотеку
     testTimeout: 65500, // вернул таймаут по рекомендации программы
	 testMatch: ['<rootDir>/features/**/*.steps.js'],
  transform: {
    '^.+\\.steps.js$': 'jest-cucumber'
  }
 };
