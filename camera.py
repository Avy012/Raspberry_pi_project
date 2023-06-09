import os; import io; import time
import picamera
import cv2; import numpy as np
fileName = ""
stream = io.BytesIO()
camera = picamera.PiCamera()
camera.start_preview()

def takePicture() :

global fileName, stream, camera
        global human
        human=False
        if len(fileName) != 0:
                os.unlink(fileName)

        stream.seek(0)
        stream.truncate()
        camera.capture(stream, format='jpeg', use_video_port=True)
        data = np.frombuffer(stream.getvalue(), dtype=np.uint8)
        image = cv2.imdecode(data, 1)
        #사람 얼굴 인식 분류검출기 
        haar=cv2.CascadeClassifier('./haarCascades/haar-cascade-files-master/haarcascade_frontalface_default.xml')
        image_gray=cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        faces=haar.detectMultiScale(image_gray,1.1,3)
        for x,y,w,h in faces:
                 cv2.rectangle(image,(x,y),(x+w,y+h),(255,0,0),2)
                 human=True

        takeTime = time.time()
        fileName = "./static/%d.jpg" % (takeTime * 10)
        cv2.imwrite(fileName, image)
        return fileName,human

if __name__ == '__main__' :
        while(True):
                name = takePicture()
                print("fname= %s" % name)
