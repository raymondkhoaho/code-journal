// Photo Preview function

var $imageInput = document.querySelector('.photoUrl');
var $imgView = document.querySelector('.images');

function photoUrlInput(event) {
  $imgView.setAttribute('src', $imageInput.value);
}

$imageInput.addEventListener('input', photoUrlInput);

// Submit Form Event
var $submitForm = document.querySelector('.entry-form');

function submitEvent(event) {
  var formObject = {};

  event.preventDefault();
  formObject.title = $submitForm.elements.title.value;
  formObject.photoUrl = $submitForm.elements['photo-url'].value;
  formObject.notes = $submitForm.elements.notes.value;
  formObject.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(formObject);
  $imgView.setAttribute('src', 'images/placeholder-image-square.jpg');
  $submitForm.reset();
  var newLi = renderEntry(formObject);
  $ulParent.prepend(newLi);
  viewSwap(event);
}

$submitForm.addEventListener('submit', submitEvent);

// Create DOM Tree Function

function renderEntry(entry) {
  var entryLi = document.createElement('li');

  var rowDiv = document.createElement('div');
  rowDiv.setAttribute('class', 'row');
  entryLi.appendChild(rowDiv);

  var columnImgDiv = document.createElement('div');
  columnImgDiv.setAttribute('class', 'column-half');
  rowDiv.appendChild(columnImgDiv);

  var newImg = document.createElement('img');
  newImg.setAttribute('src', entry.photoUrl);
  columnImgDiv.appendChild(newImg);

  var columnTextDiv = document.createElement('div');
  columnTextDiv.setAttribute('class', 'column-half');
  rowDiv.appendChild(columnTextDiv);

  var newH2 = document.createElement('h2');
  newH2.textContent = entry.title;
  columnTextDiv.appendChild(newH2);

  var newP = document.createElement('p');
  newP.textContent = entry.notes;
  columnTextDiv.appendChild(newP);

  return entryLi;
}

// DOM Content Loaded Event: DOM Tree Loop and Reload Page

var $ulParent = document.querySelector('.entry');

function DOMContentLoaded(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var entry = renderEntry(data.entries[i]);
    $ulParent.appendChild(entry);
  }

  if (data.view === 'entries') {
    $viewNodes[0].setAttribute('class', 'view container hidden');
    $viewNodes[1].setAttribute('class', 'view container');
  }
}

document.addEventListener('DOMContentLoaded', DOMContentLoaded);

// View Swapping Function/Loop

var $viewNodes = document.querySelectorAll('.view');

function viewSwap(event) {
  var $dataView = event.target.getAttribute('data-view');
  if (event.target.matches('.tab')) {
    for (var i = 0; i < $viewNodes.length; i++) {
      if ($viewNodes[i].getAttribute('data-view') === $dataView) {
        $viewNodes[i].setAttribute('class', 'view container');
      } else {
        $viewNodes[i].setAttribute('class', 'view container hidden');
      }
    }
    data.view = $dataView;
  }
}

document.addEventListener('click', viewSwap);
