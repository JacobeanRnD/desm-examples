'use strict';

class StateView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if(this.state.initial) {
      return <span>-</span>;
    }
    if(this.state.sending_dot) {
      return <span>dot</span>;
    }
    if(this.state.sending_dash) {
      return <span>dash</span>;
    }
    if(this.state.short_pause) {
      return <span>short pause</span>;
    }
    if(this.state.long_pause) {
      return <span>long pause</span>;
    }
    return <span>??</span>;
  }
}


class OutputView extends React.Component {
  render() {
    return <span>{this.state && this.state.log}</span>;
  }
}


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

    var stateView = React.render(<StateView />, document.getElementById('button'));
    var outputView = React.render(<OutputView />, document.getElementById('output'));

    var log = [];
    var output = function(value) {
      log.push(value);
      outputView.setState({log: log});
    };

    interpreter.registerListener({
      onEntry: function(stateId) {
        var newState = {};
        newState[stateId] = true;
        stateView.setState(newState);
        layout.highlightState(stateId, true);
        if(stateId == 'dot') { output('•'); }
        if(stateId == 'dash') { output('-'); }
      },
      onExit: function(stateId) {
        var newState = {};
        newState[stateId] = false;
        stateView.setState(newState);
        layout.highlightState(stateId, false);
      },
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
