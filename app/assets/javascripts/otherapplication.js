$(document).ready(function(){
  bindEvents();
  console.log("in document ready");
});

function bindEvents() {
  $('#new-question-form').on("submit", insertQuestion);
  console.log("IN bind events");
  $('#new-answer-form').on("submit", insertAnswer);
}

//---------------------------------------------------------------------------
//Insert Question:
function insertQuestion(event) {
  console.log("EVENT:..................................")
  console.log(event)
  console.log("running..............................")
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
  var template = $(".append-question").html();
  var newQuestTemplate = Handlebars.compile(template);
  //var data = {"question_id": question_obj.id, "title": question_obj.title, "content": question_obj.content}
  var resultHTML = newQuestTemplate({"question_id": question_obj.id, "title": question_obj.title, "content": question_obj.content});
  //$(".question-list").append(resultHTML);
  // debugger;
  return $(resultHTML)

}


  // var title = question_obj.title
  // var content = question_obj.content
  // $template.find('h3').html('<a href="/questions/' + question_obj.id + '">' + title + '</a>');
  // $template.find('p').text(content);


   //Handlebars magic for the buttons
  // var sourceUpVote = "<form action=" + "/questions/{{question_id}}/upvotes" + "method='POST' class='btn btn-success btn-xs vote-btn'><button type='submit' form='form1' value='Up Vote'>Up Vote</button></form>";
  // var templateButton = Handlebars.compile(sourceUpVote);
  // var data = {question_id: question_obj.id};
  // var result = templateButton(data);
  // $('.vote-buttons').append(templateButton)
  // debugger;


//    var source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
//              "{{kids.length}} kids:</p>" +
//              "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";
// var template = Handlebars.compile(source);

// var data = { "name": "Alan", "hometown": "Somewhere, TX",
//              "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
// var result = template(data);



  // $template.find('.vote-buttons').html(
  //   '<button><a href="/questions/' + question_obj.id + '/upvotes">"Up Vote"</button>'
  //   )
  // $(".question-list").append($template);


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
  //Handlebars magic for the buttons
  // $template.find('.vote-buttons').html(
  //   '<button><a href="/questions/' + question_obj.id + '/upvotes">"Up Vote"</button>'
  //   )
  $(".answer-list").append($template);
}
