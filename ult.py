import time
import RPi.GPIO as GPIO

trig=20
echo=16
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(trig, GPIO.OUT)
GPIO.setup(echo, GPIO.IN)
GPIO.output(trig, False)

def measureDistance(trig, echo):
        time.sleep(0.5)
        GPIO.output(trig, True)
        time.sleep(0.00001)
        GPIO.output(trig, False)

        while(GPIO.input(echo) == 0):
                pass
        pulse_start = time.time()
        while(GPIO.input(echo) == 1):
                pass
        pulse_end = time.time()

        pulse_duration = pulse_end - pulse_start
        return 340*100/2*pulse_duration

