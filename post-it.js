var Board = function( selector ) {
  var $elem = $( selector );
  
  function initialize() {

    $elem.on('click', function(e){
      var left = e.offsetX
      var top = e.offsetY
      makeNote($elem, { top: top , left: left });
      makeNoteDraggable();
      makeNoteEditable();
      makeNoteClosable();
    })
  };

  initialize();
};

function makeNote(elem, position, content){
  var newPostIt = new PostIt(position, content);
  var $elem = $( elem );
  $elem.append(newPostIt.object);
  var allNotes = document.getElementsByClassName('post-it')
  var newDomElement = allNotes[allNotes.length-1];
  $( newDomElement ).css({
    "top" : position.top, 
    "left": position.left
  });
};

function makeNoteDraggable(){
  $('.post-it').draggable({handle: ".header"});
};

function makeNoteEditable(){
  $( ".post-it" ).on('click', function( event ) {
    event.stopPropagation();
  })

  $( ".post-it .content" ).on('click', function() {
    $(this).attr("contenteditable", "true")
  })

};

function makeNoteClosable(){
  $('.exit').on('click', function( event ){
    event.stopPropagation();
    $(this).closest('.post-it').remove();
  })
};

var PostIt = function(position, content) {
  var post_it_stuff = ' class="post-it" style="left:'+position.left+'; top:'+position.top+'";>' 
  var header_stuff = ' class="header"><span class="exit">X</span>'
  var content_stuff = ' class="content">'

  this.object = 
  "<div"+post_it_stuff+
    "<div"+header_stuff+"</div>"+
    "<div"+content_stuff+content+"</div>"
  "</div>"
};


function prepareBody(){
  $('body').attr({
    "id" : "board",
    "class" : "post_board"
  });
}

function makeNewBoard(){
  $('#new_board').on('click', function(e){
    e.stopPropagation();
    new Board('#board');
  })  
}


function loadBoards() {
  $('#load_samples').on('click', function(e){
    e.stopPropagation();
    $.each(SampleBoards, function(board_name, cards) { 
      $('#board_list').append("<li>"+board_name+"</li>")
    })
  loadCertainBoard();
  })
}


function loadCertainBoard() {
  $('#board_list li').on('click', function(e){
    var clickedBoardName = this.innerHTML;
    $.each( eval("SampleBoards."+clickedBoardName) , function(index, card) {
      makeNote('body', card.position, card.content);
    })
  })  
}

$(function() {
  loadBoards();
  // debugger;
  // prepareBody();
  // makeNewBoard();
});



// need to toggle other boards when clicking on a specific board while maintain previous board state

// populate sidebar with new board objects so that they can be clicked and toggled.

// need to be able to parse JSON data to display sample boards....
