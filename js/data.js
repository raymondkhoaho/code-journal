/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var $submitForm = document.querySelector('.entry-form');
$submitForm.addEventListener('submit', submitEvent);

function submitEvent(event) {
  var formObject = {};

  event.preventDefault();
  formObject.title = $submitForm.elements.title.value;
  formObject.photoUrl = $submitForm.elements['photo-url'].value;
  formObject.notes = $submitForm.elements.notes.value;
  formObject.nextEntryId = data.nextEntryId++;
  data.entries.push(formObject);
  $submitForm.reset();
}
