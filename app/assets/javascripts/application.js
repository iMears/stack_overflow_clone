// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
$(document).ready(function(){
  bindEvents();
});

function bindEvents() {
  $('#new-question-form').on("submit", insertQuestion );
  $('#new-answer-form').on("submit", insertAnswer );
}

function insertQuestion(event) {
  event.preventDefault();
  var url = this.action;
  var form_input = $(this).serialize();
  $.ajax( {
    url: url,
    type: 'POST',
    data: form_input,
    success: function(response) {
      $(".question-list").append(
          buildQuestion(response)
        )
    },
    error: function(response) {
      console.log("got here")
      console.log(response)
    }
  });
}

function buildQuestion(question_obj) {
  var $template = $(".append-question");
  var title = question_obj.title
  var content = question_obj.content
  $template.find('h3').html('<a href="/questions/' + question_obj.id + '">' + title + '</a>');
  $template.find('p').text(content);
  // $template.find('.vote-buttons').html(
  //   '<button><a href="/questions/' + question_obj.id + '/upvotes">"Up Vote"</button>'
  //   )
  $(".question-list").append($template);
}

//---------------------------------------------------------------
//Insert Answer
function insertAnswer(event) {
  event.preventDefault();
  var url = this.action;
  var form_input = $(this).serialize();
  $.ajax( {
    url: url,
    type: 'POST',
    data: form_input,
    success: function(response) {
      $(".answer-list").append(
          buildAnswer(response)
        )
    },
    error: function(response) {
      console.log("got here")
      console.log(response)
    }
  });
}

function buildAnswer(answer_obj) {
  var $template = $(".append-answer");
  var title = answer_obj.title
  var content = answer_obj.content
  $template.find('h5').text(title)
  $template.find('p').text(content);
  // $template.find('.vote-buttons').html(
  //   '<button><a href="/questions/' + question_obj.id + '/upvotes">"Up Vote"</button>'
  //   )
  $(".answer-list").append($template);
}



