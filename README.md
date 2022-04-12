# PINK TAX APPLICATION: CS497 FINAL PROJECT

## Overview 
Pink Tax is the concept of discriminatory pricing on products that are typically targeted towards women. This price gap is often seen in personal care products such as razors and shaving cream, but also includes services such as haircuts, jeans and other clothes and even toys. 

Our goal was to create a web application that makes it easier to show the discrepancies in prices between men and women products. It starts off by scraping Canadian stores such as Walmart, Shoppers, The Real Canadian Superstore and Sobeys for a given item, and categorizes who the product was targeted towards. It then averages the prices of these products for men and women, and if there is a large discrepancy, creates tweets highlighting the issue and tries to put pressure on the manufacturer to stop their practices. 

## Implementation 
The web application was created in a Node.js and React stack. It consists of three major components: 

The Scraper: The web scraper is called by the backend with a product phrase, and prepends it with the phrases “men” and “women” (we found this to be the best way to categorize products, since each store’s recommendation system ensures this provides the most accurate results). Using the puppeteer library, it then accesses websites for the aforementioned online stores and gets all the results, including the brand name, product name, image url and price for each product

The Backend: The backend facilitates search requests in the frontend, calls the scraper to get product prices in real time, calculates the average prices for each product type and the top 10 products based on price, and sends all this information back to the frontend to be displayed. The backend is also responsible for creating the tweets in case a huge discrepancy is found

The Frontend: The frontend has a search tab to search for any product, and then displays the results in 3 sections: the top 10 products based on price, the male targeted products and the female targeted products, all with their average prices

## Future Features
Differentiating between premium and non-premium items would provide a more holistic view of average prices 
Tagging the manufacturers and retailers selling the product would be a next step for the tweets 
