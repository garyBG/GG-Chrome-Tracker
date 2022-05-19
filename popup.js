// document.addEventListener('DOMContentLoaded', async() => {
//     const linksList = document.getElementById('linksList');
//     const url = 'https://docs.google.com/spreadsheets/d/1KMhRhOAtiJsZ10OOj_k3uB_sXEjP9G7kc64qRmR1rqc/edit';
//     try {
//         const res = await fetch (url);
//         const videos = await res.json;
//     } catch (error) {
//         console.error(error);
//     }
//1im5Ix0FsgZLZLGbzqmwzXl5N08emgwdi;
//Event Listeners 
//create-todo : create todo button opens new-item
//new-item : if button pressed save and hide




document.querySelector('.create-todo').addEventListener('click', function () {
  document.querySelector('.new-item').style.display = 'block';
  document.querySelector('.close-todo').style.display = 'inline-block';

});



document.querySelector('.new-item button').addEventListener('click', function () {
  var itemName = document.querySelector('.new-item input').value;
  if (itemName != '') {
    var itemsStorage = localStorage.getItem('todo-items');
    var itemsArr = JSON.parse(itemsStorage);
    itemsArr.push({ "item": itemName, "status": 0 });
    saveItems(itemsArr);
    fetchItems(); 
    document.querySelector('.new-item input').value = '';
  }
});
document.querySelector('.close-todo').addEventListener('click', function () {
  document.querySelector('.new-item input').value = '';
  document.querySelector('.new-item').style.display = 'none';
  document.querySelector('.close-todo').style.display = 'none';
});

function fetchItems() {

  const itemsList = document.querySelector('ul.todo-items');
  itemsList.innerHTML = '';
  var newItemHTML = '';
  try {
    var itemsStorage = localStorage.getItem('todo-items');
    var itemsArr = JSON.parse(itemsStorage);

    for (var i = 0; i < itemsArr.length; i++) {
      var status = '';
      if (itemsArr[i].status == 1) {
        status = 'class="done"';
      }
      newItemHTML += `<li data-itemindex="${i}" ${status}>
        <span class="item">${itemsArr[i].item}</span>
        <div class = "buttons"><span class="itemComplete">✔</span><span class="itemDelete">🗑</span></div>
        </li>`;
    }

    itemsList.innerHTML = newItemHTML;

    var itemsListUL = document.querySelectorAll('ul li');
    for (var i = 0; i < itemsListUL.length; i++) {
      itemsListUL[i].querySelector('.itemComplete').addEventListener('click', function () {
        //
        var index = this.parentNode.parentNode.dataset.itemindex;
        itemComplete(index);
      });
      itemsListUL[i].querySelector('.itemDelete').addEventListener('click', function () {
        //
        var index = this.parentNode.parentNode.dataset.itemindex;
        itemDelete(index);
      });
    }
  } catch (e) {
    //.
    //create a deafut item list..
  }

}

function itemComplete(index) {

  var itemsStorage = localStorage.getItem('todo-items');
  var itemsArr = JSON.parse(itemsStorage);

  itemsArr[index].status = 1;

  saveItems(itemsArr);

  document.querySelector('ul.todo-items li[data-itemindex="' + index + '"]').className = 'done';

}
function itemDelete(index) {

  var itemsStorage = localStorage.getItem('todo-items');
  var itemsArr = JSON.parse(itemsStorage);

  itemsArr.splice(index, 1);

  saveItems(itemsArr);

  document.querySelector('ul.todo-items li[data-itemindex="' + index + '"]').remove();

}

function saveItems(obj) {

  var string = JSON.stringify(obj);

  localStorage.setItem('todo-items', string);

}


fetchItems();