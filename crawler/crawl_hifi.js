var Crawler = require("crawler");
var url = require('url');
var fs = require('fs');

var products = [];

// REGEX used for parsing the data
var listPriceReg = /List Price:([0-9,]+)/;
var ourPriceReg = /Our Price :JPY ([0-9,]+)/;
var genreReg = /Genre:([0-9a-zA-z ()]+)/;
var arrivalDateReg = /Arrival date:(\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d)/;


// Setup the crawler
var crawler = new Crawler({

    // Make it fast
    maxConnections: 10,

    callback: function (error, result, $) {

        // prevents some weird error...
        if (!$) return;

        // fetch all tables
        $('table').each(function (index, table) {

            // one of those tables
            var $table = $(table); 

            // check that it is the table we are looking for
            if ($table.attr('bordercolor') !== '#111111' || $table.attr('width') !== '650') {
                return;
            }

            var rows = $table.children();
            var cur = rows.first();
            var i;

            // The assumption is that their data comes in sets of 3 tr elements
            for (i = 0; i < rows.length; i += 3) {
                var title = cur;
                cur = cur.next();
                var body = cur;
                cur = cur.next();
                cur = cur.next();

                var product = {};

                var bold = title.find('b').first();
                product.href = bold.parent().parent().attr('href');
                product.name = bold.html();

                var content = body.children().eq(1).find('font').html();

                var listPriceMatch = content.match(listPriceReg);
                if (listPriceMatch) {
                    product.listPrice = listPriceMatch[1].replace(',', '');
                }

                var ourPriceMatch = content.match(ourPriceReg);
                if (ourPriceMatch) {
                    product.ourPrice = ourPriceMatch[1].replace(',', '');
                }

                var genrePriceMatch = content.match(genreReg);
                if (genrePriceMatch) {
                    product.genre = genrePriceMatch[1];
                }

                var arrivalDateMatch = content.match(arrivalDateReg);
                if (arrivalDateMatch) {
                    product.arrival_date = arrivalDateMatch[1];
                }

                products.push(product);
            }
        });
    },

    // When done crawling, write the output to a file
    onDrain: function () {
        console.log('Crawling finish.  Total products found: ', products.length);
        fs.writeFile('hifi.json', JSON.stringify(products, undefined, 4), function (err) {
            console.log('Done writing products');
        });
    },

    skipDuplicates: true
});

// Crawl all possible pages
for (var i = 0; i < 6000; i += 50) {
    crawler.queue('http://www.hifido.co.jp/KW/G1/P0/A10/E/' + i + '-50/S0/');
}
