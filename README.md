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
- **MongoDB.Driver** 2.23.0 - MongoDB integration
- **BCrypt.Net-Next** 4.0.3 - Password hashing
- **OpenAPI/Swagger** - API documentation

### Database
- **MongoDB Atlas** - Cloud NoSQL database for user data

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
│   │   │   ├── login.js       # Login page
│   │   │   ├── signup.js      # User registration page
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
│   ├── Controllers/           # API endpoint handlers
│   │   └── AuthController.cs  # User authentication endpoints
│   ├── Models/                # Data models
│   │   └── User.cs            # User model for MongoDB
│   ├── Data/                  # Database context
│   │   └── ApplicationDbContext.cs  # MongoDB configuration
│   ├── DTOs/                  # Data Transfer Objects
│   │   ├── RegisterRequest.cs
│   │   └── RegisterResponse.cs
│   ├── Services/              # Business logic
│   │   └── AuthService.cs     # Authentication service (password hashing)
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

#### **Login** (`/login`)
- User login page
- Email and password input fields
- Link to signup for new users
- Form validation and error handling

#### **Signup** (`/signup`)
- New user registration page
- Form fields:
  - First Name (optional)
  - Last Name (optional)
  - Email (required)
  - Password (required, min 6 characters)
  - Confirm Password (required)
- Client-side validation
- Connects to backend `/api/auth/register` endpoint
- Saves encrypted passwords to MongoDB Atlas
- Link to login page for existing users

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
| **Login** | User login form | `components/login.js` |
| **Signup** | User registration form | `components/signup.js` |
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

3. Configure MongoDB Atlas connection in `appsettings.json`:
   ```json
   {
     "ConnectionStrings": {
       "MongoDB": "mongodb+srv://username:password@cluster.mongodb.net/?appName=TrackerManager"
     }
   }
   ```
   
   > **Note:** 
   > - Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
   > - Replace `username`, `password`, and `cluster` with your credentials
   > - Ensure your IP address is whitelisted in MongoDB Atlas

4. Run the backend:
   ```bash
   dotnet run
   ```
   The API will be available at `https://localhost:7146` or `http://localhost:5259` (check launchSettings.json)

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
# Runs on http://localhost:5259 (HTTP) or https://localhost:7146 (HTTPS)
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

### Authentication
- **POST** `/api/auth/register` - Register a new user
  - Request body:
    ```json
    {
      "email": "user@example.com",
      "password": "password123",
      "firstName": "John",
      "lastName": "Doe"
    }
    ```
  - Returns: User data and success message

### Weather Forecast (Sample)
- **GET** `/weatherforecast` - Returns sample weather data

> **Note:** Backend includes authentication endpoints for user registration. Additional endpoints for login and user management coming soon.

---

## 🔐 Environment Configuration

### Frontend Environment Variables

Create `.env.local` in the `frontend` directory:

```env
# Contentful Configuration
REACT_APP_CONTENTFUL_SPACE_ID=your_space_id
REACT_APP_CONTENTFUL_ACCESS_KEY=your_api_key

# API Base URL
REACT_APP_API_URL=http://localhost:5259
```

### Backend Configuration

Edit `appsettings.json` or `appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "MongoDB": "mongodb+srv://username:password@cluster.mongodb.net/?appName=TrackerManager"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

**MongoDB Atlas Setup:**
1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Create a database user with credentials
3. Get the connection string from the "Connect" button
4. Replace `username`, `password`, and cluster details
5. Whitelist your IP address in the Network Access section

---

## 📚 Key Features

✅ **User Authentication** - Secure registration with password hashing (BCrypt)  
✅ **MongoDB Integration** - Cloud database for user data storage  
✅ **Headless CMS Integration** - Content from Contentful  
✅ **Dynamic Routing** - Project pages with slug-based URLs  
✅ **Image Optimization** - Proper Contentful asset handling  
✅ **Reusable Components** - DRY principles applied  
✅ **Custom Hooks** - useProjectBySlug for logic reuse  
✅ **Error Handling** - Image load/error logging and form validation  
✅ **Responsive Design** - Mobile-first CSS approach  
✅ **Modern Tech Stack** - React 19, .NET 9, MongoDB Atlas  
✅ **CORS Enabled** - Secure cross-origin requests between frontend and backend  

---

## � User Authentication System

### How It Works

1. **Registration Process:**
   - User fills signup form with email, password, and optional name fields
   - Frontend validates password requirements (min 6 characters, matching confirmation)
   - Form data sent to `POST /api/auth/register` endpoint
   - Backend validates email uniqueness in MongoDB
   - Password hashed using BCrypt before storage
   - User document created in `users` collection

2. **Security Features:**
   - Passwords are **never stored in plain text**
   - BCrypt hashing with salt for password security
   - Unique email constraint in MongoDB
   - Form validation on both client and server
   - CORS configured for secure cross-origin requests

3. **Database:**
   - Users stored in MongoDB Atlas `users` collection
   - User document structure:
     ```json
     {
       "_id": ObjectId,
       "email": "user@example.com",
       "passwordHash": "bcrypt_hash",
       "firstName": "John",
       "lastName": "Doe",
       "createdAt": ISODate,
       "updatedAt": ISODate,
       "isActive": true
     }
     ```

---

## �🔍 Logging & Debugging

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
1. Check environment variables are correctly set (Contentful and MongoDB)
2. Verify MongoDB Atlas connection string and IP whitelist
3. Ensure .NET SDK and Node.js versions are compatible
4. Check browser console for error logs
5. Review backend error messages for database connectivity issues
6. Verify CORS settings match your frontend origin
7. Make sure MongoDB Atlas cluster status is "Active"

---

**Happy Tracking!** 🚀

