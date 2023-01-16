// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(message) {
    if (message.type === 'analysisResults') {
      // Extract the results from the message
      var mistakes = message.mistakes;
      var subjects = message.subjects;
      var actions = message.actions;
      var objects = message.objects;
  
      // Display the results in the popup window
      var popup = document.getElementById('popup');
      var mistakesList = document.getElementById('mistakes-list');
      mistakes.forEach(function(mistake) {
        var item = document.createElement('li');
        item.innerText = mistake;
        mistakesList.appendChild(item);
      });
  
      var subjectsList = document.getElementById('subjects-list');
      subjects.forEach(function(subject) {
        var item = document.createElement('li');
        item.innerText = subject;
        subjectsList.appendChild(item);
      });
  
      var actionsList = document.getElementById('actions-list');
      actions.forEach(function(action) {
        var item = document.createElement('li');
        item.innerText = action;
        actionsList.appendChild(item);
      });
  
      var objectsList = document.getElementById('objects-list');
      objects.forEach(function(object) {
        var item = document.createElement('li');
        item.innerText = object;
        objectsList.appendChild(item);
      });
    }
  });
  