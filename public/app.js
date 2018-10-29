
const render = function(outputElement, dataList) {
  let index = 0;
  dataList.forEach(e => {
    $(outputElement).append(`
        <div id='item-${index}' class="toDoItem">
        <input class="finishedBtn" type="checkbox">
        <span>${e.task}</span>
        <a href="#"><span id='deleteBtn-${
          index
        }' class="delete fas fa-times" value='${index}'></span></a>
        </div>`);
    index++;
  });
};

//add a new todo item to list
$(".fa-share").on("click", function(event) {
  event.preventDefault();
  $('#content').html('');
  const newInput = {task: $('#newInput').val().trim(), done: false};
  // const newInputList = [newInput];
  $.ajax({ url: '/api/todolist/', method: 'POST', data: newInput}).then(function(list){
    render("#content", list);
    $('#newInput').val('');
  });
});

//function to delete a todo item
$(document).ready(function() {
  $(document).on("click", ".delete", function(event) {
    event.preventDefault();
    //extract number from value property of clicked button
    const deleteId = $(this).attr("value");
    $(`#item-${deleteId}`).remove();
    $.ajax({ url: `/api/todolist/${deleteId}`, method: "DELETE" });
    $.ajax({ url: "/api/todolist/", method: "GET" }).then(function(data) {
      render("content", data);
    });
  });
});

$.ajax({ url: "/api/todolist", method: "GET" }).then(function(data) {
  render("#content", data);
});
