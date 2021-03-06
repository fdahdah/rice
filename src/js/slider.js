let Slider = function (container) {
  let slider = $('<div>').attr('class', 'slider').appendTo(container);
  let track = $('<div>').attr('class', 'track').appendTo(slider);
  let thumb = $('<div>').attr('class', 'thumb').appendTo(slider);
  let _val = 0;

  thumb.on('mousedown touchstart', function () {
    var thumb = $(this);
    var track = thumb.siblings('.track');
    var baseX = thumb.siblings('.track').offset().left;
    var baseMax = baseX + track.width();
    var min = baseX;
    var max = baseMax;

    $(document).on('mousemove.slide touchmove.slide', function (e) {
      let pageX;
      if (e.touches && e.touches[0]) pageX = e.touches[0].pageX;
      else pageX = e.pageX;
      var x = Math.min(Math.max(pageX, min), max);
      thumb.css('left', x - baseX + 'px');
      _val = thumb.position().left/track.width();
      thumb.parent().trigger('sliderchange', [thumb.position().left/track.width()]);
    }).on('mouseup.slide mouseleave.slide touchend.slide', function () {
      $(document).off('mousemove.slide mouseup.slide mouseleave.slide touchmove.slide touchend.slide');
    });
  });

  slider.val = function (v) {
    if (v === undefined) return _val;
    _val = v;
    thumb.css('left', track.width() * v + 'px');
    return slider;
  }

  return slider;
}