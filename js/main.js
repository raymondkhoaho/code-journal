var $imageInput = document.querySelector('.photoUrl');
var $imgView = document.querySelector('.images');
var $submitForm = document.querySelector('.entry-form');

function photoUrlInput(event) {
  $imgView.setAttribute('src', $imageInput.value);
}

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
}

$imageInput.addEventListener('input', photoUrlInput);
$submitForm.addEventListener('submit', submitEvent);

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

for (var i = 0; i < data.entries.length; i++) {
  var entry = renderEntry(data.entries[i]);
  $ulParent.appendChild(entry);
}

/*
<li>
  <div class="row">
    <div class="column-half">
      <img src="https://daily.jstor.org/wp-content/uploads/2019/10/ada_lovelace_pioneer_1050x700.jpg">
    </div>
    <div class="column-half">
      <h2>Ada Lovelace</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum dolores nisi nobis vitae at eos, reprehenderit quod neque libero. Autem distinctio nulla facere culpa omnis est esse quod, voluptate ab?</p>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est rem vitae facilis quasi voluptas exercitationem quisquam esse beatae, laborum eos incidunt quia veniam, magnam, repellat nam corrupti labore suscipit. Ab!</p>
    </div>
  </div>
</li>
*/
