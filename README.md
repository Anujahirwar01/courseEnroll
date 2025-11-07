# Course Enrollment Platform

A comprehensive full-stack web application for online course enrollment and management, built with the MERN stack. This platform provides students with an intuitive interface to browse, enroll in, and track their progress through various educational courses.

## 🚀 Features

### User Authentication & Authorization
- Secure user registration and login system
- JWT-based authentication
- Password encryption using bcrypt
- Protected routes and middleware

### Course Management
- Browse comprehensive course catalog
- Detailed course descriptions with structured modules
- Interactive course content with topics and subtopics
- Progress tracking and completion status
- Enrollment status management

### User Experience
- Modern, responsive UI built with React and Tailwind CSS
- Glassmorphism design elements with gradient backgrounds
- Mobile-friendly interface
- Smooth navigation with React Router
- Interactive components with state management

### Learning Features
- Comprehensive Q&A sections for each course
- Structured learning modules with topic breakdown
- Progress tracking and completion indicators
- User profile dashboard with enrolled courses
- Course filtering and search capabilities

## 🛠️ Technology Stack

### Frontend
- **React 19.1.1** - Modern UI library with hooks
- **React Router DOM 7.9.4** - Client-side routing
- **Tailwind CSS 4.1.15** - Utility-first CSS framework
- **Vite 7.1.7** - Fast build tool and dev server
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js 5.1.0** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose 8.19.2** - MongoDB object modeling
- **JWT** - JSON Web Token for authentication
- **bcrypt 6.0.0** - Password hashing
- **Express Validator** - Server-side validation

### Development Tools
- **ESLint** - Code linting and formatting
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
courseEnroll/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── home.jsx    # Landing page component
│   │   │   ├── courses.jsx # Course catalog and enrollment
│   │   │   ├── profile.jsx # User profile management
│   │   │   ├── login.jsx   # Authentication components
│   │   │   └── signup.jsx
│   │   ├── context/        # React context providers
│   │   │   └── authcontext.jsx
│   │   ├── data/           # Course data and content
│   │   ├── routes/         # Application routing
│   │   └── assets/         # Static assets
│   ├── public/             # Public static files
│   └── package.json        # Frontend dependencies
│
├── server/                 # Backend Node.js application
│   ├── controller/         # Request handlers
│   │   ├── user.controller.js
│   │   └── enrollment.controller.js
│   ├── models/             # Database schemas
│   │   ├── user.model.js
│   │   ├── profile.model.js
│   │   └── enrollment.model.js
│   ├── routes/             # API routes
│   │   ├── user.route.js
│   │   └── enrollment.route.js
│   ├── middleware/         # Custom middleware
│   │   └── auth.middleware.js
│   ├── services/           # Business logic
│   │   └── user.service.js
│   ├── db/                 # Database configuration
│   │   └── db.js
│   └── package.json        # Backend dependencies
│
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd courseEnroll
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the server directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/courseenroll
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

5. **Start the application**
   
   Terminal 1 (Backend):
   ```bash
   cd server
   node server.js
   ```
   
   Terminal 2 (Frontend):
   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📱 Application Features

### Home Page
- Welcome interface with course overview
- Featured courses showcase
- Navigation to different sections

### Course Catalog
- Browse available courses with detailed descriptions
- Enrollment functionality with confirmation
- Course difficulty levels and duration information
- Interactive course cards with modern design

### User Authentication
- Secure registration with validation
- Login with email/username and password
- Logout functionality with proper session management
- Protected routes for authenticated users

### User Profile
- Personal dashboard showing enrolled courses
- Progress tracking and completion status
- Course management and unenrollment options
- User information display and editing

### Course Content
- Structured learning modules with topics
- Interactive Q&A sections
- Progress indicators and completion tracking
- Professional course layouts with responsive design

## 🔧 API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Enrollments
- `GET /api/enrollments` - Get user enrollments
- `POST /api/enrollments` - Enroll in a course
- `DELETE /api/enrollments/:id` - Unenroll from course
- `PUT /api/enrollments/:id` - Update enrollment status

## 🎨 Design System

### Color Palette
- Primary: Gradient backgrounds with blue and purple tones
- Secondary: Clean whites and grays for content areas
- Accent: Interactive elements with hover effects
- Success/Error: Standard green and red for status indicators

### Typography
- Headers: Bold, modern fonts for section titles
- Body: Clean, readable fonts for content
- Code: Monospace fonts for technical content

### Components
- Glassmorphism cards with backdrop blur effects
- Responsive grid layouts
- Interactive buttons with hover animations
- Modal dialogs for confirmations
- Loading states and error handling

## 🔒 Security Features

- JWT-based authentication with secure token storage
- Password hashing using bcrypt
- Input validation and sanitization
- CORS configuration for secure cross-origin requests
- Protected API routes with middleware authentication
- Client-side route protection

## 📊 Database Schema

### User Model
- Personal information (name, email, username)
- Authentication credentials (hashed password)
- Profile metadata and preferences

### Enrollment Model
- User-course relationship tracking
- Enrollment date and status
- Progress tracking and completion data

### Course Data
- Course information and metadata
- Module and topic structure
- Q&A content and learning materials

## 🚦 Development Workflow

### Code Quality
- ESLint configuration for consistent code style
- Component-based architecture for maintainability
- Separation of concerns between frontend and backend
- Environment-based configuration management

### Testing
- Component testing setup available
- API endpoint testing capabilities
- Development and production environment separation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📝 License

This project is licensed under the ISC License - see the package.json files for details.

## 🙋‍♂️ Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions

## 🚀 Future Enhancements

- Video content integration
- Real-time chat support
- Advanced analytics and reporting
- Mobile application development
- Payment integration for premium courses
- Certificate generation upon completion
- Social features and course reviews

---

**Built with ❤️ using the MERN Stack**