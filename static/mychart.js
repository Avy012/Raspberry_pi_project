var temconfig = {
	type: 'line',

	data: {
			labels: [],
			datasets: [{
					label: '기온',
					backgroundColor: 'yellow',
					borderColor: 'rgb(255, 99, 132)',
					borderWidth: 2,
					data: [], /* 각 레이블에 해당하는 데이터 */
					fill : false, //안채움
			}]
	},
	//  차트의 속성 지정
	options: {
			responsive : false, // 크기 조절 금지
			scales: { /* x축과 y축 정보 */
					xAxes: [{
							display: true,
							scaleLabel: { display: true, labelString: '시간' },
					}],
					yAxes: [{
							ticks: {
									min: 0
							},
							display: true,
							scaleLabel: { display: true, labelString: '온도' }
					}]
			}
	}
};

var humconfig = {
	type: 'line',
	data: {
			labels: [],
			datasets: [{
					label: '습도',
					backgroundColor: 'yellow',
					borderColor: 'rgb(99, 146, 255)',
					borderWidth: 2,
					data: [], /* 각 레이블에 해당하는 데이터 */
					fill : true, //채움
			}]
	},
	options: {
			responsive : false, // 크기 조절 금지
			scales: { /* x축과 y축 정보 */
				xAxes: [{
						display: true,
						scaleLabel: { display: true, labelString: '시간' },
				}],
				yAxes: [{
						ticks: {
								min: 0
						},
						display: true,
						scaleLabel: { display: true, labelString: '습도' }
				}]
		}
	}
};

var ctxt = null
var ctxh = null
var chartt = null
var charth = null
var LABEL_SIZE = 12; // 최근 12시간의 온/습도만 표시
var ttick = 0; // 도착한 데이터의 개수임, tick의 범위는 0에서 11까지만
var htick = 0;

function drawChart() {
ctxt = document.getElementById('temperature').getContext('2d');
chartt = new Chart(ctxt, temconfig);

ctxh = document.getElementById('humidity').getContext('2d');
charth = new Chart(ctxh, humconfig);

init();
}



// chart의 차트에 labels의 크기를 LABEL_SIZE로 만들고 0~19까지 레이블 붙이기
function init() {
for(let i=0; i<LABEL_SIZE; i++) {
	chartt.data.labels[i] = i;
}
chartt.update();
for(let i=0; i<LABEL_SIZE; i++) {
	charth.data.labels[i] = i;
}
charth.update();
humcanvas=document.getElementById("humidity");
humcanvas.style.display = "none"//처음엔 온도그래프만 나타내기 위해
}


function addChartDatat(value) {
        ttick++; // 도착한 데이터의 개수 증가
        ttick %= 12; // tick의 범위는 0에서 11까지만. 
        let nt = chartt.data.datasets[0].data.length; // 현재 데이터의 개수
        if(nt < LABEL_SIZE)
                chartt.data.datasets[0].data.push(value);
        else {

                chartt.data.datasets[0].data.push(value);
                chartt.data.datasets[0].data.shift();

                chartt.data.labels.push(ttick);
                chartt.data.labels.shift();
        }
        chartt.update();
}

function addChartDatah(value){
        htick++;
        htick %= 12;
        let ht = charth.data.datasets[0].data.length;
        if(ht < LABEL_SIZE)
                charth.data.datasets[0].data.push(value);
        else {
                charth.data.datasets[0].data.push(value);
                charth.data.datasets[0].data.shift();

                charth.data.labels.push(htick);
                charth.data.labels.shift();
        }
        charth.update();
}

function changegraph() { // 캔버스 바꾸기
        temcanvas=document.getElementById("temperature");
        humcanvas=document.getElementById("humidity");

        if(temcanvas.style.display == "block"){
                temcanvas.style.display = "none"
                humcanvas.style.display = "block"}
        else {
                temcanvas.style.display = "block"
                humcanvas.style.display = "none"
			}
		}
		function startsub(){
				subscribe("temperature");
				subscribe("humidity");
		}
		
		window.addEventListener("load", drawChart); // load 이벤트가 발생하면 drawChart() 호출하도록 등록		