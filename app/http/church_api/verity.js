const cheerio = require('react-native-cheerio');

export async function Verity() {
    try {
        // Fetch the HTML content of the page
        const response = await fetch('https://veritybaptist.com/sermons-1/');
        const html = await response.text();

        // Load the HTML into Cheerio
        const $ = cheerio.load(html);

        const sermons = [];

        // Select the sermon entries (adjust the selector based on the actual HTML structure)
        $('table tbody tr').each((i, row) => {
            const cells = $(row).find('td');
            if (cells.length > 0) {
                const sermon = {
                    church: 'Verity',
                    date: ($(cells[0]).text().trim()) + ", " + ( $(cells[1]).text().trim()),
                    name: $(cells[2]).text().trim(),
                    pastor: $(cells[3]).text().trim(),
                    link: $(cells[2]).find('a').attr('href') || null // Assuming the audio link is in the title cell
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
