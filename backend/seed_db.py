import bcrypt
from datetime import datetime
from db import users_collection, accessories_collection

# Default accessories data grouped by damage type
DEFAULT_ACCESSORIES = [
    # DENT ACCESSORIES
    {
        "damage_type": "dent",
        "name": "Car Dent Puller Kit",
        "price": "₹1,499",
        "rating": 4.2,
        "image": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e",
        "description": "Professional-grade suction cup dent puller, ideal for removing dents from car doors and bumpers."
    },
    {
        "damage_type": "dent",
        "name": "Body Repair Filler Paste",
        "price": "₹399",
        "rating": 4.1,
        "image": "https://images.unsplash.com/photo-1507136566006-cfc505b114fc",
        "description": "Easy-to-use filler paste for minor scratches, dents, and surface imperfections."
    },
    {
        "damage_type": "dent",
        "name": "Paint Touch-Up Brush Kit",
        "price": "₹499",
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1563720223185-11003d516935",
        "description": "Color-matching paint applicator brush to cover metal surfaces after dent extraction."
    },
    # SCRATCH ACCESSORIES
    {
        "damage_type": "scratch",
        "name": "Premium Scratch Remover Polish",
        "price": "₹349",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1607860108855-64acf2078ed9",
        "description": "Advanced compound that easily removes light scratches, swirls, and paint transfer from your vehicle's finish."
    },
    {
        "damage_type": "scratch",
        "name": "Car Ceramic Coating Kit",
        "price": "₹1,999",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
        "description": "Provides a high-gloss protective shield for your paint to prevent future minor scratches."
    },
    {
        "damage_type": "scratch",
        "name": "Microfiber Cleaning Towels Pack",
        "price": "₹299",
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1528190336454-13cd56b45b5a",
        "description": "Ultra-soft microfiber towels to apply scratch removers and polish without leaving swirls."
    },
    # CRACK ACCESSORIES
    {
        "damage_type": "crack",
        "name": "Heavy Duty Plastic Bumper Adhesive",
        "price": "₹599",
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1486006920555-c77dce18193b",
        "description": "High-strength structural epoxy adhesive designed specifically for repairs on bumpers and body panels."
    },
    {
        "damage_type": "crack",
        "name": "Carbon Fiber Style Vinyl Wrap",
        "price": "₹450",
        "rating": 4.2,
        "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341",
        "description": "Durable and weather-proof vinyl wrap to cover and reinforce cracked body panels."
    },
    {
        "damage_type": "crack",
        "name": "Universal Bumper Guard Protectors",
        "price": "₹799",
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
        "description": "Set of rubber guards to mount over bumper corners, masking small cracks and preventing future impacts."
    },
    # GLASS SHATTER ACCESSORIES
    {
        "damage_type": "glass_shatter",
        "name": "Windshield Glass Repair Resin Kit",
        "price": "₹399",
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1506015391300-4802dc74de2e",
        "description": "Fills windshield chips and bulls-eye cracks to restore visibility and stop cracks from spreading."
    },
    {
        "damage_type": "glass_shatter",
        "name": "Windshield Safety Protective Film",
        "price": "₹1,299",
        "rating": 4.1,
        "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
        "description": "Ultra-clear exterior windshield film that absorbs road hazard impacts and keeps shattered glass intact."
    },
    {
        "damage_type": "glass_shatter",
        "name": "Foldable Car Windshield Sun Shade",
        "price": "₹399",
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
        "description": "Reduces cabin heat and UV rays, preventing thermal expansion from worsening glass cracks."
    },
    # LAMP BROKEN ACCESSORIES
    {
        "damage_type": "lamp_broken",
        "name": "Replacement LED Headlight Bulbs",
        "price": "₹1,899",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7",
        "description": "Bright energy-efficient LED bulbs to replace damaged headlight cores and restore nocturnal safety."
    },
    {
        "damage_type": "lamp_broken",
        "name": "Headlight Clear Polish & Restoration Kit",
        "price": "₹399",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d",
        "description": "Restores dull, yellowed, and hazy headlights to brand-new clarity."
    },
    {
        "damage_type": "lamp_broken",
        "name": "Smoke Headlight Tint Protective Film",
        "price": "₹299",
        "rating": 4.2,
        "image": "https://images.unsplash.com/photo-1580273916550-e323be2ae537",
        "description": "Self-adhesive protective film wrap that shields headlights and taillights from stones and gravel."
    },
    # TIRE FLAT ACCESSORIES
    {
        "damage_type": "tire_flat",
        "name": "Portable Digital Tire Inflator",
        "price": "₹2,499",
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1580273916550-e323be2ae537",
        "description": "12V DC portable air compressor with auto shut-off, ideal for filling flat tires in emergencies."
    },
    {
        "damage_type": "tire_flat",
        "name": "Heavy Duty Tubeless Tire Repair Kit",
        "price": "₹299",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e",
        "description": "Includes high-quality T-handle tools and self-vulcanizing plugs to patch tire punctures on the go."
    },
    {
        "damage_type": "tire_flat",
        "name": "Digital Tire Pressure Gauge",
        "price": "₹499",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
        "description": "Precise digital gauge to regularly check and maintain correct tire pressure for safety."
    },
    # GENERAL RECOMMENDED ACCESSORIES
    {
        "damage_type": "general",
        "name": "Premium Leather Seat Covers Set",
        "price": "₹2,999",
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1502877338535-766e1452684a",
        "description": "High-quality leatherette seat covers custom-tailored for maximum comfort and styling."
    },
    {
        "damage_type": "general",
        "name": "Android Infotainment Display",
        "price": "₹8,999",
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1502877338535-766e1452684a",
        "description": "High-definition touchscreen display with GPS navigation, Bluetooth, and Apple CarPlay/Android Auto support."
    },
    {
        "damage_type": "general",
        "name": "Dual Lens Full HD Car Dashcam",
        "price": "₹3,499",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b",
        "description": "Dual-channel dashcam capturing front and rear footage with high-definition night vision."
    },
    {
        "damage_type": "general",
        "name": "Luxury 7D Custom Floor Mats",
        "price": "₹1,999",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1504215680853-026ed2a45def",
        "description": "All-weather water-proof luxury styling floor mats with diamond stitching."
    }
]

def seed_accessories():
    print("Checking accessories catalog...")
    count = accessories_collection.count_documents({})
    if count == 0:
        print(f"Seeding {len(DEFAULT_ACCESSORIES)} accessories...")
        accessories_collection.insert_many(DEFAULT_ACCESSORIES)
        print("Accessories seeded successfully.")
    else:
        print(f"Accessories collection already has {count} items.")

def create_admin():
    print("Checking admin account...")
    admin_email = "admin@vehicle.com"
    admin_user = users_collection.find_one({"email": admin_email})
    
    if not admin_user:
        print(f"Creating default admin account ({admin_email})...")
        password = "admin123"
        hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
        
        users_collection.insert_one({
            "name": "System Admin",
            "email": admin_email,
            "password": hashed_password,
            "role": "admin",
            "created_at": str(datetime.now())
        })
        print("Admin user created successfully! (Email: admin@vehicle.com, Password: admin123)")
    else:
        print("Admin user already exists. Ensuring admin role is active...")
        users_collection.update_one(
            {"email": admin_email},
            {"$set": {"role": "admin"}}
        )
        print("Admin role verified.")

if __name__ == "__main__":
    seed_accessories()
    create_admin()
    print("Database seeding completed.")
