const cheerio = require('react-native-cheerio');

export async function faithful_word() {
    try {
        // Make the GET request
        const response = await fetch('http://www.faithfulwordbaptist.org/page5.html');
        const html = await response.text();
        // Load the HTML into cheerio
        const $ = cheerio.load(html);
        const sermons = [];
        // Find the table and process each row
        $('table tr').slice(1).each((i, row) => {
            const cols = $(row).find('td');
            if (cols.length >= 4) {
                const sermon = {
                    church: 'Faithful Word',
                    date: $(cols[0]).text().trim(),
                    name: $(cols[1]).text().trim(),
                    pastor: $(cols[3]).text().trim(),
                    link: $(cols[2]).find('a').map((i, el) => $(el).attr('href')).get()[0]
                };
                sermons.push(sermon);
            }
        });

        return sermons;

    } catch (error) {
        console.error('Error fetching sermons:', error);
        return [];
    }
}