// design 		// Дизайнеры и т.д.
// programm 	// ИФСТ ПИНФ и т.д.
// IFST 		// Информационные Системы И технологии
// ACS  		// Прикладная Информатика
// CSE  		// Информатика и Вычислительная Техника
// SE   		// Программная инженерия
// APR  		// Реклама и Связи с Общественностью
// Television 	// Телевидение
// Design 		// Дизайн

let massStage = 1;
// находим элементы
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

// Переменные Опроса
let score = 0; // кол-во правильных ответов
let questionIndex = 0; // текущий вопрос

// Создаём Мап для Ответов 
let directionMap = new Map([
	["design", design=0],
	["programm", programm=0],
	["IFST", IFST=0],
	["ACS", ACS=0],
	["CSE", CSE=0],
	["SE", SE=0],
	["APR", APR=0],
	["Television", Television=0],
	["DesignWay", Design=0]
]);
let descriptionMap = new Map([
	["IFST", ["Вам идеально подходит направление Информационные системы и технологии (ИФСТ)"
	, "Экзамены: математика, русский язык, физика или ифнорматика (на выбор)"
	]],
	["ACS", ["Вам идеально подходит направление Прикладная информатика (ПИНФ)"
	, "Экзамены: математика, русский язык, физика или ифнорматика (на выбор)"
	]],
	["CSE", ["Вам идеально подходит направление Информатика и вычислительная техника (ИВЧТ)"
	, "Экзамены: математика, русский язык, физика или ифнорматика (на выбор)"
	]],
	["SE", ["Вам идеально подходит направление Программная инженерия (ПИНЖ)"
	, "Экзамены: математика, русский язык, физика или ифнорматика (на выбор)"
	]],
	["APR", ["Вам идеально подходит направление Реклама и связи с общественностью (РКЛМ)"
	, "Экзамены: обществознание, русский язык, история или информатика (на выбор)"
	]],
	["Television", ["Вам идеально подходит направление Телевидение (ТЛВД)"
	, "Экзамены: литература, русский язык, история или обществознание (на выбор)"
	]],
	["DesignWay", ["Вам идеально подходит направление Дизайн (ДИЗН)"
	, "Экзамены: литература, русский язык, история или обществознание (на выбор)"
	]]
]);
const startQuestions = [
	{
		question: "Вы любите заниматься творчеством?",
		answers: ["Да", "Нет"],
		waysForEvol: ["design", "IFST"],
		antiWaysForEvol: ["programm"],
	},
	{
		question: "Вы любите писать код?",
		answers: ["Да","Нет"],
		waysForEvol: ["programm"],
		antiWaysForEvol: ["design"],
	},
	{
		question: "Вы любите математику?",
		answers: ["Да","Нет"],
		waysForEvol: ["programm"],
		antiWaysForEvol: ["design"],
	},
];
const programmQuestions = [
	{
		question: "Вы хотите делать игры?",
		answers: ["Да", "Нет"],
		waysForEvol: ["IFST"],
		antiWaysForEvol: ["ACS","CSE","SE"],
	},
	{
		question: "Вы разносторонний человек?",
		answers: ["Да","Нет"],
		waysForEvol: ["ACS"],
		antiWaysForEvol: ["CSE"],
	},
	{
		question: "Вы хорошо разбираетесь в комплектующих ПК?",
		answers: ["Да","Нет"],
		waysForEvol: ["CSE"],
		antiWaysForEvol: ["ACS","IFST","SE"],
	},
	{
		question: "Вы хотите контролировать процесс написания кода или непосредственно <<Кодить>>?",
		answers: ["Хочу писать код","Хочу смотреть, как другие пишут, и командовать"],
		waysForEvol: ["IFST","CSE"],
		antiWaysForEvol: ["ACS","SE"],
	},

	{
		question: "Как сильно любите <<кодить>>?",
		answers: ["Хочу писать код всегда!","Хочу немного разнообразия"],
		waysForEvol: ["IFST"],
		antiWaysForEvol: ["ACS","SE","CSE"],
	},
];
const designQuestions = [
	{
		question: "Вы хорошо рисуете?",
		answers: ["Да", "Нет"],
		waysForEvol: ["DesignWay", "APR"],
		antiWaysForEvol: ["Television"],
	},
	{
		question: "Вы хотите делать дизайн для видеоигр?",
		answers: ["Да", "Нет"],
		waysForEvol: ["DesignWay"],
		antiWaysForEvol: ["APR", "Television"],
	},
	{
		question: "Хотите создавать рекламную продукцию?",
		answers: ["Да","Нет"],
		waysForEvol: ["APR"],
		antiWaysForEvol: ["DesignWay","Television"],
	},
	{
		question: "Вы любите киносъёмку, подбор кадра и т.п.?",
		answers: ["Да","Нет"],
		waysForEvol: ["Television"],
		antiWaysForEvol: ["APR", "DesignWay"],
	},
	{
		question: "Вы предпочтёте создавать дизайн предметов мебели и одежды или логотипов известных брендов?",
		answers: ["Мебель и одежда","Логотипы брендов"],
		waysForEvol: ["DesignWay"],
		antiWaysForEvol: ["APR"],
	},
];
let currQuestions = startQuestions;

