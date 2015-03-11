/* global _ */
'use strict';

$(function($, window) {

  var defaults = {
    x : 3, // tiles in x axis
    y : 3, // tiles in y axis
    gap: 3
  };

  $.prototype.splitTiles = function(options) {

    var obj = $.extend({}, defaults, options);

    return this.each(function() {

      var $container = $(this);
      var width = $container.width();
      var height = $container.height();
      var $img = $container.find('img');
      var tiles = obj.x * obj.y;
      var wraps = [];
      var $wraps;

      for (var i = 0; i < tiles; i++) {
        wraps.push('<div class="tile"><div class="image"></div></div>');
      }

      $wraps = $(wraps.join(''));

      // Hide original image and insert split tiles in DOM
      $img.hide().after($wraps);

      // Set background
      $wraps.find(".image").css({
        width: (width / obj.x) - obj.gap,
        height: (height / obj.y) - obj.gap,
        marginBottom: obj.gap +'px',
        marginRight: obj.gap +'px',
        backgroundImage: 'url('+ $img.attr('src') +')'
      });

      // Adjust position
      $wraps.find(".image").each(function() {
        var pos = $(this).position();
        $(this).css('backgroundPosition', -pos.left +'px '+ -pos.top +'px');
      });

      // $('.image').last().css('visibility', 'hidden');

      $('#start').click(function() {
      $wraps = _.shuffle($wraps);

      $('#box').html($wraps);
      console.log($wraps);

      $('.image').last().css('visibility', 'hidden');

      $('.tile').first().attr({'id': 'td1', 'data-num': '1'});
      $('.tile').first().next().attr({'id': 'td2', 'data-num': '2'});
      $('.tile').first().next().next().attr({'id': 'td3', 'data-num': '3'});
      $('.tile').first().next().next().next().attr({'id': 'td4', 'data-num': '4'});
      $('.tile').first().next().next().next().next().attr({'id': 'td5', 'data-num': '5'});
      $('.tile').last().prev().prev().prev().attr({'id': 'td6', 'data-num': '6'});
      $('.tile').last().prev().prev().attr({'id': 'td7', 'data-num': '7'});
      $('.tile').last().prev().attr({'id': 'td8', 'data-num': '8'});
      $('.tile').last().attr({'id': 'td9', 'data-num': '0'});

      $('#start').attr('disabled', true);
      $('.tile').click(function() {

        var id = $(this).attr('id');
        // console.log($(this));

        if (id === 'td1') {
          if (isBlank('td2'))
          swap(id, 'td2');
          else if (isBlank('td4'))
          swap(id, 'td4');
        }

        if (id === 'td2') {
          if (isBlank('td1'))
          swap(id, 'td1');
          else if (isBlank('td3'))
          swap(id, 'td3');
          else if (isBlank('td5'))
          swap(id, 'td5');
        }

        if (id === 'td3') {
          if (isBlank('td2'))
          swap(id,'td2');
          else if (isBlank('td6'))
          swap(id,'td6');
        }

        if (id === 'td4') {
          if (isBlank('td1'))
          swap(id, 'td1');
          else if (isBlank('td5'))
          swap(id, 'td5');
          else if (isBlank('td7'))
          swap(id, 'td7');
        }

        if (id === 'td5') {
          if (isBlank('td2'))
          swap(id, 'td2');
          else if (isBlank('td4'))
          swap(id, 'td4');
          else if (isBlank('td6'))
          swap(id, 'td6');
          else if (isBlank('td8'))
          swap(id, 'td8');
        }

        if (id === 'td6') {
          if (isBlank('td9'))
          swap(id, 'td9');
          else if (isBlank('td5'))
          swap(id, 'td5');
          else if (isBlank('td3'))
          swap(id, 'td3');
        }

        if (id === 'td7') {
          if (isBlank('td4'))
          swap(id, 'td4');
          else if (isBlank('td8'))
          swap(id, 'td8');
        }

        if (id === 'td8') {
          if (isBlank('td7'))
          swap(id, 'td7');
          else if (isBlank('td5'))
          swap(id, 'td5');
          else if (isBlank('td9'))
          swap(id, 'td9');
        }

        if (id === 'td9') {
          if (isBlank('td6'))
          swap(id, 'td6');
          else if (isBlank('td8'))
          swap(id, 'td8');
        }

        //check win condition

      });
    });
    $('#reset').click(function() {
      $('#start').attr('disabled', false);
      $('#box').html('');
    });

  });

    function isBlank(id) {
      var empty = false;

      var num = $('#' + id).attr('data-num');
      if (num == 0) {
        empty = true;
      }
      return empty;
    }

    function swap(id1, id2) {
      var $td1 = $('#' + id1);
      var $td2 = $('#' + id2);

      var num1 = $('#' + id1).attr('data-num');
      var num2 = $('#' + id2).attr('data-num');

      var html1 = $td1.html();
      var html2 = $td2.html();

      $td1.html(html2).attr('data-num', num2);
      $td2.html(html1).attr('data-num', num1);
    }
  };
  $('#box').splitTiles();
}
($, window));
