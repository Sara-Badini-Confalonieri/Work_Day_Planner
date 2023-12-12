dayjs.extend(window.dayjs_plugin_advancedFormat);

$(document).ready(function () {
  var todayDate = dayjs();
  $("#currentDay").text(todayDate.format('dddd, MMMM Do'));

  const localStorageData = getLocalStorageData();

  const todayDataIndex = localStorageData.findIndex(function (element) {
    return element.date === todayDate.format('MM-DD-YYYY');
  });

  if (todayDataIndex >= 0) {
    const todayData = localStorageData[todayDataIndex];

    for (let i = 9; i <= 17; i++) {
      $('#time-block-' + i).val(todayData.data[i]);
    }
  }
})

$(".saveBtn").on("click", function () {
  const timeBlock = $(this).parent(); 
  const hour = timeBlock.find(".hour").text().trim();
  const textData = timeBlock.find("textarea").val().trim();

  saveToLocalStorage(todayDate, hour, textData);
});