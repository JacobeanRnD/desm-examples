var rect = document.getElementById("rect");

var scxmlDocString = document.getElementById('scxmlDoc').textContent;
var scxmlDoc = (new DOMParser()).parseFromString(scxmlDocString, "application/xml");

var layout = new forceLayout.Layout({
  parent: document.getElementById('viz'),
  doc: scxmlDoc
});
layout.fit();


scion.documentStringToModel(scxmlDocString, function(err, model) {

  if(err) throw err;

  //instantiate the interpreter
  var interpreter = new scion.SCXML(model);

  interpreter.registerListener({
    onEntry: function(stateId) { layout.highlightState(stateId, true); },
    onExit: function(stateId) { layout.highlightState(stateId, false); },
  });

  //start the interpreter
  interpreter.start();

  //send the init event
  interpreter.gen({name: "init", data: rect});

  function handleEvent(e) {
    e.preventDefault();
    interpreter.gen({name: e.type, data: e});
  }

  //connect all relevant event listeners
  $(rect).mousedown(handleEvent);
  $(document.documentElement).bind("mouseup mousemove", handleEvent);
});