// Стартовые преготовления
clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage(){
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}


function showQuestion(){

	
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', currQuestions[questionIndex]['question']);
	headerContainer.innerHTML = title;

	// Варианты ответов
	for ([index, answerText] of currQuestions[questionIndex]['answers'].entries()){
		const questionTemplate = 
			`<li>
				<label>
					<input value =%number% type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>`
		const answerHTML = questionTemplate
									.replace('%answer%', answerText)
									.replace('%number%', index);
		
		listContainer.innerHTML += answerHTML;
	}


}


function checkAnswer(){
	console.log('chckAnswer start');
	// находим выбранную радиокнопку
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
	
	// Если ответ не выбран -> ничего не делаем и выходим из функции
	if(!checkedRadio){
		console.log('Not')
		submitBtn.blur();
		return;
	}

	// checkedRadio.value -> значение value  кнопки  pasrseInt(peremenn) -> пропарсить в int
	// massivName[Index][Значение] -> Получение данных
	upScore(parseInt(checkedRadio.value));
	console.log(directionMap);
	if(questionIndex !== currQuestions.length -1 && massStage<=2){
		questionIndex++;
		clearPage();
		showQuestion();
		return;
	}else if(questionIndex === currQuestions.length -1 && massStage<2){
		questionIndex =0;
		massStage++;
		if(directionMap.get("programm") > directionMap.get("design")){
			currQuestions = programmQuestions;
		}else{
			currQuestions = designQuestions;
		}
		clearPage();
		showQuestion();
		return;
	}else{
		clearPage();
		showResults();
	}
}


function upScore(thisValue){
	if(thisValue === 0 ){
		for(key of currQuestions[questionIndex]['waysForEvol']){
			mapValue = parseInt(directionMap.get(key))+1;
			directionMap.set(key, mapValue);
		}
	} else{
		for(key of currQuestions[questionIndex]['antiWaysForEvol']){
			mapValue = parseInt(directionMap.get(key))+1;
			directionMap.set(key, mapValue);
		}
	}
}

function showResults(){
	directionMap.delete('programm');
	directionMap.delete('design');

	const resultsTemplate = `
			<h2 class="title">%title%</h2>
			<h3 class="summary">%message%</h3>
			<p class="result">%result%</p>
		`;
	let title, message, result;

	title = "Поздравляем!";
	message =  (descriptionMap.get(getKeyByValue(directionMap, Math.max(...directionMap.values()))))[0];
	result = (descriptionMap.get(getKeyByValue(directionMap, Math.max(...directionMap.values()))))[1];

	const finalMessage = resultsTemplate
							.replace('%title%', title)
							.replace('%message%', message)
							.replace('%result%', result);
	
	headerContainer.innerHTML = finalMessage;


	// Меняю Ответить на Заново
	submitBtn.blur();
	submitBtn.innerHTML = 'Пройти тест заново';
	submitBtn.onclick = ()=>(history.go());

}


function getKeyByValue(map, searchValue) {
	for (let [key, value] of map.entries()) {
	  if (value === searchValue)
		return key;
	}
  }