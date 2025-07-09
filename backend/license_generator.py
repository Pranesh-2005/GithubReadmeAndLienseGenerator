import datetime
import os

def generate_license(license_type, username):
    year = datetime.datetime.now().year
    template_path = f"templates/licenses/{license_type}.txt"

    if not os.path.exists(template_path):
        return None

    with open(template_path, "r", encoding="utf-8") as file:
        content = file.read()

    content = content.replace("[year]", str(year)).replace("[fullname]", username)

    with open("LICENSE", "w", encoding="utf-8") as file:
        file.write(content)

    return license_type
