from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

from ultralytics import YOLO
from PIL import Image

from db import (users_collection,reports_collection)

import cv2
import bcrypt
import io
import os
from reportlab.platypus import(
    SimpleDocTemplate,
    Paragraph,
    Spacer,
)

from reportlab.lib.styles import getSampleStyleSheet

from datetime import datetime

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email import encoders

EMAIL_ADDRESS = "p03096840@gmail.com"
EMAIL_PASSWORD = "gcfg xork akmh oyyn"

# =========================
# CREATE APP
# =========================
app = Flask(__name__)

CORS(app)

# =========================
# LOAD YOLO MODEL
# =========================
model = YOLO("best.pt")

# =========================
# DAMAGE CLASSES
# =========================
damage_classes = [
    "dent",
    "scratch",
    "crack",
    "glass_shatter",
    "lamp_broken",
    "tire_flat"
]

# =========================
# HOME ROUTE
# =========================
@app.route("/")
def home():
    return "🚗 AI Damage Detection Backend Running"


# =========================
# SIGNUP ROUTE
# =========================
@app.route("/signup", methods=["POST"])
def signup():

    try:

        data = request.json

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        if not name or not email or not password:
            return jsonify({
                "success": False,
                "message": "Please fill all fields"
            })

        existing_user = users_collection.find_one(
            {"email": email}
        )

        if existing_user:
            return jsonify({
                "success": False,
                "message": "User already exists"
            })

        hashed_password = bcrypt.hashpw(
            password.encode("utf-8"),
            bcrypt.gensalt()
        )

        users_collection.insert_one({
            "name": name,
            "email": email,
            "password": hashed_password
        })

        return jsonify({
            "success": True,
            "message": "Signup Successful"
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        })


# =========================
# LOGIN ROUTE
# =========================
@app.route("/login", methods=["POST"])
def login():

    try:

        data = request.json

        email = data.get("email")
        password = data.get("password")

        user = users_collection.find_one(
            {"email": email}
        )

        if not user:
            return jsonify({
                "success": False,
                "message": "User not found"
            })

        if not bcrypt.checkpw(
            password.encode("utf-8"),
            user["password"]
        ):
            return jsonify({
                "success": False,
                "message": "Invalid Password"
            })

        return jsonify({

            "success": True,
            "message": "Login Successful",
            "token": str(user["_id"]),

            "user": {
                "name": user["name"],
                "email": user["email"]
            }
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        })


