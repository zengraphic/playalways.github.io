//======================================//
//======= COMPONENTE UI GENERICO =======//
//======================================//

var TweetBox = React.createClass({
  render: function() {
    return (
      <div>
        Hello World!
      </div>
    );
  }
});
//======================================//
//=========== CAMBIAMENTO ==============//
//======================================//
  handleChange: function(event) {
    console.log(event.target.value);
  }
 //=====================================//
//===== INIZIALIZZA IL COMPONENTE ======//
//======================================//
  getInitialState: function() {
    return {
      text: ""
    }
}
//======================================//
//=========== AGGANGIA AL DOM ==========//
//======================================//

ReactDOM.render(
  <TweetBox />,
  document.getElementById("container")
);

//======================================//
//========= AGGIUNTA DI CLASSI =========//
//======================================//
return (
  <div className="well clearfix">
    <textarea className="form-control"></textarea>
    <br/>
    <button className="btn btn-primary pull-right">Tweet</button>
  </div>
);

//======================================//
//========= JQUERY BUTTON TO REACT =====//
//======================================//
// Initially disable the button
$("button").prop("disabled", true);

// When the value of the text area changes...
$("textarea").on("input", function() {
  // If there's at least one character...
  if ($(this).val().length > 0) {
    // Enable the button.
    $("button").prop("disabled", false);
  } else {
    // Else, disable the button.
    $("button").prop("disabled", true);
  }
});

// REACT $("textarea").on("input", function() {
<textarea className="form-control"
          onChange={this.handleChange}></textarea>