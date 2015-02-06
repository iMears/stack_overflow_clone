$(document).ready(function(){
  bindEvents();
});

function bindEvents() {
  $('#new-question-form').on("submit", insertQuestion);
  // console.log("IN bind events");
  $('#new-answer-form').on("submit", insertAnswer);
}

//--------------------------Insert Question---------------------------------------------

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
      console.log(response)
    }
  });
}

function buildQuestion(question_obj) {
  var template = $(".append-question").html();
  var newQuestTemplate = Handlebars.compile(template);
  var resultHTML = newQuestTemplate({"question_id": question_obj.id, "title": question_obj.title, "content": question_obj.content});
  return $(resultHTML)
}

//------------------------Insert Answer------------------------------

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
      console.log(response)
    }
  });
}

function buildAnswer(answer_obj) {
  console.log(answer_obj)
  var template = $(".append-answer").html();
  var newAnswerTemplate = Handlebars.compile(template);
  var resultHTML = newAnswerTemplate({"question_id": answer_obj.question_id, "answer_id": answer_obj.id, "title": answer_obj.title, "content": answer_obj.content});
  return $(resultHTML)
}
