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
- **React Native Camera / Expo Camera**  
- **XLSX or ExcelJS** for file creation  
- **Expo Mail Composer / React Native Email** for sending email  
- **AsyncStorage** (or another local storage system for stock data)

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 14)
- Expo CLI (`npm install -g expo-cli`)
- Android Studio / Xcode for emulation or physical device

### Installation

```bash
git clone https://github.com/your-username/stockly.git
cd stockly
npm install
expo start