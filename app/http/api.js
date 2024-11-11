import { faithful_word } from "./church_api/fwbc";
import { Verity } from "./church_api/verity";
import { Stedfast } from "./church_api/stedfast";
import { first_works } from "./church_api/first_works";

async function getPastors() {
    throw new Error("Method not implemented.");
}

async function getPage(url) {
    try {
        // Make the GET request
        const response = await fetch('http://www.faithfulwordbaptist.org/page5.html');
        const html = await response.text();
        // Load the HTML into cheerio
        const $ = cheerio.load(html);
    } catch (error) {
        console.error('Error fetching sermons:', error);
    }
}

export async function scrapeSermons(church) {
    try {
        // Make the GET request
        switch (church) {
            case 'Verity':
                return Verity();
            case 'Faithful Word':
                return faithful_word();
            case 'Stedfast':
                return Stedfast();
            case 'First works':
                return first_works();
            default:
                return [];
        } 

        return sermons;

    } catch (error) {
        console.error('Error fetching sermons:', error);
        return [];
    }
}


