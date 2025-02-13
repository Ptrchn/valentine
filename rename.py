import os

folder_path = "C:/Users/COJ/OneDrive/Documents/GitHub/valentine/src/Images"
new_prefix = "image" 

# ดึงไฟล์ทั้งหมดจากโฟลเดอร์
files = sorted(os.listdir(folder_path))

# วนลูปเปลี่ยนชื่อไฟล์
for index, file in enumerate(files, start=1):
    old_path = os.path.join(folder_path, file)
    extension = os.path.splitext(file)[1]  # ดึงนามสกุลไฟล์
    new_name = f"{index}{extension}"  # กำหนดชื่อใหม่
    new_path = os.path.join(folder_path, new_name)

    os.rename(old_path, new_path)
    print(f"เปลี่ยนชื่อ: {file} → {new_name}")

print("✅ เปลี่ยนชื่อไฟล์เสร็จสิ้น!")
