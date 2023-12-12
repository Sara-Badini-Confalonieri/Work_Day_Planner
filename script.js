dayjs.extend(window.dayjs_plugin_advancedFormat);

var currentHour;

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

  for (let i = 9; i <= 17; i++) {
    const timeBlock = $('#time-block-' + i);
    const textArea = timeBlock.find(".col-sm-10");
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
  currentHour = dayjs().hour(); 

  $("#currentDay").text(dayjs().format('dddd, MMMM Do'));
  loadFromLocalStorage();
});

$(".saveBtn").on("click", function () {
  const timeBlock = $(this).parent();
  const hour = parseInt(timeBlock.attr('id').replace('time-block-', ''), 10);
  const textData = timeBlock.find(".col-sm-10").val();

  saveToLocalStorage(hour, textData);

  if (currentHour > hour) {
    timeBlock.addClass("past").removeClass("present future");
  } else if (currentHour === hour) {
    timeBlock.addClass("present").removeClass("past future");
  } else {
    timeBlock.addClass("future").removeClass("past present");
  }
});