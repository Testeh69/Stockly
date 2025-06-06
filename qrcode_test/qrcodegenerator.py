"""
generate_qr.py
Génère un QR code avec Designation, Reference et Lot
"""

import qrcode
import json

def generate_qr(designation: str, reference: str, lot: str, output_path: str = "qrcode.png"):
    # Structure des données à encoder dans le QR code
    data = {
        "Designation": designation,
        "Reference": reference,
        "Lot": lot
    }
    payload = json.dumps(data)  # On encode en JSON

    # Création de l'objet QR code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=4
    )
    qr.add_data(payload)
    qr.make(fit=True)

    # Création d'une image PIL
    img = qr.make_image(fill_color="black", back_color="white")

    # Sauvegarde de l'image
    img.save(output_path)
    print(f"QR code généré : {output_path}")

if __name__ == "__main__":
    # Exemple d'utilisation
    generate_qr("Pièce A", "REF123", "LOT456", "qrcode_pieceA.png")
