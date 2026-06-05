from ultralytics import YOLO

model = YOLO("runs/detect/train-3/weights/best.pt")

results = model.predict(
    source="dent1.jpg",
    save=True,
    conf=0.25
)

print("Done!")