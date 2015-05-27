$.get('morse.scxml', function(scxml) {
  var rect = document.getElementById("rect");
  var scxmlDoc = (new DOMParser()).parseFromString(scxml, "application/xml");

  var layout = new forceLayout.Layout({
    parent: document.getElementById('viz'),
    doc: scxmlDoc
  });
  layout.fit();

  scion.documentStringToModel(scxml, function(err, model) {

    if(err) throw err;

    var interpreter = new scion.SCXML(model);

    interpreter.registerListener({
      onEntry: function(stateId) { layout.highlightState(stateId, true); },
      onExit: function(stateId) { layout.highlightState(stateId, false); },
    });

    interpreter.start();

    $('#button').mousedown(function(e) {
      e.preventDefault();
      interpreter.gen({name: 'device.press'});
    });

    $('#button').mouseup(function(e) {
      e.preventDefault();
      interpreter.gen({name: 'device.release'});
    });
  });
});
