# TrackerManager

A full-stack project management application built with **React.js** (frontend) and **.NET 9** (backend), designed to manage and showcase projects with detailed tracking capabilities. This project serves as a learning platform for modern web development practices.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Frontend Pages & Components](#frontend-pages--components)
- [Getting Started](#getting-started)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Environment Configuration](#environment-configuration)

---

## 📦 Project Overview

TrackerManager is a full-stack web application that allows users to:
- Browse a curated list of projects
- View detailed information about each project with images and descriptions
- Access project content and metadata dynamically from Contentful CMS
- Experience a responsive, modern UI across all devices

**Learning Focus:** Skill development in .NET framework and React.js ecosystem

---

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.4 - UI framework
- **React Router** 7.13.0 - Client-side routing
- **Contentful SDK** 11.10.3 - Headless CMS integration
- **CSS3** - Styling and responsive design
- **Custom Hooks & Utilities** - Reusable logic

### Backend
- **.NET 9.0** - Web framework
- **ASP.NET Core** - API development
- **OpenAPI/Swagger** - API documentation

---

## 📁 Project Structure

```
TrackerManager/
├── frontend/                    # React application
│   ├── public/                 # Static assets
│   │   ├── index.html         # HTML entry point
│   │   └── styles.css         # Global styles
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   │   ├── homepage.js    # Welcome/landing page
│   │   │   ├── features.js    # Features showcase
│   │   │   ├── tasks.js       # Projects list
│   │   │   ├── project-detail.js
│   │   │   ├── navigation.js  # Main navigation
│   │   │   └── footer.js      # Footer
│   │   ├── pages/
│   │   │   └── [slug].js      # Dynamic project detail page
│   │   ├── styles/            # Component styles
│   │   │   └── project-detail.css
│   │   ├── utils/             # Reusable utilities
│   │   │   ├── imageUtils.js  # Image handling
│   │   │   ├── contentfulUtils.js  # CMS integration
│   │   │   └── constants.js   # App constants
│   │   ├── hooks/             # Custom React hooks
│   │   │   └── useProjectBySlug.js
│   │   ├── services/          # External services
│   │   │   └── logger.js      # Logging service
│   │   ├── App.js             # Main app component
│   │   └── index.js           # React entry point
│   └── package.json           # Frontend dependencies
│
├── backend/                     # .NET API
│   ├── Properties/            # Project properties
│   │   └── launchSettings.json
│   ├── Services/              # Business logic
│   ├── Program.cs             # App startup configuration
│   ├── backend.csproj         # Project file
│   ├── appsettings.json       # Configuration
│   └── appsettings.Development.json
│
├── TrackerManager.sln         # Visual Studio solution
└── README.md                  # This file
```

---

## 🎨 Frontend Pages & Components

### Pages

#### **Homepage** (`/`)
- Welcome section with catch phrase: "Welcome to Tracker Manager"
- Call-to-action button
- Clean, modern landing page design
- Introduces the purpose of the application

#### **Features** (`/`)
- Displays key features of the tracker
- Highlighted on the homepage
- Helps users understand the application's capabilities

#### **Projects List** (`/`)
- Shows all available projects from Contentful
- Each project displays as a card with:
  - Project title
  - Thumbnail image
  - Click to view details
- Responsive grid layout
- Dynamic loading from Contentful CMS

#### **Project Detail** (`/projects/:slug`)
- Full project information page
- Displays:
  - Project title
  - Featured/hero image
  - Thumbnail (floated left)
  - Detailed description
  - Additional content/body text
- Image error handling with logging
- Back to projects navigation
- Fully responsive design

### Components

| Component | Purpose | Location |
|-----------|---------|----------|
| **Navigation** | Main navigation bar | `components/navigation.js` |
| **Homepage** | Landing page content | `components/homepage.js` |
| **Features** | Feature showcase section | `components/features.js` |
| **Tasks** | Projects list grid | `components/tasks.js` |
| **ProjectDetail** | Individual project page | `components/project-detail.js` |
| **Footer** | Footer section | `components/footer.js` |

### Utilities & Hooks

| Utility | Purpose |
|---------|---------|
| **imageUtils.js** | Image URL extraction from Contentful assets |
| **contentfulUtils.js** | Contentful client setup and project fetching |
| **constants.js** | Centralized logging events and constants |
| **useProjectBySlug hook** | Reusable project lookup logic |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have installed:
- **Node.js** 16+ and npm (for frontend)
- **.NET 9.0 SDK** (for backend)
- **Git** (for version control)
- A **Contentful account** with API access

### Clone the Repository

```bash
git clone <repository-url>
cd TrackerManager
```

---

## ⚙️ Setup Instructions

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the `frontend` directory:
   ```env
   REACT_APP_CONTENTFUL_SPACE_ID=your_contentful_space_id
   REACT_APP_CONTENTFUL_ACCESS_KEY=your_contentful_api_key
   ```
   
   > **Note:** Get these credentials from your Contentful dashboard

4. Verify the installation:
   ```bash
   npm start
   ```
   The app should open at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Restore NuGet packages:
   ```bash
   dotnet restore
   ```

3. Configure `appsettings.Development.json` if needed

4. Run the backend:
   ```bash
   dotnet run
   ```
   The API will be available at `https://localhost:7001` (or configured port)

---

## 🏃 Running the Application

### Option 1: Separate Terminals (Recommended for Development)

**Terminal 1 - Frontend:**
```bash
cd frontend
npm start
# Runs on http://localhost:3000
```

**Terminal 2 - Backend:**
```bash
cd backend
dotnet run
# Runs on https://localhost:7001
```

### Option 2: Using Visual Studio

1. Open `TrackerManager.sln` in Visual Studio
2. Set startup projects (both frontend and backend if possible)
3. Press `F5` to run

### Option 3: Production Build

**Frontend:**
```bash
cd frontend
npm run build
# Creates optimized production build in `build/` directory
```

**Backend:**
```bash
cd backend
dotnet publish -c Release
```

---

## 📡 API Endpoints

### Weather Forecast (Sample)
- **GET** `/weatherforecast` - Returns sample weather data

> **Note:** Backend is currently in development with sample endpoints. Add your project-specific endpoints here as you develop.

---

## 🔐 Environment Configuration

### Frontend Environment Variables

Create `.env.local` in the `frontend` directory:

```env
# Contentful Configuration
REACT_APP_CONTENTFUL_SPACE_ID=your_space_id
REACT_APP_CONTENTFUL_ACCESS_KEY=your_api_key

# Optional: API Base URL (if using backend API)
REACT_APP_API_URL=https://localhost:7001
```

### Backend Configuration

Edit `appsettings.Development.json` or `appsettings.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  },
  "AllowedHosts": "*"
}
```

---

## 📚 Key Features

✅ **Headless CMS Integration** - Content from Contentful  
✅ **Dynamic Routing** - Project pages with slug-based URLs  
✅ **Image Optimization** - Proper Contentful asset handling  
✅ **Reusable Components** - DRY principles applied  
✅ **Custom Hooks** - useProjectBySlug for logic reuse  
✅ **Error Handling** - Image load/error logging  
✅ **Responsive Design** - Mobile-first CSS approach  
✅ **Modern Tech Stack** - React 19, .NET 9  

---

## 🔍 Logging & Debugging

The application includes a built-in logger service (`services/logger.js`) that tracks:
- Contentful API calls
- Image loading events
- Project data fetching
- Navigation events

Check browser console (DevTools) for detailed logs with event names and data.

---

## 📝 Development Notes

- **Utility Functions:** Centralized in `/utils` for reusability
- **Custom Hooks:** Encapsulate component logic
- **CSS Architecture:** Component-scoped styles with responsive breakpoints
- **Image Handling:** Custom helper to extract URLs from Contentful asset objects

---

## 🤝 Contributing

This is a personal learning project. Feel free to fork and customize for your own learning purposes!

---

## 📞 Support

For issues or questions about the setup:
1. Check environment variables are correctly set
2. Verify Contentful API credentials
3. Ensure .NET SDK and Node.js versions are compatible
4. Check browser console for error logs

---

**Happy Tracking!** 🚀

