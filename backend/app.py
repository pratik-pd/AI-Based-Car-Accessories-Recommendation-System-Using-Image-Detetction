from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

from ultralytics import YOLO
from PIL import Image

from db import (users_collection, reports_collection, accessories_collection, orders_collection)
from bson import ObjectId

import razorpay

client = razorpay.Client(
    auth=(
        "rzp_test_SzoFHt38620ZOw",
        "QFopmOVf7BAlbyYFth4m820V"
    )
)
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

# =================================
# DYNAMIC ACCESSORY RECOMMENDATIONS
# =================================
ACCESSORIES_RECOMMENDATIONS = {
    "dent": [
        {
            "id": 1,
            "name": "Car Dent Puller Kit",
            "price": "₹1,499",
            "rating": 4.2,
            "image": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e",
            "description": "Professional-grade suction cup dent puller, ideal for removing dents from car doors and bumpers."
        },
        {
            "id": 2,
            "name": "Body Repair Filler Paste",
            "price": "₹399",
            "rating": 4.1,
            "image": "https://images.unsplash.com/photo-1507136566006-cfc505b114fc",
            "description": "Easy-to-use filler paste for minor scratches, dents, and surface imperfections."
        },
        {
            "id": 3,
            "name": "Paint Touch-Up Brush Kit",
            "price": "₹499",
            "rating": 4.3,
            "image": "https://images.unsplash.com/photo-1563720223185-11003d516935",
            "description": "Color-matching paint applicator brush to cover metal surfaces after dent extraction."
        }
    ],
    "scratch": [
        {
            "id": 1,
            "name": "Premium Scratch Remover Polish",
            "price": "₹349",
            "rating": 4.5,
            "image": "https://images.unsplash.com/photo-1607860108855-64acf2078ed9",
            "description": "Advanced compound that easily removes light scratches, swirls, and paint transfer from your vehicle's finish."
        },
        {
            "id": 2,
            "name": "Car Ceramic Coating Kit",
            "price": "₹1,999",
            "rating": 4.6,
            "image": "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
            "description": "Provides a high-gloss protective shield for your paint to prevent future minor scratches."
        },
        {
            "id": 3,
            "name": "Microfiber Cleaning Towels Pack",
            "price": "₹299",
            "rating": 4.7,
            "image": "https://images.unsplash.com/photo-1528190336454-13cd56b45b5a",
            "description": "Ultra-soft microfiber towels to apply scratch removers and polish without leaving swirls."
        }
    ],
    "crack": [
        {
            "id": 1,
            "name": "Heavy Duty Plastic Bumper Adhesive",
            "price": "₹599",
            "rating": 4.3,
            "image": "https://images.unsplash.com/photo-1486006920555-c77dce18193b",
            "description": "High-strength structural epoxy adhesive designed specifically for repairs on bumpers and body panels."
        },
        {
            "id": 2,
            "name": "Carbon Fiber Style Vinyl Wrap",
            "price": "₹450",
            "rating": 4.2,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341",
            "description": "Durable and weather-proof vinyl wrap to cover and reinforce cracked body panels."
        },
        {
            "id": 3,
            "name": "Universal Bumper Guard Protectors",
            "price": "₹799",
            "rating": 4.4,
            "image": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
            "description": "Set of rubber guards to mount over bumper corners, masking small cracks and preventing future impacts."
        }
    ],
    "glass_shatter": [
        {
            "id": 1,
            "name": "Windshield Glass Repair Resin Kit",
            "price": "₹399",
            "rating": 4.4,
            "image": "https://images.unsplash.com/photo-1506015391300-4802dc74de2e",
            "description": "Fills windshield chips and bulls-eye cracks to restore visibility and stop cracks from spreading."
        },
        {
            "id": 2,
            "name": "Windshield Safety Protective Film",
            "price": "₹1,299",
            "rating": 4.1,
            "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
            "description": "Ultra-clear exterior windshield film that absorbs road hazard impacts and keeps shattered glass intact."
        },
        {
            "id": 3,
            "name": "Foldable Car Windshield Sun Shade",
            "price": "₹399",
            "rating": 4.3,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
            "description": "Reduces cabin heat and UV rays, preventing thermal expansion from worsening glass cracks."
        }
    ],
    "lamp_broken": [
        {
            "id": 1,
            "name": "Replacement LED Headlight Bulbs",
            "price": "₹1,899",
            "rating": 4.6,
            "image": "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7",
            "description": "Bright energy-efficient LED bulbs to replace damaged headlight cores and restore nocturnal safety."
        },
        {
            "id": 2,
            "name": "Headlight Clear Polish & Restoration Kit",
            "price": "₹399",
            "rating": 4.5,
            "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d",
            "description": "Restores dull, yellowed, and hazy headlights to brand-new clarity."
        },
        {
            "id": 3,
            "name": "Smoke Headlight Tint Protective Film",
            "price": "₹299",
            "rating": 4.2,
            "image": "https://images.unsplash.com/photo-1580273916550-e323be2ae537",
            "description": "Self-adhesive protective film wrap that shields headlights and taillights from stones and gravel."
        }
    ],
    "tire_flat": [
        {
            "id": 1,
            "name": "Portable Digital Tire Inflator",
            "price": "₹2,499",
            "rating": 4.8,
            "image": "https://images.unsplash.com/photo-1580273916550-e323be2ae537",
            "description": "12V DC portable air compressor with auto shut-off, ideal for filling flat tires in emergencies."
        },
        {
            "id": 2,
            "name": "Heavy Duty Tubeless Tire Repair Kit",
            "price": "₹299",
            "rating": 4.6,
            "image": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e",
            "description": "Includes high-quality T-handle tools and self-vulcanizing plugs to patch tire punctures on the go."
        },
        {
            "id": 3,
            "name": "Digital Tire Pressure Gauge",
            "price": "₹499",
            "rating": 4.5,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
            "description": "Precise digital gauge to regularly check and maintain correct tire pressure for safety."
        }
    ]
}