# =========================
# PREDICT ROUTE
# =========================
@app.route("/predict", methods=["POST"])
def predict():

    try:

        if "image" not in request.files:
            return jsonify({
                "success": False,
                "message": "No image uploaded"
            })

        file = request.files["image"]

        user_id = request.form.get("user_id")

        img_bytes = file.read()

        image = Image.open(
            io.BytesIO(img_bytes)
        )

        # YOLO Prediction
        results = model(image)

        #Create static folder if missing
        os.makedirs("static", exist_ok=True)

        #Draw bounding boxes 
        annotated_image = results[0].plot()

        annotated_image = cv2.cvtColor(
            annotated_image,
            cv2.COLOR_BGR2RGB
        )

        # Save image
        filename = f"{datetime.now().timestamp()}.jpg"

        prediction_path = f"static/{filename}"

        # from PIL import Image
        Image.fromarray(annotated_image).save(prediction_path)

        detections = []

        for box in results[0].boxes:

            class_id = int(box.cls[0])

            class_name = model.names[class_id]

            confidence = round(
                float(box.conf[0]) * 100,
                2
            )

            detections.append({
                "damage_type": class_name,
                "confidence": confidence
            })

        # No Damage Found
        if len(detections) == 0:

            return jsonify({
                "success": False,
                "message": "No damage detected"
            })

        # Highest Confidence Damage
        top_damage = max(
            detections,
            key=lambda x: x["confidence"]
        )

        prediction = top_damage["damage_type"]

        confidence = top_damage["confidence"]

        damage_status = "Damage Detected"

        damage_level = "Low"

        repair_cost = "₹5,000"

        vehicle_health = "95%"

        replacement_needed = "No"

        # ======================
        # DAMAGE RULES
        # ======================

        if prediction == "dent":

            damage_level = "Medium"
            repair_cost = "₹8,000 - ₹15,000"
            vehicle_health = "85%"

        elif prediction == "scratch":

            damage_level = "Low"
            repair_cost = "₹2,000 - ₹5,000"
            vehicle_health = "92%"

        elif prediction == "crack":

            damage_level = "High"
            repair_cost = "₹15,000 - ₹35,000"
            vehicle_health = "70%"
            replacement_needed = "Yes"

        elif prediction == "glass_shatter":

            damage_level = "High"
            repair_cost = "₹10,000 - ₹25,000"
            vehicle_health = "65%"
            replacement_needed = "Yes"

        elif prediction == "lamp_broken":

            damage_level = "Medium"
            repair_cost = "₹3,000 - ₹10,000"
            vehicle_health = "80%"
            replacement_needed = "Yes"

        elif prediction == "tire_flat":

            damage_level = "Medium"
            repair_cost = "₹1,000 - ₹6,000"
            vehicle_health = "75%"

        # ======================
        # AI SUMMARY
        # ======================

        ai_summary = f"""
Damage Analysis Report

Detected Damage: {prediction}

Confidence: {confidence}%

Damage Level: {damage_level}

Vehicle Health: {vehicle_health}

Estimated Repair Cost: {repair_cost}

Replacement Needed: {replacement_needed}

Recommendation:
Professional inspection is recommended before repair decisions are made.
"""

        # ======================
        # AI INSIGHTS
        # ======================

        ai_insights = [

            f"Detected damage type: {prediction}.",

            f"Confidence score: {confidence}%",

            f"Damage severity classified as {damage_level}.",

            "Repair should be scheduled soon.",

            "AI recommends detailed inspection.",

            "Vehicle safety should be checked before long trips."
        ]


        # ======================
        # SAVE REPORT TO DB
        # ======================

        reports_collection.insert_one({

         "user_id": user_id,

        "prediction": prediction,

        "confidence": confidence,

        "damage_level": damage_level,

        "repair_cost": repair_cost,

        "vehicle_health": vehicle_health,

        "replacement_needed": replacement_needed,

        "prediction_image":
        f"http://127.0.0.1:5000/static/{filename}",

        "created_at": str(datetime.now())

    })

        # ======================
        # RESPONSE
        # ======================

        return jsonify({

            "success": True,

            "prediction": prediction,

            "confidence": confidence,

            "damage_status": damage_status,

            "damage_level": damage_level,

            "replacement_needed": replacement_needed,

            "repair_cost": repair_cost,

            "vehicle_health": vehicle_health,

            "ai_summary": ai_summary,

            "ai_insights": ai_insights,

            "all_detections": detections,

            "prediction_image": f"http://127.0.0.1:5000/static/{filename}",
        })

    except Exception as e:

        print(e)

        return jsonify({
            "success": False,
            "message": str(e)
        })
    
    # =========================
    # SERVE PREDICTION IMAGE
    # =========================
@app.route("/static/<path:filename>")
def serve_static(filename):

    return send_from_directory(
        "static",
        filename
    )

@app.route("/generate-report", methods=["POST"])
def generate_report():

    try:

        data = request.json

        os.makedirs("static", exist_ok=True)

        pdf_file = "static/vehicle_report.pdf"

        doc = SimpleDocTemplate(pdf_file)

        styles = getSampleStyleSheet()

        content = []

        content.append(
            Paragraph(
                "AI Vehicle Damage Report",
                styles["Title"]
            )
        )

        content.append(Spacer(1, 20))

        content.append(
            Paragraph(
                f"Detected Damage: {data['prediction']}",
                styles["Normal"]
            )
        )

        content.append(
            Paragraph(
                f"Confidence: {data['confidence']}",
                styles["Normal"]
            )
        )

        content.append(
            Paragraph(
                f"Damage Level: {data['damageLevel']}",
                styles["Normal"]
            )
        )

        content.append(
            Paragraph(
                f"Vehicle Health: {data['vehicleHealth']}",
                styles["Normal"]
            )
        )

        content.append(
            Paragraph(
                f"Repair Cost: {data['repairCost']}",
                styles["Normal"]
            )
        )

        content.append(
            Paragraph(
                f"Replacement Needed: {data['replacementNeeded']}",
                styles["Normal"]
            )
        )

        doc.build(content)

        return jsonify({
            "success": True,
            "pdf_url":
            "http://127.0.0.1:5000/static/vehicle_report.pdf"
        })
    

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        })
    

    # =========================
