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
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    // Check If Author Field Is Null or Not
    if (!quote.author) {
        authorText.textContent = "Unknown"
    } else {
        authorText.textContent = quote.author;
    }

    // Check Quote Length To Determine Styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Tweet A Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// EventListener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
newQuote();