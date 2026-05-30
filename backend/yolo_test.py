from ultralytics import YOLO

# LOAD YOLO MODEL
model = YOLO("yolov8n.pt")

# TEST IMAGE
results = model("swift.jpg")

# SHOW RESULT
results[0].show()

# PRINT DETECTED OBJECTS
for box in results[0].boxes:
    class_id = int(box.cls[0])

    class_name = model.names[class_id]

    confidence = float(box.conf[0])

    print(f"Detected: {class_name} ({confidence:.2f})")