# REPORT HISTORY
# =========================

@app.route("/history/<user_id>", methods=["GET"])
def get_history(user_id):

    try:

        reports = []

        all_reports = reports_collection.find(
            {"user_id": user_id}
        ).sort("_id", -1)

        for report in all_reports:

            reports.append({

                "prediction":
                report.get("prediction"),

                "confidence":
                report.get("confidence"),

                "damage_level":
                report.get("damage_level"),

                "repair_cost":
                report.get("repair_cost"),

                "vehicle_health":
                report.get("vehicle_health"),

                "replacement_needed":
                report.get("replacement_needed"),

                "prediction_image":
                report.get("prediction_image")
            })

        return jsonify({

            "success": True,

            "reports": reports
        })

    except Exception as e:

        return jsonify({

            "success": False,

            "message": str(e)
        })
    

#==========================
# SEND REPORT VIA EMAIL
#==========================

@app.route("/send-report-email", methods=["POST"])
def send_report_email():

    try:

        data = request.json

        receiver_email = data["email"]

        pdf_path = "static/vehicle_report.pdf"

        msg = MIMEMultipart()

        msg["From"] = EMAIL_ADDRESS

        msg["To"] = receiver_email

        msg["Subject"] = (
            "AI Vehicle Inspection Report"
        )

        body = """
        Hello,

        Your AI Vehicle Inspection Report
        is attached.

        Thank you.
        """

        msg.attach(
            MIMEText(body, "plain")
        )

        with open(
            pdf_path,
            "rb"
        ) as attachment:

            part = MIMEBase(
                "application",
                "octet-stream"
            )

            part.set_payload(
                attachment.read()
            )

        encoders.encode_base64(part)

        part.add_header(
            "Content-Disposition",
            "attachment; filename=vehicle_report.pdf"
        )

        msg.attach(part)

        server = smtplib.SMTP(
            "smtp.gmail.com",
            587
        )

        server.starttls()

        server.login(
            EMAIL_ADDRESS,
            EMAIL_PASSWORD
        )

        server.send_message(msg)

        server.quit()

        return jsonify({
            "success": True,
            "message":
            "Email Sent Successfully"
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        })

#==========================      
# DASHBOARD ANALYTICS
#==========================

@app.route("/analytics/<user_id>", methods=["GET"])
def analytics(user_id):
    try:

        reports = list(
            reports_collection.find(
                {"user_id": user_id}
            )
        )

        total_scans = len(reports)

        if total_scans == 0:

            return jsonify({
                "success": True,
                "total_scans": 0,
                "avg_health": 0,
                "critical_reports": 0,
                "most_common_damage" : "None"
            })
        
        damage_counter ={}

        health_values = []

        critical_reports = 0

        for report in reports:

            damage = report.get("prediction", "Unknown")

            damage_counter[damage] = (
                damage_counter.get(damage, 0) + 1
            )
            health = report.get("vehicle_health", "0%")
            health = int(str(health).replace("%", ""))
            health_values.append(health)

            if report.get("damage_level") == "High":
                critical_reports += 1

                most_common_damage = max(
                    damage_counter,
                    key=damage_counter.get
                )
                avg_health = round(
                    sum(health_values) / len(health_values),
                )

        return jsonify({
            "success": True,
            "total_scans": total_scans,
            "avg_health": avg_health,
            "critical_reports": critical_reports,
            "most_common_damage" : most_common_damage,
            "damage_distribution" : damage_counter
        })
    
    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        })
            

# =========================
# RUN SERVER
# =========================
if __name__ == "__main__":

    app.run(debug=True)