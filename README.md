# 🏭 Julian Date App - Industrial Floor Automation

> A lightweight, offline-first application designed to solve a specific workflow bottleneck in an automotive manufacturing environment.

## 💡 Developer Note & Tech Rationale

This project was built as a targeted solution for an industrial environment constraint. I deliberately chose **Rust, Tauri, and Android WebView** for this utility due to their low memory footprint, high performance, and ability to run reliably offline on mobile devices in a factory setting.

**My Core Stack:** While I leverage Rust for specific hardware-constrained tooling, my primary expertise, studies, and career focus are dedicated to robust corporate backend development using mainly **Java and Spring Boot**. Feel free to explore my core backend projects in my main repositories. 

This project serves to demonstrate my pragmatic approach to problem-solving: identifying a real-world bottleneck and selecting the exact right tool for the job, rather than forcing a single language into every scenario.

---

## 🎯 The Problem

In the manufacturing environment, operators needed a quick, offline way to calculate Julian dates for production lot tracking. Doing this manually or relying on external networks was time-consuming and prone to human error, especially in areas with poor Wi-Fi coverage.

---

## 🚀 The Solution

A standalone mobile application that instantly converts standard calendar dates to Julian dates (and vice versa) entirely offline. 

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

## ⚙️ Building for production (Android)

To successfully compile the Android release APK, the Gradle build script (`build.gradle.kts`) requires specific signing configurations. The script is designed to safely read these credentials via Environment Variables, ensuring no sensitive data is hardcoded in the repository.

### Prerequisites:

1. Generate your own Android `.keystore` file using `keytool`.
2. Export the following environment variables in your terminal before running the build command:

```Bash
# The absolute path to your generated .keystore file
export TAURI_ANDROID_KEYSTORE_PATH="/path/to/your/file.keystore"

# The alias and passwords set during the keystore generation
export TAURI_ANDROID_KEY_ALIAS="your_alias_name"
export TAURI_ANDROID_KEYSTORE_PASSWORD="your_keystore_password"
export TAURI_ANDROID_KEY_PASSWORD="your_key_password" # might be the same as your keystore password
```

### Build command:

Once the environment variables and the keystore are properly configured, run the standard Tauri build command:

```Bash
npm run tauri android build
```

> Note: If the variables are not present, the build process will still run, but the output will be an `unsigned` APK, and Android blocks the installation of unsigned APKs. 
