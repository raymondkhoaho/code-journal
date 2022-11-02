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
  newLi.setAttribute('data-entry-id', formObject.entryId);
  $ulParent.prepend(newLi);
  viewSwap('entries');
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

  var rowTextDiv = document.createElement('div');
  rowTextDiv.setAttribute('class', 'row between-center');
  columnTextDiv.appendChild(rowTextDiv);

  var newH2 = document.createElement('h2');
  newH2.textContent = entry.title;
  rowTextDiv.appendChild(newH2);

  var newA = document.createElement('a');
  newA.setAttribute('class', 'edit-icon');
  newA.setAttribute('href', '#');
  rowTextDiv.appendChild(newA);

  var newIcon = document.createElement('i');
  newIcon.setAttribute('class', 'fa-solid fa-pen');
  newA.appendChild(newIcon);

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
    entry.setAttribute('data-entry-id', data.entries[i].entryId);
    $ulParent.appendChild(entry);
  }

  if (data.view === 'entries') {
    $viewNodes[0].setAttribute('class', 'view container hidden');
    $viewNodes[1].setAttribute('class', 'view container');
  }
}

document.addEventListener('DOMContentLoaded', DOMContentLoaded);

// View Swap and Click Function

var $viewNodes = document.querySelectorAll('.view');

function viewSwap(showView) {
  for (var i = 0; i < $viewNodes.length; i++) {
    if ($viewNodes[i].getAttribute('data-view') === showView) {
      $viewNodes[i].setAttribute('class', 'view container');
    } else {
      $viewNodes[i].setAttribute('class', 'view container hidden');
    }
  }
  data.view = showView;
}

var $newAnchor = document.querySelector('.new-button');
var $entriesAnchor = document.querySelector('.entries-link');

function clickAnchor(event) {
  var viewSwapInput = event.target.getAttribute('data-view');
  viewSwap(viewSwapInput);
  if (viewSwapInput === 'entry-form') {
    h1Text.textContent = 'New Entry';
  }
}

$newAnchor.addEventListener('click', clickAnchor);
$entriesAnchor.addEventListener('click', clickAnchor);

// View Edit Form

var h1Text = document.querySelector('.entry-heading');

function editClick(event) {
  if (event.target.tagName === 'I') {
    viewSwap('entry-form');
    h1Text.textContent = 'Edit Entry';
  }
  var closestLi = event.target.closest('li');
  var liEntryId = closestLi.getAttribute('data-entry-id');
  for (var j = 0; j < data.entries.length; j++) {
    if (data.entries[j].entryId.toString() === liEntryId) {
      data.editing = data.entries[j];
      break;
    }
  }
}
$ulParent.addEventListener('click', editClick);
