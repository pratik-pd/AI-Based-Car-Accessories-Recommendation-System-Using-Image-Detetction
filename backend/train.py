from ultralytics import YOLO
from multiprocessing import freeze_support

def main():
    # Upgrade to Small model (yolov8s.pt) for better capacity and detection accuracy
    model = YOLO("yolov8s.pt")

    model.train(
        data="dataset_yolo/data.yaml",
        epochs=100,
        patience=15,       # Early stopping if validation loss stops improving for 15 epochs
        imgsz=640,
        batch=8,
        device=0,
        workers=0,
        # Data Augmentations
        degrees=15.0,      # Random rotation range
        hsv_h=0.015,       # Hue adjustment
        hsv_s=0.7,         # Saturation adjustment
        hsv_v=0.4,         # Brightness adjustment
        fliplr=0.5,        # Horizontal flip probability
        mosaic=1.0         # Enable mosaic augmentation to help detect small defects
    )

if __name__ == "__main__":
    freeze_support()
    main()