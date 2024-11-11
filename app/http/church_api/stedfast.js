const cheerio = require('react-native-cheerio');

export async function Stedfast() {
    try {
        // Fetch the HTML content of the page
        const response = await fetch('https://sbckjv.com/preaching/');
        const html = await response.text();

        // Load the HTML into Cheerio
        const $ = cheerio.load(html);

        const sermons = [];

        // Select the sermon entries (adjust the selector based on the actual HTML structure)
        $('table tbody tr').each((i, row) => {
            const cells = $(row).find('td');
            if (cells.length > 0) {
                const sermon = {
                    church: 'Stedfast',
                    date: $(cells[1]).text().trim(),
                    time: $(cells[3]).text().trim(),
                    name: $(cells[4]).text().trim(),
                    pastor: $(cells[9]).text().trim(),
                    link: $(cells[6]).find('a').attr('href') || null // Assuming the audio link is in the title cell
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