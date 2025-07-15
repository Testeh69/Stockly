# 📦 Stockly

Stockly is a React Native app designed to simplify inventory management by using QR code scanning. Users can quickly register product quantities and export the stock list as an Excel file, which can be sent via email in one tap.

## ✨ Features

- 📷 **QR Code Scanner**  
  Scan product QR codes for fast identification.

- 🧮 **Stock Registration**  
  Input product quantities and keep track of your current inventory in real-time.

- 📊 **Excel File Generation**  
  Automatically create an Excel (.xlsx) file containing the stock data.

- 📧 **Email Export**  
  Send the generated Excel file via email directly from the app.

- 📴 **Offline Support**  
  App works without an internet connection for field or warehouse usage.

## 🛠 Tech Stack

- **React Native**  
- **Expo Camera**  for acceding the camera
- **XLSX** for excel file creation  
- **Expo-File-System** for acceding in the file
- **Expo-Sharing** for sending email  
- **Expo-SQLITE** for local storage

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 14)
- Expo CLI (`npm install -g expo-cli`)
- Android Studio / Xcode for emulation or physical device

### Installation

```bash
git clone https://github.com/testeh69/stockly.git
cd stockly
npm install
npx expo start


#build directement l'app 
npx eas build

or 

npm run build ## gènère l'apk pour android si vous avez un compte expo
```