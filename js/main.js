var $imageInput = document.querySelector('.photoUrl');
var $imgView = document.querySelector('.images');
var $submitForm = document.querySelector('.entry-form');
var $entriesView = document.querySelector('#entriesView');
var $formView = document.querySelector('#formView');

function photoUrlInput(event) {
  $imgView.setAttribute('src', $imageInput.value);
}

function submitEvent(event) {
  // debugger;
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

  prependDom(formObject);

  $formView.setAttribute('class', 'view container hidden');
  $entriesView.setAttribute('class', 'view container');
}

$imageInput.addEventListener('input', photoUrlInput);
$submitForm.addEventListener('submit', submitEvent);

// prepend to dom

function prependDom(formObject) {
  var newLi = renderEntry(formObject);
  $ulParent.prepend(newLi);
}

// DOM tree for list item

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

var $ulParent = document.querySelector('.entry');

function domLoaded(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var entry = renderEntry(data.entries[i]);
    $ulParent.appendChild(entry);
  }
}

document.addEventListener('DOMContentLoaded', domLoaded);

// view swapping

var $tabContainer = document.querySelector('.tab-container');
var $viewNodes = document.querySelectorAll('.view');
var $newButton = document.querySelector('.new-button');

function clickFunction(event) {
  if (event.target.matches('.tab')) {
    var $dataView = event.target.getAttribute('data-view');
    for (var i = 0; i < $viewNodes.length; i++) {
      if ($viewNodes[i].getAttribute('data-view') === $dataView) {
        $viewNodes[i].setAttribute('class', 'view container');
      } else {
        $viewNodes[i].setAttribute('class', 'view container hidden');
      }
    }
  }
}

$tabContainer.addEventListener('click', clickFunction);
$newButton.addEventListener('click', clickFunction);
