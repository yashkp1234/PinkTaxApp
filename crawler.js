const puppeteer = require("puppeteer");

const args = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-infobars",
  "--window-position=0,0",
  "--ignore-certifcate-errors",
  "--ignore-certifcate-errors-spki-list",
  '--user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36"',
];

process.setMaxListeners(0);

// get data from shoppers
async function getShoppers(key, gender) {
  try {
    const URL =
      "https://shop.shoppersdrugmart.ca/search?text=" +
      key +
      "&sort=relevance&page=0&q=" +
      key;
    const browser = await puppeteer.launch({ headless: true, args });
    var page = await browser.newPage();
    await page.goto(URL);
    let urls = page.evaluate((gender) => {
      let elements = Array.from(
        document.querySelectorAll("[class*=plp__productTileWrapper]")
      );
      let links = elements.map((element) => {
        let brand_name = element.querySelector("[class*=plp__brandName]");
        let product_name = element.querySelector("[class*=plp__productName_]");
        let imageURL = element.querySelector("[class*=plp__productTileImage_]");
        let price = element.querySelector('[data-testid="price-container"]');
        let other = price.querySelector("span");
        return {
          url: element?.href,
          title: brand_name.ariaLabel + " " + product_name.ariaLabel,
          price: price.innerHTML?.startsWith("<span")
            ? other?.innerHTML
            : price?.innerHTML.substring(0, price.innerHTML.indexOf("<span")),
          imageURL: imageURL?.src,
          gender,
        };
      });
      return links.filter((a) => a.price != null);
    }, gender);
    await browser.close();
    return urls;
  } catch (error) {
    console.error(error);
  }
}

// get data from real canadian superstore
async function getSuperstore(key, gender) {
  try {
    const URL =
      "https://www.realcanadiansuperstore.ca/search?search-bar=" + key;
    const browser = await puppeteer.launch({ headless: true, args });
    const page = await browser.newPage();
    await page.goto(URL);
    await page.waitForTimeout(3000);
    let urls = await page.evaluate((gender) => {
      let elements = Array.from(
        document.querySelectorAll("[class*=product-tracking]")
      ).slice(0, 15);
      let links = elements.map((element) => {
        let metadata = JSON.parse(
          element.getAttribute("data-track-products-array")
        )[0];
        let url = element.querySelector(
          "[class*=product-tile__details__info__name__link]"
        );
        let imageURL = element.querySelector("[class*=responsive-image]");
        let pricePerUnit = element.querySelector("[class*=price__value]");
        return {
          url: url.href,
          title: metadata["productBrand"] + " " + metadata["productName"],
          price: pricePerUnit ? pricePerUnit.outerText : null,
          imageURL: imageURL
            ? imageURL?.src
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm_ogdKMepmx-3xG1_9LFLzL9QB4G8DYaKfw&usqp=CAU",
          gender,
        };
      });
      return links.filter((a) => a.price != null);
    }, gender);
    await browser.close();
    return urls;
  } catch (error) {
    console.error(error);
  }
}

// get data from voila/sobeys
async function getSobeys(key, gender) {
  try {
    const URL = "https://voila.ca/products/search?q=" + key;
    const browser = await puppeteer.launch({ headless: true, args });
    const page = await browser.newPage();
    await page.goto(URL);
    await page.waitForTimeout(2000);
    let urls = await page.evaluate((gender) => {
      let elements = Array.from(
        document.querySelectorAll("[data-test*=fop-wrapper]")
      );
      let links = elements.map((elementHigh) => {
        let element = elementHigh.querySelector('[data-test="fop-body"]');
        let product = element.querySelector('[data-test*="fop-product-link"]');
        let price = element.querySelector('[data-test="fop-price"]');
        let ppu = element
          .querySelector('[data-test="fop-size"')
          .getElementsByTagName("span")[1];
        let imageURL = elementHigh.querySelector(
          '[data-synthetics="bop-link"] img'
        );

        return {
          url: product?.href,
          title: product?.innerHTML,
          price: ppu ? ppu.outerText.split(" ")[0].substring(1) : null,
          imageURL: imageURL
            ? imageURL?.src
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm_ogdKMepmx-3xG1_9LFLzL9QB4G8DYaKfw&usqp=CAU",
          gender,
        };
      });
      return links.filter((a) => a.price != null);
    }, gender);
    await browser.close();
    return urls;
  } catch (error) {
    console.error(error);
  }
}

async function letsCrawlGendered(key, gender) {
  phrase = `${gender} ${key}`;

  let result = await Promise.all([
    getShoppers(phrase, gender),
    getSuperstore(phrase, gender),
    getSobeys(phrase, gender),
  ]);

  return [].concat(...result);
}

async function letsCrawl(key) {
  console.log(`Started query for ${key}`);
  toReturn = {};
  personPhrases = ["Mens ", "Womens "];
  const results = await Promise.all([
    letsCrawlGendered(key, personPhrases[0]),
    letsCrawlGendered(key, personPhrases[1]),
  ]);
  console.log(`Executed query for ${key}`);
  return {
    men: results[0].filter((x) => x !== undefined),
    women: results[1].filter((x) => x !== undefined),
  };
}

module.exports.letsCrawl = letsCrawl;
