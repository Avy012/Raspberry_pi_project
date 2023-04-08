import time
import os #스피커 사용을 위해
import paho.mqtt.client as mqtt
import RPi.GPIO as GPIO
from adafruit_htu21d import HTU21D
import busio
import ult # 초음파 센서 입력 모듈 임포트
import led #led 모듈 임포트
import temp #온/습도 임포트
import camera#카메라 임포트

flag=False #거리감지 on/off
cam=False #카메라 on/off
def on_connect(client, userdata, flag, rc):

        client.subscribe("start", qos = 0)
        client.subscribe("cam",qos=0)

def on_message(client, userdata, msg) :
        global flag
        global cam
        command=msg.payload.decode("utf-8")
        if(command=="action"):#msg 값에 따라 카메라 on/off
                cam=True
        elif(command=="stop"):
                cam=False
        else:
                msg = int(msg.payload)#msg값에 따라 거리감지on/off
                if(msg==1):
                        flag=True
                elif(msg==0):
                        flag=False

broker_ip = "localhost" # 현재 이 컴퓨터를 브로커로 설정

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect(broker_ip, 1883)
client.loop_start()

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

sda=2
scl=3
i2c=busio.I2C(scl,sda)
sens=HTU21D(i2c)
onoff=0
while(True):
        tem=int(temp.getTemperature(sensor=sens))
        client.publish("temperature",tem,qos=0)
        humm=int(temp.getHumidity(sensor=sens))
        client.publish("humidity",humm,qos=0)
        if(flag==True):
                for i in range(10):#원래는 1시간마다 온습도측정, 편의상 10초마다로 설정
                        distance = ult.measureDistance(20,16)
                        if(distance <= 10): #일정거리 이내 일 때
                                if(cam==True):
                                        imageFileName,human=camera.takePicture()


                                        client.publish("image",imageFileName,qos=0)
                                        if(human==True):

                                                continue
                                led.led(6,onoff)
                                onoff=0 if onoff==1 else 1
                                os.system("mpg321 alarm.mp3")#저장된 mp3파일(알람) 재생
                        time.sleep(1)
        else:
                time.sleep(10)

client.loop_stop()
client.disconnect()
