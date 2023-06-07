
import { addMoney, getRandom, deleteMoney, checkRemoveClass } from '../files/functions.js';
import { startData } from './startData.js';

export function initStartData() {

	if (sessionStorage.getItem('money')) {
		writeScore();
	} else {
		sessionStorage.setItem('money', startData.bank);
		writeScore();
	}

	if (sessionStorage.getItem('points')) {
		writePoints();
	} else {
		sessionStorage.setItem('points', startData.points);
		writePoints();
	}
}

function writeScore() {
	if (document.querySelectorAll('.score').length) {
		document.querySelectorAll('.score').forEach(el => {
			el.textContent = sessionStorage.getItem('money');
		})
	}
}

function writePoints() {
	if (document.querySelectorAll('.points').length) {
		document.querySelectorAll('.points').forEach(el => {
			el.textContent = sessionStorage.getItem('points');
		})
	}
}

initStartData();

//========================================================================================================================================================
// Функция присвоения случайного класса анимациии money icon
const anim_items = document.querySelectorAll('.icon-game');

function getRandomAnimate() {
	let number = getRandom(0, 3);
	let arr = ['jump', 'scale', 'rotate'];
	let random_item = getRandom(0, anim_items.length);
	anim_items.forEach(el => {
		if (el.classList.contains('_anim-icon-jump')) {
			el.classList.remove('_anim-icon-jump');
		} else if (el.classList.contains('_anim-icon-scale')) {
			el.classList.remove('_anim-icon-scale');
		} else if (el.classList.contains('_anim-icon-rotate')) {
			el.classList.remove('_anim-icon-rotate');
		}
	})
	setTimeout(() => {
		anim_items[random_item].classList.add(`_anim-icon-${arr[number]}`);
	}, 100);
}

if (anim_items.length) {
	setInterval(() => {
		getRandomAnimate();
	}, 20000);
}



//========================================================================================================================================================
// quiz

const gameItems = document.querySelector('.game__items');
const headerQuestion = document.querySelector('.header-main__question');
const dataItems = document.querySelectorAll('[data-game-item] span');
const bullets = document.querySelectorAll('.game__pagination span');

export const configQuiz = {

	currentQuestion: 1,

	playerSelect: 1,

	upBankCount: 5,

	questions: {
		1: {
			text: 'Which ball is heavier ?',
			variants: ['BASKETBALL', 'Football', 'TENNIS', 'Valleyball'],
			answer: 1
		},
		2: {
			text: 'What is the name of the famous player of the Italian national football team?',
			variants: ['Roberto Mancini', 'Marco Carniziki', 'Gianluigi Donnarumma', 'Vladimir Falcone'],
			answer: 1
		},
		3: {
			text: 'Who won the FIFA world Cup in 2022?',
			variants: ['Argentina', 'Germany', 'Italy', 'Spain'],
			answer: 1
		},
	}
}

export function startGame(item) {
	gameItems.classList.add('_hold');

	setTimeout(() => {
		checkCollision(item);
	}, 1000);

	setTimeout(() => {
		checkContinueGame();
	}, 2000);

}

function checkCollision(item) {
	if (configQuiz.currentQuestion === 1) {
		if (configQuiz.questions[1].answer === configQuiz.playerSelect) {
			addMoney(configQuiz.upBankCount, '.points', 500, 1500, 'points');
		} else {
			item.classList.remove('_active');
			item.classList.add('_lose');
		}
	} else if (configQuiz.currentQuestion === 2) {
		if (configQuiz.questions[2].answer === configQuiz.playerSelect) {
			addMoney(configQuiz.upBankCount, '.points', 500, 1500, 'points');
		} else {
			item.classList.remove('_active');
			item.classList.add('_lose');
		}
	} else if (configQuiz.currentQuestion === 3) {
		if (configQuiz.questions[3].answer === configQuiz.playerSelect) {
			addMoney(configQuiz.upBankCount, '.points', 500, 1500, 'points');
		} else {
			item.classList.remove('_active');
			item.classList.add('_lose');
		}
	}
}

function checkContinueGame() {
	if (configQuiz.currentQuestion < 3) { // Если все вопросы еще не закончились
		// Увеличиваем метку текущего вопроса
		configQuiz.currentQuestion++;

		setTimeout(() => {
			goNextQuestion();
		}, 500);

		setTimeout(() => {
			if (configQuiz.currentQuestion > 1) {
				gameItems.classList.add('_nf');
			}
			writeQuestion();
			writeCurrentBullet();
		}, 750);

	} else {
		resetGame();
	}


	setTimeout(() => {
		checkRemoveClass('[data-game-item]', '_active');
		checkRemoveClass('[data-game-item]', '_lose');
	}, 750);


}

export function resetGame() {
	document.querySelector('.wrapper').classList.remove('_game');

	configQuiz.currentQuestion = 1;

	setTimeout(() => {
		writeQuestion();

		gameItems.classList.remove('_hold');
		gameItems.classList.remove('_nf');

		writeCurrentBullet();
	}, 1000);

}

function goNextQuestion() {
	gameItems.classList.add('_hide');

	setTimeout(() => {
		gameItems.classList.remove('_hide');
		gameItems.classList.remove('_hold');
	}, 1000);
}

function writeQuestion() {
	if (configQuiz.currentQuestion === 1) {
		headerQuestion.textContent = configQuiz.questions[1].text;
		dataItems.forEach((item, idx) => {
			item.textContent = configQuiz.questions[1].variants[idx];
		})
	} else if (configQuiz.currentQuestion === 2) {
		headerQuestion.textContent = configQuiz.questions[2].text;
		dataItems.forEach((item, idx) => {
			item.textContent = configQuiz.questions[2].variants[idx];
		})
	} else if (configQuiz.currentQuestion === 3) {
		headerQuestion.textContent = configQuiz.questions[3].text;
		dataItems.forEach((item, idx) => {
			item.textContent = configQuiz.questions[3].variants[idx];
		})
	}

}

function writeCurrentBullet() {
	checkRemoveClass('.game__pagination span', '_active');
	bullets[configQuiz.currentQuestion - 1].classList.add('_active');
}







