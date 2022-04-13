const crawler = require("./crawler.js");

function convertPriceToNum(a) {
  return Number(a.substring(0, 8).replace(/[^0-9.]+/g, ""));
}

function minObj(a, b) {
  const aPrice = convertPriceToNum(a.price);
  const bPrice = convertPriceToNum(b.price);
  if (aPrice < bPrice) {
    return -1;
  }
  if (aPrice > bPrice) {
    return 1;
  }
  return 0;
}

async function findMinimum(men, women) {
  const totalArray = men.concat(women);
  return totalArray.sort(minObj).slice(0, 10);
}

async function findAvg(a) {
  return (
    a.reduce(function (a, b) {
      return a + convertPriceToNum(b.price);
    }, 0) / a.length
  ).toFixed(2);
}

async function getProductsAndMetrics(product) {
  const { men, women } = await crawler.letsCrawl(product);
  const best10 = await findMinimum(men, women);
  const prices = await Promise.all([
    findAvg(men),
    findAvg(women),
    findAvg(best10),
  ]);

  return {
    maleData: men.sort(minObj),
    avgMalePrice: `$${prices[0]}`,
    femaleData: women.sort(minObj),
    avgFemalePrice: `$${prices[1]}`,
    bestData: best10.sort(minObj),
    avgBestPrice: `$${prices[2]}`,
  };
}

module.exports.getProductsAndMetrics = getProductsAndMetrics;
