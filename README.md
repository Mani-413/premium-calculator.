# Premium Calculator App

A beautiful, feature-rich calculator with a Java (Spring Boot) backend and a React (Vite) frontend.

## Features
- **Modern UI**: Glassmorphism design with a sleek dark theme.
- **Two Modes**:
  - **Standard**: Basic arithmetic operations.
  - **Scientific**: Includes `sin`, `cos`, `tan`, `log`, `π`, `e`, and parenthetical expressions.
- **Calculation History**: View past calculations, stored and managed by the Java backend. Click any history item to re-load the expression.
- **Backend-Powered Logic**: Expressions are evaluated on the server using `exp4j` for accuracy and extensibility.

## Project Structure
- `/frontend`: React application using Vite and Lucide-like custom styles.
- `/backend`: Spring Boot application providing calculation APIs.

## How to Run

### 1. Start the Backend
Navigate to the `backend` directory and run:
```bash
# On Windows
.\mvnw.cmd spring-boot:run

# On Linux/macOS
./mvnw spring-boot:run
```
The backend will start on [http://localhost:8080](http://localhost:8080).

### 2. Start the Frontend
Navigate to the `frontend` directory and run:
```bash
npm install
npm run dev
```
The frontend will be available at [http://localhost:5173](http://localhost:5173).

## Extra Features
- **Dynamic Mode Switching**: Seamlessly toggle between scientific and standard modes.
- **Persistence**: Calculation history remains visible during the session and is fetched from the server.
- **Responsive Design**: Works on desktops and adapts for mobile views.
- **Error Handling**: Graceful handling of invalid mathematical expressions.
