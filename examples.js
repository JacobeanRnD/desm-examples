(function() {
'use strict';

var E = window.E = {};

E.tabPanel = function(items) {
  var $buttons = $('<ul class="nav nav-tabs" role="tablist">');
  var $bodies = $('<div class="tab-content">');
  var $tabPanel = $('#tabPanel').attr('role', 'tabpanel');
  items.forEach(function(item, i) {
    var $button = $('<li role="presentation">');
    var $a = $('<a aria-controls="home" role="tab" data-toggle="tab">');
    $a.attr('href', '#' + item.id).text(item.label).appendTo($button);
    var $body = $('<div role="tabpanel" class="tab-pane">');
    $body.attr('id', item.id).html(item.content);

    if(i == 0) {
      $button.addClass('active');
      $body.addClass('active');
    }

    $button.appendTo($buttons);
    $body.appendTo($bodies);
  });
  $tabPanel.append($buttons, $bodies);
};

})();