(function() {
'use strict';

var E = window.E = {};

E.tabPanel = function(items) {
  var $buttons = $('<ul class="nav nav-tabs" role="tablist">');
  var $bodies = $('<div class="tab-content">');
  var $tabPanel = $('<div role="tabpanel">');
  items.forEach(function(item, i) {
    var $button = $('<li role="presentation">');
    var $a = $('<a aria-controls="home" role="tab" data-toggle="tab">');
    $a.attr('href', '#tabPanelItem' + i).text(item.label).appendTo($button);
    var $body = $('<div role="tabpanel" class="tab-pane">');
    $body.attr('id', 'tabPanelItem' + i).html(item.content);

    if(i == 0) {
      $button.addClass('active');
      $body.addClass('active');
    }

    $button.appendTo($buttons);
    $body.appendTo($bodies);
  });
  $tabPanel.append($buttons, $bodies).appendTo('#exampleContainer');
};

E.get = function(url, callback) {
  return Q($.ajax({url: url, dataType: 'text', success: callback}));
};

E.code = function(src, language) {
  var $code = $('<code>').attr('class', language);
  src.then(function(text) {
    $code.text(text);
    hljs.highlightBlock($code[0]);
  });
  return $('<pre>').append($code);
}

})();
