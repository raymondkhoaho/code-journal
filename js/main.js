// Photo Preview function

var $imageInput = document.querySelector('.photoUrl');
var $imgView = document.querySelector('.images');
var $textEdit = document.querySelector('#title');
var $notesEdit = document.querySelector('#notes');
var h1Text = document.querySelector('.entry-heading');
var $ulParent = document.querySelector('.entry');
var $newAnchor = document.querySelector('.new-button');
var $entriesAnchor = document.querySelector('.entries-link');
var $deleteButton = document.querySelector('.delete-button');
// var $confirmButton = document.querySelector('.confirm-button');
var $cancelButton = document.querySelector('.cancel-button');
var $modal = document.querySelector('.modal');
var $overlay = document.querySelector('.overlay');

function photoUrlInput(event) {
  $imgView.setAttribute('src', $imageInput.value);
}

$imageInput.addEventListener('input', photoUrlInput);
// Submit New/Edited Form Event

var $submitForm = document.querySelector('.entry-form');

function submitEvent(event) {
  var formObject = {};
  event.preventDefault();
  formObject.title = $submitForm.elements.title.value;
  formObject.photoUrl = $submitForm.elements['photo-url'].value;
  formObject.notes = $submitForm.elements.notes.value;
  if (data.editing === null) {
    formObject.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(formObject);
    var newLi = renderEntry(formObject);
    newLi.setAttribute('data-entry-id', formObject.entryId);
    $ulParent.prepend(newLi);
  } else {
    formObject.entryId = data.editing.entryId;
    for (var k = 0; k < data.entries.length; k++) {
      if (data.entries[k].entryId === formObject.entryId) {
        data.entries[k].title = $submitForm.elements.title.value;
        data.entries[k].photoUrl = $submitForm.elements['photo-url'].value;
        data.entries[k].notes = $submitForm.elements.notes.value;
        break;
      }
    }
    var $liNodes = document.querySelectorAll('li');
    var replaceLi = renderEntry(formObject);
    for (var l = 0; l < $liNodes.length; l++) {
      if ($liNodes[l].getAttribute('data-entry-id') === formObject.entryId.toString()) {
        $liNodes[l].replaceWith(replaceLi);
        break;
      }
    }
  }
  $imgView.setAttribute('src', 'images/placeholder-image-square.jpg');
  $submitForm.reset();
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

function clickAnchor(event) {
  var viewSwapInput = event.target.getAttribute('data-view');
  if (viewSwapInput === 'entry-form') {
    h1Text.textContent = 'New Entry';
    $imgView.setAttribute('src', 'images/placeholder-image-square.jpg');
    $textEdit.setAttribute('value', '');
    $imageInput.setAttribute('value', '');
    $notesEdit.textContent = '';
    $deleteButton.setAttribute('class', 'delete-button invisible');
  }
  data.editing = null;
  viewSwap(viewSwapInput);
}

$newAnchor.addEventListener('click', clickAnchor);
$entriesAnchor.addEventListener('click', clickAnchor);

// View Pre-populated Edit Form

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
      $imgView.setAttribute('src', data.editing.photoUrl);
      $textEdit.setAttribute('value', data.editing.title);
      $imageInput.setAttribute('value', data.editing.photoUrl);
      $notesEdit.textContent = data.editing.notes;
      $deleteButton.setAttribute('class', 'delete-button');
      break;
    }
  }
}

$ulParent.addEventListener('click', editClick);

// Delete Entry Function

function openModal(event) {
  $modal.setAttribute('class', 'modal');
  $overlay.setAttribute('class', 'overlay');
}

function closeModal(event) {
  $modal.setAttribute('class', 'modal hidden');
  $overlay.setAttribute('class', 'overlay hidden');
}

$deleteButton.addEventListener('click', openModal);
$cancelButton.addEventListener('click', closeModal);
