(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

		breakpoints({
			wide:      [ '961px',  '1880px' ],
			normal:    [ '961px',  '1620px' ],
			narrow:    [ '961px',  '1320px' ],
			narrower:  [ '737px',  '960px'  ],
			mobile:    [ null,     '736px'  ]
		});

		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

		var $nav_a = $nav.find('a');

		$nav_a
			.addClass('scrolly')
			.on('click', function(e) {

				var $this = $(this);

				// External link? Bail.
					if ($this.attr('href').charAt(0) != '#')
						return;

				// Prevent default.
					e.preventDefault();

				// Deactivate all links.
					$nav_a.removeClass('active');

				// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
					$this
						.addClass('active')
						.addClass('active-locked');

			})
			.each(function() {

				var	$this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				// No section for this link? Bail.
					if ($section.length < 1)
						return;

				// Scrollex.
					$section.scrollex({
						mode: 'middle',
						top: '-10vh',
						bottom: '-10vh',
						initialize: function() {

							// Deactivate section.
								$section.addClass('inactive');

						},
						enter: function() {

							// Activate section.
								$section.removeClass('inactive');

							// No locked links? Deactivate all links and activate this section's one.
								if ($nav_a.filter('.active-locked').length == 0) {

									$nav_a.removeClass('active');
									$this.addClass('active');

								}

							// Otherwise, if this section's link is the one that's locked, unlock it.
								else if ($this.hasClass('active-locked'))
									$this.removeClass('active-locked');

						}
					});

			});

		$('.scrolly').scrolly();


			$(
				'<div id="headerToggle">' +
					'<a href="#header" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

			$('#header')
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'header-visible'
				});

})(jQuery);


// Todo List
const taskInput = document.getElementById('new-task');
const addBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => renderTask(task));

addBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const task = { text: taskText, completed: false };
  tasks.push(task);
  saveTasks();
  renderTask(task);
  taskInput.value = '';
});

function renderTask(task) {
  const li = document.createElement('li');

  const textSpan = document.createElement('span');
  textSpan.textContent = task.text;
  if (task.completed) li.classList.add('completed');
  li.appendChild(textSpan);

  const btnGroup = document.createElement('div');
  btnGroup.classList.add('btn-group');

  const doneBtn = document.createElement('button');
  doneBtn.textContent = '✓';
  doneBtn.addEventListener('click', () => {
    task.completed = !task.completed;
    li.classList.toggle('completed');
    saveTasks();
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = '✕';
  delBtn.addEventListener('click', () => {
    taskList.removeChild(li);
    tasks = tasks.filter(t => t !== task);
    saveTasks();
  });

  btnGroup.appendChild(doneBtn);
  btnGroup.appendChild(delBtn);

  li.appendChild(btnGroup);
  taskList.appendChild(li);
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Taschenrechner
const display = document.getElementById("calc-display");
const buttons = document.querySelectorAll(".calc-buttons .btn");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;
    const action = btn.dataset.action;

    if (action === "clear") {
      display.value = "";
    } else if (action === "back") {
      display.value = display.value.slice(0, -1);
    } else if (action === "calculate") {
      try {
        display.value = eval(display.value) || "";
      } catch {
        display.value = "Fehler";
      }
    } else if (value) {
      display.value += value;
    }
  });
});

//Stoppuhr 
let timer = document.getElementById("timer");
let startBtn = document.getElementById("start-btn");
let stopBtn = document.getElementById("stop-btn");
let resetBtn = document.getElementById("reset-btn");

let minutes = 0;
let seconds = 0;
let hundredths = 0;
let interval = null;

function updateDisplay() {
  const m = minutes.toString().padStart(2, "0");
  const s = seconds.toString().padStart(2, "0");
  const h = hundredths.toString().padStart(2, "0");
  timer.textContent = `${m}:${s}:${h}`;
}

function startTimer() {
  if (interval) return;
  interval = setInterval(() => {
    hundredths++;
    if (hundredths >= 100) {
      hundredths = 0;
      seconds++;
    }
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }
    updateDisplay();
  }, 10);
}

function stopTimer() {
  clearInterval(interval);
  interval = null;
}

function resetTimer() {
  stopTimer();
  hundredths = 0;
  seconds = 0;
  minutes = 0;
  updateDisplay();
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();

//Memory Spiel
const board = document.getElementById("game-board");
const status = document.getElementById("status");
const restartBtn = document.getElementById("restart-btn");

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

const symbols = ["🍎","🍌","🍇","🍉","🍓","🍒","🥝","🍍"];

function initGame() {
  cards = [...symbols, ...symbols];
  shuffle(cards);
  board.innerHTML = "";
  matches = 0;
  status.textContent = "";
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  cards.forEach((symbol) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.textContent = "";
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function flipCard(e) {
  if (lockBoard) return;
  const card = e.target;
  if (card === firstCard) return;

  card.textContent = card.dataset.symbol;
  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;

  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    matches++;
    resetCards();
    if (matches === symbols.length) {
      status.textContent = "Alle Paare gefunden";
    }
  } else {
    setTimeout(() => {
      firstCard.textContent = "";
      secondCard.textContent = "";
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetCards();
    }, 700);
  }
}

function resetCards() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

restartBtn.addEventListener("click", initGame);

initGame();