GENERAL_RECOMMENDATIONS = [
    {
        "id": 1,
        "name": "Premium Leather Seat Covers Set",
        "price": "₹2,999",
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1502877338535-766e1452684a",
        "description": "High-quality leatherette seat covers custom-tailored for maximum comfort and styling."
    },
    {
        "id": 2,
        "name": "Android Infotainment Display",
        "price": "₹8,999",
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1502877338535-766e1452684a",
        "description": "High-definition touchscreen display with GPS navigation, Bluetooth, and Apple CarPlay/Android Auto support."
    },
    {
        "id": 3,
        "name": "Dual Lens Full HD Car Dashcam",
        "price": "₹3,499",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b",
        "description": "Dual-channel dashcam capturing front and rear footage with high-definition night vision."
    },
    {
        "id": 4,
        "name": "Luxury 7D Custom Floor Mats",
        "price": "₹1,999",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1504215680853-026ed2a45def",
        "description": "All-weather water-proof luxury styling floor mats with diamond stitching."
    }
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
            "password": hashed_password,
            "role": "user",
            "created_at": str(datetime.now())
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
                "email": user["email"],
                "role": user.get("role", "user")
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

        # YOLO Prediction with optimized confidence threshold and image size
        results = model(image, conf=0.25, imgsz=640)

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
        # DYNAMIC RECOMMENDATIONS MAPPING
        # ======================
        db_recs = list(accessories_collection.find({"damage_type": prediction}))
        if not db_recs:
            db_recs = list(accessories_collection.find({"damage_type": "general"}))
        
        recommendations = []
        for r in db_recs:
            recommendations.append({
                "id": str(r["_id"]),
                "name": r["name"],
                "price": r["price"],
                "rating": r.get("rating", 4.0),
                "image": r["image"],
                "description": r["description"]
            })

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

        "recommendations": recommendations,

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

            "recommendations": recommendations,

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

                "recommendations":
                report.get("recommendations", []),

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

#==========================
# Create Order
# =========================        

@app.route("/create-order", methods=["POST"])
def create_order():
    try:
        data = request.get_json()

        print("Received Data:", data)

        amount = int(data["amount"])

        print("Amount Received:", amount)

        order = client.order.create({
            "amount": amount * 100,
            "currency": "INR",
            "payment_capture": 1
        })

        print("Order Created:", order)

        return jsonify(order)

    except Exception as e:
        print("ERROR:", e)

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500
# =================================
# VERIFY PAYMENT & LOG ORDER
# =================================
@app.route("/verify-payment", methods=["POST"])
def verify_payment():
    try:
        data = request.get_json()
        print("Payment Verification Data:", data)
        
        order_id = data.get("order_id")
        payment_id = data.get("payment_id")
        user_id = data.get("user_id")
        amount = data.get("amount")
        items = data.get("items", [])
        
        user_email = "Unknown"
        if user_id:
            try:
                user = users_collection.find_one({"_id": ObjectId(user_id)})
                if user:
                    user_email = user.get("email", "Unknown")
            except Exception as e:
                print("Error finding user:", e)
                
        order_doc = {
            "order_id": order_id,
            "payment_id": payment_id,
            "user_id": user_id,
            "user_email": user_email,
            "amount": amount,
            "items": items,
            "status": "Paid",
            "created_at": str(datetime.now())
        }
        
        orders_collection.insert_one(order_doc)
        print("Logged Order:", order_doc)
        
        return jsonify({
            "success": True,
            "message": "Payment verified and order successfully logged."
        })
    except Exception as e:
        print("Error verifying payment:", e)
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

# =================================
# ADMIN ENDPOINTS
# =================================

@app.route("/admin/stats", methods=["GET"])
def admin_stats():
    try:
        total_users = users_collection.count_documents({})
        total_scans = reports_collection.count_documents({})
        total_orders = orders_collection.count_documents({})
        total_accs = accessories_collection.count_documents({})
        
        orders = list(orders_collection.find({}))
        total_revenue = sum(int(o.get("amount", 0)) for o in orders)
        
        reports = list(reports_collection.find({}))
        avg_health = 0
        if reports:
            healths = []
            for r in reports:
                h = r.get("vehicle_health", "0%")
                try:
                    h_val = int(str(h).replace("%", ""))
                    healths.append(h_val)
                except ValueError:
                    pass
            if healths:
                avg_health = round(sum(healths) / len(healths))
                
        damage_counter = {}
        for r in reports:
            dmg = r.get("prediction", "Unknown")
            damage_counter[dmg] = damage_counter.get(dmg, 0) + 1
        most_common_damage = max(damage_counter, key=damage_counter.get) if damage_counter else "None"
        
        damage_distribution = [{"name": k, "value": v} for k, v in damage_counter.items()]
        
        sales_by_date = {}
        for o in orders:
            created_at = o.get("created_at", "")
            if created_at:
                date_str = created_at.split(" ")[0]
                try:
                    dt = datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S.%f")
                    short_date = dt.strftime("%b %d")
                except Exception:
                    try:
                        dt = datetime.strptime(date_str, "%Y-%m-%d")
                        short_date = dt.strftime("%b %d")
                    except Exception:
                        short_date = date_str
                sales_by_date[short_date] = sales_by_date.get(short_date, 0) + int(o.get("amount", 0))
        
        sales_timeline = [{"date": k, "revenue": v} for k, v in sales_by_date.items()]
        sales_timeline = sorted(sales_timeline, key=lambda x: x["date"])[-7:]
        
        scans_by_date = {}
        for r in reports:
            created_at = r.get("created_at", "")
            if created_at:
                date_str = created_at.split(" ")[0]
                try:
                    dt = datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S.%f")
                    short_date = dt.strftime("%b %d")
                except Exception:
                    try:
                        dt = datetime.strptime(date_str, "%Y-%m-%d")
                        short_date = dt.strftime("%b %d")
                    except Exception:
                        short_date = date_str
                scans_by_date[short_date] = scans_by_date.get(short_date, 0) + 1
        
        scans_timeline = [{"date": k, "scans": v} for k, v in scans_by_date.items()]
        scans_timeline = sorted(scans_timeline, key=lambda x: x["date"])[-7:]

        return jsonify({
            "success": True,
            "stats": {
                "total_users": total_users,
                "total_scans": total_scans,
                "total_orders": total_orders,
                "total_accessories": total_accs,
                "total_revenue": total_revenue,
                "avg_health": avg_health,
                "most_common_damage": most_common_damage,
                "damage_distribution": damage_distribution,
                "sales_timeline": sales_timeline,
                "scans_timeline": scans_timeline
            }
        })
    except Exception as e:
        print("Error getting admin stats:", e)
        return jsonify({"success": False, "message": str(e)}), 500

@app.route("/admin/users", methods=["GET"])
def admin_users():
    try:
        users = list(users_collection.find({}))
        user_list = []
        for u in users:
            user_list.append({
                "id": str(u["_id"]),
                "name": u.get("name"),
                "email": u.get("email"),
                "role": u.get("role", "user"),
                "created_at": u.get("created_at", "N/A"),
                "status": u.get("status", "active")
            })
        return jsonify({"success": True, "users": user_list})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

@app.route("/admin/users/<user_id>", methods=["PUT"])
def admin_update_user(user_id):
    try:
        data = request.get_json()
        update_fields = {}
        if "role" in data:
            update_fields["role"] = data["role"]
        if "status" in data:
            update_fields["status"] = data["status"]
            
        users_collection.update_one({"_id": ObjectId(user_id)}, {"$set": update_fields})
        return jsonify({"success": True, "message": "User updated successfully."})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

@app.route("/admin/scans", methods=["GET"])
def admin_scans():
    try:
        reports = list(reports_collection.find({}).sort("_id", -1))
        report_list = []
        for r in reports:
            user_email = "Unknown"
            user_id = r.get("user_id")
            if user_id:
                try:
                    user = users_collection.find_one({"_id": ObjectId(user_id)})
                    if user:
                        user_email = user.get("email", "Unknown")
                except Exception:
                    pass
            
            report_list.append({
                "id": str(r["_id"]),
                "user_id": user_id,
                "user_email": user_email,
                "prediction": r.get("prediction"),
                "confidence": r.get("confidence"),
                "damage_level": r.get("damage_level"),
                "repair_cost": r.get("repair_cost"),
                "vehicle_health": r.get("vehicle_health"),
                "prediction_image": r.get("prediction_image"),
                "created_at": r.get("created_at")
            })
        return jsonify({"success": True, "scans": report_list})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

@app.route("/admin/orders", methods=["GET"])
def admin_orders():
    try:
        orders = list(orders_collection.find({}).sort("_id", -1))
        order_list = []
        for o in orders:
            order_list.append({
                "id": str(o["_id"]),
                "order_id": o.get("order_id"),
                "payment_id": o.get("payment_id"),
                "user_email": o.get("user_email", "Unknown"),
                "amount": o.get("amount"),
                "items": o.get("items", []),
                "status": o.get("status", "Paid"),
                "created_at": o.get("created_at")
            })
        return jsonify({"success": True, "orders": order_list})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

@app.route("/admin/accessories", methods=["GET", "POST"])
def admin_accessories():
    if request.method == "GET":
        try:
            accs = list(accessories_collection.find({}))
            acc_list = []
            for a in accs:
                acc_list.append({
                    "id": str(a["_id"]),
                    "damage_type": a.get("damage_type"),
                    "name": a.get("name"),
                    "price": a.get("price"),
                    "rating": a.get("rating", 4.0),
                    "image": a.get("image"),
                    "description": a.get("description")
                })
            return jsonify({"success": True, "accessories": acc_list})
        except Exception as e:
            return jsonify({"success": False, "message": str(e)}), 500
            
    elif request.method == "POST":
        try:
            data = request.get_json()
            new_acc = {
                "damage_type": data.get("damage_type"),
                "name": data.get("name"),
                "price": data.get("price"),
                "rating": float(data.get("rating", 4.0)),
                "image": data.get("image"),
                "description": data.get("description")
            }
            accessories_collection.insert_one(new_acc)
            return jsonify({"success": True, "message": "Accessory added successfully."})
        except Exception as e:
            return jsonify({"success": False, "message": str(e)}), 500

@app.route("/admin/accessories/<acc_id>", methods=["PUT", "DELETE"])
def admin_accessory_detail(acc_id):
    if request.method == "PUT":
        try:
            data = request.get_json()
            update_fields = {
                "damage_type": data.get("damage_type"),
                "name": data.get("name"),
                "price": data.get("price"),
                "rating": float(data.get("rating", 4.0)),
                "image": data.get("image"),
                "description": data.get("description")
            }
            accessories_collection.update_one({"_id": ObjectId(acc_id)}, {"$set": update_fields})
            return jsonify({"success": True, "message": "Accessory updated successfully."})
        except Exception as e:
            return jsonify({"success": False, "message": str(e)}), 500
            
    elif request.method == "DELETE":
        try:
            accessories_collection.delete_one({"_id": ObjectId(acc_id)})
            return jsonify({"success": True, "message": "Accessory deleted successfully."})
        except Exception as e:
            return jsonify({"success": False, "message": str(e)}), 500

# =========================
# RUN SERVER
# =========================
if __name__ == "__main__":
    app.run(debug=True)