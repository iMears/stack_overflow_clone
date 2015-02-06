$(document).ready(function(){
  bindEvents();
});

function bindEvents() {
  $('#new-question-form').on("submit", insertQuestion);
  $('#new-answer-form').on("submit", insertAnswer);

  $('.question-list').on("click", ".upvote", incrementVote);
  $('.question-list').on("click", ".downvote", decrementVote);
}

//--------------------------Increment Vote--------------------------

function incrementVote(event) {
  event.preventDefault();
  var listItem = event.target;
  var id = $(listItem).attr("id");
  var form_input = $(this).serialize();
  $.ajax( {
    url: this.parentElement.action,
    type: 'POST',
    success: function(response) {
      $("p[id="+response.id+"]").text("votes: " + response.votes);
    },
    error: function(response) {
      console.log(response)
    }
  });
}

//--------------------------Decrement Vote--------------------------

function decrementVote(event) {
  event.preventDefault();
  var listItem = event.target;
  var id = $(listItem).attr("id");
  var form_input = $(this).serialize();
  $.ajax( {
    url: this.parentElement.action,
    type: 'POST',
    success: function(response) {
      $("p[id="+response.id+"]").text("votes: " + response.votes);
    },
    error: function(response) {
      console.log(response)
    }
  });
}

//--------------------------Insert Question--------------------------

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
          // var parsedContent = parseContent(response);
          buildQuestion(response, parseContent(response))
        )
    },
    error: function(response) {
      console.log(response)
    }
  });
}

function buildQuestion(question_obj, parsedContent) {
  var template = $(".append-question").html();
  var newQuestTemplate = Handlebars.compile(template);
  var resultHTML = newQuestTemplate({"question_id": question_obj.id, "title": parsedContent[0], "content": question_obj.content, "votes": question_obj.votes});
  return $(resultHTML);
}

//---------------------------Insert Answer-------------------------

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
  var template = $(".append-answer").html();
  var newAnswerTemplate = Handlebars.compile(template);
  var resultHTML = newAnswerTemplate({"question_id": answer_obj.question_id, "answer_id": answer_obj.id, "title": answer_obj.title, "content": answer_obj.content});
  return $(resultHTML)
}

//---------------------------Parse Content-------------------------
function parseContent(contentObject) {
  var title = contentObject.title;
  console.log(title)
  // var content = contentObject.content;
  // console.log(content)

  //Grab the word with astericks
  var italString = title.match(/\*[a-z]+\*/);
  var newTitle = "<strong>" + italString.substring(1,italString.length-1) + "</strong>";

  //remove astericks from string
  //prepend an open italicize tag to the beginning of the string
  //append a closing italicize tag to the beginning of the string
  return [newTitle]
}



