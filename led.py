import time
import RPi.GPIO as GPIO

def led(led, onoff):
        GPIO.setmode(GPIO.BCM)
        GPIO.setwarnings(False)
        GPIO.setup(led,GPIO.OUT)
        GPIO.output(led,onoff)

if __name__ == '__main__':
        onoff=0
        while(True):
                led(6,onoff)
                onoff=0 if onoff==1 else 1
                time.sleep(1)
