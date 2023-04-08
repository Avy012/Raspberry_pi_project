var port = 9001 // mosquitto의 디폴트 웹 포트
var client = null; // null이면 연결되지 않았음

function startConnect() { // 접속을 시도하는 함수
        clientID = "clientID-" + parseInt(Math.random() * 100); // 랜덤한 사용자 ID 생성

        // 사용자가 입력한 브로커의 IP 주소와 포트 번호 알아내기
        broker = document.getElementById("broker").value; // 브로커의 IP 주소

        client = new Paho.MQTT.Client(broker, Number(port), clientID);

        // client 객체에 콜백 함수 등록
        client.onConnectionLost = onConnectionLost; // 접속이 끊어졌을 때 실행되는 함수 등록
        client.onMessageArrived = onMessageArrived; // 메시지가 도착하였을 때 실행되는 함수 등록

        client.connect({
                onSuccess: onConnect,
        });
}

var isConnected = false;

function onConnect() { // 브로커로의 접속이 성공할 때 호출되는 함수
        isConnected = true;

        document.getElementById("messages").innerHTML += '<span>Connected</span><br/>';
}

var topicSave;
function subscribe(topic) {
        if(client == null) return;
        if(isConnected != true) {
                topicSave = topic;
                window.setTimeout("subscribe(topicSave)", 500);
                return
        }
        // 토픽으로 subscribe 하고 있음을 id가 message인 DIV에 출력
        document.getElementById("messages").innerHTML += '<span>Subscribing to: ' + topic + '</span><br/>';
        client.subscribe(topic); // 브로커에 subscribe
}
function publish(topic, msg) {
        if(client == null) return; // 연결되지 않았음
        client.send(topic, msg, 0, false);
        if(msg==1){
			console.log("detector on")}
			else if(msg==0){
					console.log("detector off")}
	}
	
	function unsubscribe(topic) {
			if(client == null || isConnected != true) return;
	
			// 토픽으로 subscribe 하고 있음을 id가 message인 DIV에 출력
			document.getElementById("messages").innerHTML += '<span>Unsubscribing to: ' + topic + '</span><br/>';
	
			client.unsubscribe(topic, null); // 브로커에 subscribe
	}
	
	// 접속이 끊어졌을 때 호출되는 함수
	function onConnectionLost(responseObject) { // 매개변수인 responseObject는 응답 패킷의 정보를 담은 개체
			document.getElementById("messages").innerHTML += '<span>오류 : 접속 끊어짐</span><br/>';
			if (responseObject.errorCode !== 0) {
					document.getElementById("messages").innerHTML += '<span>오류 : ' + + responseObject.errorMessage + '</span><br/>';
			}
	}
	
	// 메시지가 도착할 때 호출되는 함수
	function onMessageArrived(msg) { 
			topic=msg.destinationName;
			if(topic=="temperature"){//토픽이 temperature일때 
					addChartDatat(parseFloat(msg.payloadString));
			}
			else if(topic=="humidity"){//토픽이 humidity일때 
					addChartDatah(parseFloat(msg.payloadString));
			}
			else if(topic=="image"){//토픽이 image일때 
					drawImage(msg.payloadString);
			}
	}
	
	
	function startDisconnect() {
			client.disconnect(); // 브로커에 접속 해제
			document.getElementById("messages").innerHTML += '<span>Disconnected</span><br/>';
	}
	
	