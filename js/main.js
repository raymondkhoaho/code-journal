var $imageInput = document.querySelector('.photoUrl');
var $imgView = document.querySelector('.images');

function photoUrlInput(event) {
  $imgView.setAttribute('src', $imageInput.value);
}

$imageInput.addEventListener('input', photoUrlInput);

var $submitForm = document.querySelector('.entry-form');
$submitForm.addEventListener('submit', submitEvent);

function submitEvent(event) {
  var formObject = {};

  event.preventDefault();
  formObject.title = $submitForm.elements.title.value;
  formObject.photoUrl = $submitForm.elements['photo-url'].value;
  formObject.notes = $submitForm.elements.notes.value;
  formObject.EntryId = data.nextEntryId++;
  data.entries.push(formObject);
  $imgView.setAttribute('src', 'images/placeholder-image-square.jpg');
  $submitForm.reset();
}
