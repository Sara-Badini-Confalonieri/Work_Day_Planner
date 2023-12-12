dayjs.extend(window.dayjs_plugin_advancedFormat);

var todayDate;

function getLocalStorageData() {
  return JSON.parse(localStorage.getItem('scheduleData')) || {};
}

function saveToLocalStorage(hour, textData) {
  const scheduleData = getLocalStorageData();
  scheduleData[hour] = textData;
  localStorage.setItem('scheduleData', JSON.stringify(scheduleData));
}

function loadFromLocalStorage() {
  const scheduleData = getLocalStorageData();
  const currentHour = todayDate.hour();

  for (let i = 9; i <= 17; i++) {
    const timeBlock = $('#time-block-' + i);
    const textArea = timeBlock.find(".textArea");
    const savedText = scheduleData[i] || '';


    textArea.val(savedText);

    if (currentHour > i) {
      timeBlock.addClass("past").removeClass("present future");
    } else if (currentHour === i) {
      timeBlock.addClass("present").removeClass("past future");
    } else {
      timeBlock.addClass("future").removeClass("past present");
    }
  }
}


$(document).ready(function () {
  todayDate = dayjs();
  $("#currentDay").text(todayDate.format('dddd, MMMM Do'));
  loadFromLocalStorage();
});

$(".saveBtn").on("click", function () {
  const timeBlock = $(this).parent();
  const hour = parseInt(timeBlock.attr('id').replace('time-block-', ''), 10);
  
  const textData = timeBlock.find(".textArea").val();

  saveToLocalStorage(hour, textData);

  const currentHour = todayDate.hour();
  if (currentHour > hour) {
    timeBlock.addClass("past").removeClass("present future");
  } else if (currentHour === hour) {
    timeBlock.addClass("present").removeClass("past future");
  } else {
    timeBlock.addClass("future").removeClass("past present");
  }
});
