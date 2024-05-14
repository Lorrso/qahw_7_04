let page;

describe("Github page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });
  
  afterEach(() => {
    page.close();
  });
  
  test("The h1 header content", async () => {
    jest.setTimeout(15 * 1000);
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title = await page.title();
    expect(title).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  });

  test("The first link attribute", async () => {
    jest.setTimeout(20 * 1000);
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    jest.setTimeout(25 * 1000);
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("\n  Get started with Team\n  \n  \n")
  });
});

describe("Other Github page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/organizations/enterprise_plan?ref_cta=Start%2520a%2520trial&ref_loc=user_drawer_side_panel&ref_page=Header+Avatar");
  });
  
  afterEach(() => {
    page.close();
  });

  test("The h1 header content", async () => {
    jest.setTimeout(20 * 1000);
    await page.waitForSelector('h1');
    const title = await page.title();
    expect(title).toEqual('Choose an Enterprise plan · GitHub');
  });

  test("The first link attribute", async () => {
    jest.setTimeout(25 * 1000);
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains navigation button for enterprise cloud", async () => {
    jest.setTimeout(15 * 1000);
    const btnSelector = "h2[class='mb-1 h5-mktg text-center']";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Enterprise Cloud")
  });
});