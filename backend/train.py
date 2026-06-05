from ultralytics import YOLO
from multiprocessing import freeze_support

def main():
    model = YOLO("yolov8n.pt")

    model.train(
        data="dataset_yolo/data.yaml",
        epochs=100,
        imgsz=640,
        batch=8,
        device=0,
        workers=0
    )

if __name__ == "__main__":
    freeze_support()
    main()