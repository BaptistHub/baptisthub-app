const cheerio = require('react-native-cheerio');


export async function first_works() {
    try {
        // Fetch the HTML content of the page
        const response = await fetch('https://pastormejiasermons.allthepreaching.com/');
        const html = await response.text();

        // Load the HTML into Cheerio
        const $ = cheerio.load(html);

        const sermons = [];

        // Select the sermon entries (adjust the selector based on the actual HTML structure)
        $('.simple').each((i, row) => {

            const cells = $(row).find('li');
            cells.each((i, serm) => {
                sermons.push({
                    church: 'First works',
                    pastor: 'Pastor Bruce Mejia',
                    name : $(serm).text(),
                    link: $(serm).find('a').attr('href') || null, // Assuming the audio link is in the title cell
                    time: '',
                    date: ''
                });
            });
        });

        return sermons;

    } catch (error) {
        console.error('Error fetching sermons:', error);
        return [];
    }
}