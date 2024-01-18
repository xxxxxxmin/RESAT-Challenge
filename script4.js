document.addEventListener('DOMContentLoaded', function () {
  const calendarContainer = document.getElementById('calendar');
  const memoContainer = document.getElementById('memo-container');
  const memoText = document.getElementById('memo-text');
  const memoView = document.getElementById('memo-view');
  const memoContent = document.getElementById('memo-content');
  let currentMonth;
  let currentYear;
  let selectedDay;
  let memoDates = [];
  let memos = {};

  window.calendarApp = {
    createCalendar: function (year, month) {
      currentMonth = month;
      currentYear = year;

      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDay = new Date(year, month, 1).getDay();

      const calendarHTML = `<div id="calendar-header">
                              <button onclick="calendarApp.changeMonth(-1)">❮</button>
                              <h2 id="month-year">${calendarApp.getMonthName(month)} ${year}</h2>
                              <button onclick="calendarApp.changeMonth(1)">❯</button>
                            </div>
                            <table id="calendar-table">
                              <thead>
                                <tr>
                                  <th>일</th>
                                  <th>월</th>
                                  <th>화</th>
                                  <th>수</th>
                                  <th>목</th>
                                  <th>금</th>
                                  <th>토</th>
                                </tr>
                              </thead>
                              <tbody>${calendarApp.generateCalendarDays(daysInMonth, firstDay)}</tbody>
                            </table>`;

      calendarContainer.innerHTML = calendarHTML;
      this.attachDayClickListeners();
      this.retrieveMemoData(); // 새로운 함수 추가
    },

    generateCalendarDays: function (daysInMonth, firstDay) {
      let calendarDaysHTML = '';
      let dayCount = 1;

      for (let i = 0; i < 6; i++) {
        calendarDaysHTML += '<tr>';

        for (let j = 0; j < 7; j++) {
          let memoIndicator = '';
          const dayIndex = i * 7 + j + 1;

          if ((i === 0 && j < firstDay) || dayCount > daysInMonth) {
            calendarDaysHTML += '<td></td>';
          } else {
            if (memoDates.includes(dayCount)) {
              memoIndicator = '<div class="memo-indicator"></div>';
            }
            calendarDaysHTML += `<td onclick="calendarApp.selectDay(${dayCount})">${dayCount}${memoIndicator}</td>`;
            dayCount++;
          }
        }

        calendarDaysHTML += '</tr>';
      }

      return calendarDaysHTML;
    },

    selectDay: function (day) {
      console.log(`Selected Day: ${day}`);
      selectedDay = day;
      memoText.value = memos[selectedDay] || '';
      this.showMemoContainer();
      this.showMemo();
    },

    attachDayClickListeners: function () {
      const dayElements = document.querySelectorAll('#calendar-table tbody td');
      dayElements.forEach((dayElement) => {
        dayElement.addEventListener('click', function () {
          calendarApp.selectDay(Number(dayElement.textContent));
        });
      });
    },

    showMemoContainer: function () {
      if (selectedDay) {
        memoContainer.style.display = 'block';
        memoView.style.display = 'none';
      } else {
        memoContainer.style.display = 'none';
      }
    },

    changeMonth: function (diff) {
      currentMonth += diff;

      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }

      calendarApp.createCalendar(currentYear, currentMonth);
      document.getElementById('month-year').innerText = `${calendarApp.getMonthName(currentMonth)} ${currentYear}`;
      this.markMemoDates(); // 수정된 부분
    },

    getMonthName: function (month) {
      const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
      return monthNames[month];
    },

    saveOrUpdateMemo: function () {
      const memoContent = memoText.value;
      if (selectedDay && memoContent.trim() !== '') {
        console.log(`Memo saved for Day ${selectedDay}: ${memoContent}`);
        if (!memoDates.includes(selectedDay)) {
          memoDates.push(selectedDay);
        }
        memos[selectedDay] = memoContent;
        this.showMemo();
        this.markMemoDates();
        this.saveMemoData(); // 추가된 부분
      } else {
        console.log('Please select a day and enter memo content before saving.');
      }
    },

    editMemo: function () {
      memoView.style.display = 'none';
      memoText.focus();
    },

    showMemo: function () {
      if (selectedDay && memos[selectedDay]) {
        memoView.style.display = 'block';
        memoContent.innerText = `저장된 메모: ${memos[selectedDay]}`;
      } else {
        memoView.style.display = 'none';
      }
    },

    cancelMemo: function () {
      memoContainer.style.display = 'none';
      selectedDay = null;
      this.markMemoDates();
    },

    markMemoDates: function () {
      const dateElements = document.querySelectorAll('#calendar-table tbody td');
      dateElements.forEach((dateElement) => {
        const dayIndex = parseInt(dateElement.textContent);
        if (memoDates.includes(dayIndex)) {
          dateElement.classList.add('has-memo');
        } else {
          dateElement.classList.remove('has-memo');
        }
      });
    },

    saveMemoData: function () {
      // 메모 데이터를 로컬 스토리지에 저장
      const storedMemos = JSON.parse(localStorage.getItem('memos')) || {};
      storedMemos[`${currentYear}-${currentMonth + 1}-${selectedDay}`] = memos[selectedDay];
      localStorage.setItem('memos', JSON.stringify(storedMemos));
    },

    retrieveMemoData: function () {
      memoDates = [];
      memos = {};

      const storedMemos = JSON.parse(localStorage.getItem('memos')) || {};

      // 현재 월에 해당하는 메모만 가져와서 memoDates와 memos에 추가
      Object.keys(storedMemos).forEach((key) => {
        const [storedYear, storedMonth, storedDay] = key.split('-').map(Number);

        if (storedYear === currentYear && storedMonth === currentMonth + 1) {
          const day = `${storedYear}-${storedMonth}-${storedDay}`;
          memoDates.push(storedDay);
          memos[storedDay] = storedMemos[key];
        }
      });
    },
  };

  const currentDate = new Date();
  calendarApp.createCalendar(currentDate.getFullYear(), currentDate.getMonth());
});




