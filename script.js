dayjs.extend(window.dayjs_plugin_advancedFormat);

$(document).ready(function() {
  var todayDate = dayjs();
  $("#currentDay").text(todayDate.format('dddd, MMMM Do'));
});
