from ultralytics.data.converter import convert_coco

convert_coco(
    labels_dir="dataset/CarDD_COCO/annotations",
    use_segments=False
)

print("Conversion Complete!")