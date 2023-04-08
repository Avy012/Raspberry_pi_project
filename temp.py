import time
import paho.mqtt.client as mqtt

import RPi.GPIO as GPIO
from adafruit_htu21d import HTU21D
import busio

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

sda = 2 
scl = 3 
i2c = busio.I2C(scl, sda)
sensor = HTU21D(i2c) 

def getTemperature(sensor) :#온도
        return int(sensor.temperature) 
def getHumidity(sensor) :#습도
        return int(sensor.relative_humidity) 

if __name__=="__main__":
        client=mqtt.Client()
        temp=getTemperature(sensor)
        client.publish("temperature",temp)




