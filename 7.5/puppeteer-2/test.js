const puppeteer = require('puppeteer');

describe('Бронирование билетов', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://qamid.tmweb.ru/client/index.php');
  });

  afterEach(async () => {
    await page.close();
  });

  test('Happy path: успешное бронирование билетов', async () => {
    // Действия пользователя
    await page.type('#name', 'John Doe');
    await page.type('#email', 'john.doe@example.com');
    await page.type('#phone', '1234567890');
    await page.click('#submit');

    // Ожидание элемента с сообщением об успехе
    await page.waitForSelector('#success-message');

    // Получение текста сообщения об успехе
    const successMessage = await page.$eval('#success-message', element => element.textContent);
    expect(successMessage).toBe('Билеты успешно забронированы!');
  });

  test('Happy path: успешное бронирование билетов с выбором мест', async () => {
    // Действия пользователя
    await page.type('#name', 'John Doe');
    await page.type('#email', 'john.doe@example.com');
    await page.type('#phone', '1234567890');
    await page.click('#seat-1');
    await page.click('#seat-2');
    await page.click('#submit');

    // Ожидание элемента с сообщением об успехе
    await page.waitForSelector('#success-message');

    // Получение текста сообщения об успехе
    const successMessage = await page.$eval('#success-message', element => element.textContent);
    expect(successMessage).toBe('Билеты успешно забронированы!');
  });

  test('Sad path: ошибка при бронировании', async () => {
    // Действия пользователя
    await page.type('#name', 'John Doe');
    await page.type('#email', 'invalid-email');
    await page.type('#phone', '1234567890');
    await page.click('#submit');

    // Ожидание элемента с сообщением об ошибке
    await page.waitForSelector('#error-message');

    // Получение текста сообщения об ошибке
    const errorMessage = await page.$eval('#error-message', element => element.textContent);
    expect(errorMessage).toBe('Пожалуйста, введите корректный email!');
  });
});