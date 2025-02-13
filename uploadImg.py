import os
import json
from supabase import create_client, Client


# ตั้งค่าการเชื่อมต่อ Supabase
SUPABASE_URL = 'https://ksuqhrjkgtswuaybrnfa.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzdXFocmprZ3Rzd3VheWJybmZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0NDE4ODQsImV4cCI6MjA1NTAxNzg4NH0.qFvUgsm4oc8SSLQrYvQMb7gLPrPkaGRioJtHnrq43qE'
BUCKET_NAME = 'photos'

# สร้าง Client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# ตั้งค่าโฟลเดอร์ที่เก็บรูป
FOLDER_PATH = "./public/assets/photos"  # โฟลเดอร์ที่เก็บรูปในเครื่อง
UPLOAD_PATH = "uploads/"  # โฟลเดอร์ใน Supabase Storage
OUTPUT_JSON_FILE = "uploaded_images.json"  # ไฟล์ JSON ที่จะบันทึก

# รายการ URL ของรูปที่อัปโหลด
uploaded_urls = []

# อ่านไฟล์ทั้งหมดในโฟลเดอร์
for filename in os.listdir(FOLDER_PATH):
    file_path = os.path.join(FOLDER_PATH, filename)

    # ตรวจสอบว่าเป็นไฟล์รูปภาพ
    if filename.endswith((".png", ".jpg", ".jpeg", ".gif")):
        with open(file_path, "rb") as file:
            # อัปโหลดไปยัง Supabase Storage
            response = supabase.storage.from_(BUCKET_NAME).upload(
                                                                        UPLOAD_PATH + filename, 
                                                                        file
                                                                    )


            # ตรวจสอบว่าอัปโหลดสำเร็จไหม
            if response:
                # ดึงลิงก์รูป
                public_url = f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET_NAME}/{UPLOAD_PATH}{filename}"
                uploaded_urls.append({"filename": filename, "url": public_url})
                print(f"✅ Uploaded: {filename} -> {public_url}")

# บันทึกข้อมูลลง JSON
with open(OUTPUT_JSON_FILE, "w", encoding="utf-8") as json_file:
    json.dump(uploaded_urls, json_file, ensure_ascii=False, indent=4)

print(f"\n📁 URLs saved to {OUTPUT_JSON_FILE}")
