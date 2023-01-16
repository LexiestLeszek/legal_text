// Use the require function to include the necessary libraries
var PDFParser = require('./pdf.min.js');
var nlp = require('./compromise.min.js');

// Listen for when a PDF document is opened in Chrome
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  // Check if the tab is a PDF document
  if (tab.url.endsWith('.pdf')) {
    // Extract the text from the PDF document
    var pdfParser = new PDFParser();
    pdfParser.on('pdfParser_dataReady', function(data) {
      var pdfText = data.data.text;

      // Use Compromise JS to run an NLP analysis on the text
      var doc = nlp(pdfText);

      // Identify logical mistakes and discrepancies in the text
      var mistakes = doc.sentences().match('#Incorrect').out('array');

      // Identify key subjects, actions, and objects in the text
      var subjects = doc.people().out('array');
      var actions = doc.verbs().out('array');
      var objects = doc.nouns().out('array');

      // Send the results to the popup script
      chrome.runtime.sendMessage({
        type: 'analysisResults',
        mistakes: mistakes,
        subjects: subjects,
        actions: actions,
        objects: objects
      });
    });
    pdfParser.loadPDF(tab.url);
  }
});
