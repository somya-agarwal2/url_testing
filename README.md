# Page Pulse – Website Audit Tool

![Page Pulse](/screenshots/hero.png)

Page Pulse is a modern, full-stack website auditing application. Users can enter any website URL and instantly receive technical and SEO-related insights in a beautiful, SaaS-style dashboard.

## Features

*   **Instant SEO Analysis**: Extracts Page Title, Meta Description, and H1 tags count.
*   **Performance Metrics**: Measures the server response time.
*   **Content Insights**: Calculates approximate word count and identifies images missing `alt` attributes.
*   **Technical Details**: Displays HTTP/HTTPS protocol, status code, and content type.
*   **Audit History**: Automatically saves your audit history in a local SQLite database for easy access later.
*   **Beautiful UI/UX**: Designed with a premium dark mode, glassmorphism aesthetics, soft shadows, and Framer Motion animations.

## Tech Stack

**Frontend:**
*   React.js (Vite)
*   Tailwind CSS (Styling)
*   Framer Motion (Animations)
*   Axios (HTTP Client)
*   Lucide React (Icons)

**Backend:**
*   Python (Flask)
*   BeautifulSoup4 (HTML Parsing)
*   Requests (Web Requests)
*   SQLAlchemy & SQLite (Database)
*   Pytest (Testing)

## Folder Structure

```
Page Pulse/
│
├── backend/
│   ├── app.py                 # Flask App Initialization
│   ├── requirements.txt       # Python dependencies
│   ├── models/                # SQLAlchemy Models (audit.py)
│   ├── routes/                # API Endpoints (api.py)
│   ├── services/              # Business Logic & HTML Parsing (auditor.py)
│   ├── tests/                 # Pytest cases
│   └── instance/              # SQLite Database (auto-generated)
│
├── frontend/
│   ├── index.html             # HTML template
│   ├── tailwind.config.js     # Tailwind Configuration
│   ├── src/
│   │   ├── main.jsx           # React Entry Point
│   │   ├── App.jsx            # Main App Layout
│   │   ├── components/        # Reusable UI Components
│   │   ├── pages/             # Application Pages (Home.jsx)
│   │   ├── services/          # API Communication (api.js)
│   │   └── index.css          # Base CSS & Tailwind Layers
│   └── package.json           # Node dependencies
│
└── README.md                  # Project Documentation
```

## Installation

Follow these steps to run the project locally.

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/page-pulse.git
cd page-pulse
```

### 2. Backend Setup
```bash
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment (Windows)
.\venv\Scripts\activate
# Activate the virtual environment (Mac/Linux)
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the Flask server
python app.py
```
*The backend server will run on `http://localhost:5000`.*

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Run the Vite development server
npm run dev
```
*The frontend will run on `http://localhost:5173`.*

## API Documentation

### POST `/audit`
Analyzes a given URL and returns SEO and technical metrics.
**Request Body:**
```json
{
  "url": "https://example.com"
}
```
**Success Response (200 OK):**
```json
{
  "status": 200,
  "response_time": 245,
  "title": "Example Domain",
  "meta_description": "...",
  "h1_count": 1,
  "total_images": 8,
  "missing_alt": 2,
  "word_count": 530,
  "content_type": "text/html",
  "protocol": "HTTPS"
}
```

### GET `/history`
Retrieves the 50 most recent audits from the database.
**Success Response (200 OK):**
```json
[
  {
    "id": 1,
    "url": "https://example.com",
    "status": 200,
    "response_time": 245,
    "title": "Example Domain",
    "created_at": "2023-10-25T14:30:00.000000"
  }
]
```

## Testing

The backend includes a comprehensive `pytest` test suite that uses `unittest.mock` to simulate HTTP responses and exceptions without relying on real internet connectivity.

To run the tests:
```bash
cd backend
# Make sure the virtual environment is activated
pytest
```

To run the tests with verbose output (showing each individual test passing):
```bash
pytest -v
```

## Future Improvements

*   **Authentication**: Add user accounts to save personal audit histories.
*   **Advanced SEO Metrics**: Include checks for robots.txt, sitemaps, and canonical tags.
*   **Export Reports**: Allow users to export audit reports as PDF or CSV.
*   **Lighthouse Integration**: Integrate with Google Lighthouse API for performance scoring.
