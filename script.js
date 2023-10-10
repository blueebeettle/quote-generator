const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show New Quote
function newQuote() {
    loading();
    // Pick A Random Quote From apiQuotes Array
    const quote = apiQuotes;


    // Check If Author Field Is Null or Not
    if (!quote.originator.name) {
        authorText.textContent = "Unknown"
    } else {
        authorText.textContent = quote.originator.name;
    }

    // Check Quote Length To Determine Styling
    if (quote.content.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.content;

}


// Fetching Quotes From API
async function getQuote() {
    loading();
    const url = 'https://quotes15.p.rapidapi.com/quotes/random/?language_code=en';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0aecfec414msh60a333ea081bfd0p1f575cjsn940b4d039241',
            'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        apiQuotes = await response.json();
        console.log(apiQuotes);
        newQuote();
        complete();
    } catch (error) {
        alert('Cannot Load Data From Server, Please Try Again');
    }
}

// Tweet A Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// EventListener
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();