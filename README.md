# 🛰️ CanSat Ground Control Station (GCS)

A professional single-page Ground Control Station interface designed for real-time CanSat mission monitoring, telemetry visualization, mission operations, GPS tracking, orientation monitoring, live video streaming, and mission data management.

---

## 📌 Project Overview

The CanSat Ground Control Station (GCS) provides a centralized interface for monitoring and managing a simulated CanSat mission.

The system is designed to display mission telemetry in real time, visualize important flight parameters, track the payload using GPS, display 3D orientation, monitor mission errors, provide mission controls, stream live video, and export mission data.

The architecture is modular and designed for future integration with a physical microcontroller-based telemetry source.

---

## 🚀 Features

### 📡 Real-Time Telemetry

- Altitude
- Temperature
- Pressure
- Humidity
- Battery Voltage
- GPS Latitude
- GPS Longitude
- Satellite Count
- Yaw
- Pitch
- Roll
- Descent Rate

---

### ⏱️ Mission Monitoring

- Mission timer
- Connection status
- Live telemetry updates
- Mission console logging
- Mission state monitoring

---

### ⚠️ Mission Error Code System

A dynamic 4-digit mission error code system is implemented.

| Digit | Mission Condition |
|---|---|
| 1st | Descent Rate |
| 2nd | GPS Availability |
| 3rd | Payload Separation |
| 4th | Emergency Parachute |

`0` represents normal operation and `1` represents an error or fault condition.

Example:

```text
0000 → All systems normal
1000 → Descent rate fault
0100 → GPS unavailable
0010 → Payload separation failure
0001 → Emergency parachute activated
