# 🏭 Julian Date Generator App - Industrial Floor Automation

> A lightweight, offline-first application designed to solve a specific workflow bottleneck in an automotive manufacturing environment.

## 💡 Developer Note & Tech Rationale
This project was built as a targeted solution for an industrial environment constraint. I deliberately chose **Rust, Tauri, and Android WebView** for this utility due to their low memory footprint, high performance, and ability to run reliably offline on mobile devices in a factory setting.

**My Core Stack:** While I leverage Rust for specific hardware-constrained tooling, my primary expertise, studies, and career focus are dedicated to robust corporate backend development using **Java, Spring Boot, and Software Architecture**. Feel free to explore my core backend projects in my main repositories. 

This project serves to demonstrate my pragmatic approach to problem-solving: identifying a real-world bottleneck and selecting the exact right tool for the job, rather than forcing a single language into every scenario.

---

## 🎯 The Problem
In the manufacturing environment, operators needed a quick, offline way to calculate Julian dates for production lot tracking. Doing this manually or relying on external networks was time-consuming and prone to human error, especially in areas with poor Wi-Fi coverage.

## 🚀 The Solution
[Descreva o que o seu app faz para resolver isso:]
A standalone mobile application that instantly converts standard calendar dates to Julian dates entirely offline. 

---

### Key Features:
* **100% Offline Capability:** Works perfectly in signal dead-zones on the factory floor.
* **Minimal Resource Usage:** Generates a tiny binary that runs smoothly on older hardware.
* **Instant Calculation:** Eliminates manual lookup errors.

---

## 🛠️ Built With
* **Rust:** Core logic and backend performance.
* **Tauri:** Secure, lightweight cross-platform framework.
* **Android WebView:** Frontend rendering for mobile deployment.

---

## ⚙️ How to Run
```Bash
# Clone the project
git clone https://github.com/MaiteALC/julian-date-generator

# Navigate into the directory
cd julian-date-generator

# Install the dependencies
npm install

# If you want to run in dev mode
cargo tauri dev

# Build for android
npm run tauri android build
```
