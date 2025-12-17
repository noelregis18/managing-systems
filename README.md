# 🎓 Timetable Manager - Professional Web Application

A **modern web application** for managing college timetables, built with React and Vite. This application provides an intuitive interface for creating, managing, and organizing academic schedules with user authentication and cloud-based data storage.

![Timetable Manager](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-blue.svg)
![Vite](https://img.shields.io/badge/Vite-4.5.0-purple.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-blue.svg)

## 🚀 Quick Start

### ⚡ **Development Server**
```bash
npm run dev
```

### ✅ **Success Indicators**
- ✅ Vite server shows: `Local: http://localhost:5173/`
- ✅ Landing page displays with sign-in option
- ✅ After authentication, dashboard displays statistics cards

## 📋 Prerequisites & Setup

### First Time Setup
1. **Install Node.js** (version 16 or higher) from [nodejs.org](https://nodejs.org/)
2. **Install Dependencies**: `npm install`
3. **Environment Variables**: Create a `.env` file in the root directory with:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. **Launch Application**: `npm run dev`

### Available Commands
| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint to check code quality |

## ✨ Features

### 🔐 Authentication
- **Clerk Integration**: Secure user authentication and session management
- **User Profiles**: Personalized user profiles with role-based access
- **Welcome Onboarding**: Guided setup for new users

### 📊 Dashboard
- **Real-time Statistics**: View total courses, rooms, and weekly classes
- **Recent Activity**: Track recent changes and updates
- **Quick Actions**: Fast access to common tasks

### 📅 Timetable Management
- **Interactive Grid**: Create and manage weekly schedules
- **Conflict Detection**: Automatic detection of scheduling conflicts
- **Multiple Views**: Daily and weekly calendar views
- **Export Options**: PDF and Excel export functionality

### 📚 Course Management
- **Comprehensive Database**: Store detailed course information
- **Department Organization**: Organize courses by academic departments
- **Instructor Assignment**: Assign and manage course instructors
- **Credit Tracking**: Monitor credit hours and course duration

### 🏢 Room Management
- **Facility Tracking**: Manage classrooms and their capacities
- **Equipment Management**: Track available equipment per room
- **Availability Status**: Real-time room availability
- **Building Organization**: Organize rooms by buildings and floors

### 👤 User Management
- **Profile Management**: Update user information and preferences
- **Activity Tracking**: Monitor user activity and changes
- **Permissions**: Role-based access control

## 🎯 Key Features to Try

### 🔑 Getting Started
1. Visit the **Landing Page** and sign in with Clerk
2. Complete the **Welcome** onboarding to create your profile
3. Access the **Dashboard** to see your overview

### 📅 Creating Your First Timetable
1. Go to **Timetable** page
2. Click on any empty time slot
3. Add course details
4. Save and see it appear in the grid

### 📚 Adding Courses
1. Navigate to **Courses** page
2. Click **"Add Course"** button
3. Fill in course information
4. Assign to departments and instructors

### 🏢 Managing Rooms
1. Go to **Rooms** page
2. Add new rooms with capacity and equipment
3. Track availability status
4. Organize by buildings

## 📱 Application Overview

### Navigation 🧭
Use the sidebar to navigate between:
- **Dashboard** - Overview and statistics
- **Timetable** - Weekly schedule grid
- **Courses** - Course management
- **Rooms** - Facility management
- **User** - Profile and settings
- **Help** - Documentation and support

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 18.2.0 |
| **Vite** | Build Tool | 4.5.0 |
| **Tailwind CSS** | Styling | 3.3.6 |
| **React Router** | Navigation | 6.20.1 |
| **Clerk** | Authentication | 5.45.0 |
| **Supabase** | Backend & Database | 2.57.3 |
| **Lucide React** | Icons | 0.294.0 |

## 📁 Project Structure

```
timetable-manager/
├── 📁 src/
│   ├── 📁 components/              # React components
│   │   ├── ActivityLog.jsx         # Activity logging
│   │   ├── ActivityTracker.jsx    # Activity tracking
│   │   ├── Courses.jsx             # Course management
│   │   ├── Dashboard.jsx          # Main dashboard
│   │   ├── Help.jsx               # Help and support
│   │   ├── LandingPage.jsx        # Landing page for unauthenticated users
│   │   ├── Navbar.jsx             # Navigation bar
│   │   ├── PermissionsManager.jsx # Permission management
│   │   ├── Rooms.jsx              # Room management
│   │   ├── Sidebar.jsx            # Navigation sidebar
│   │   ├── StatCard.jsx           # Reusable stat card
│   │   ├── Timetable.jsx          # Timetable management
│   │   ├── User.jsx               # User profile management
│   │   └── Welcome.jsx            # Welcome/Onboarding page
│   ├── 📁 lib/                    # Utility libraries
│   │   └── supabaseClient.js      # Supabase client configuration
│   ├── 📁 services/               # Service layer
│   │   ├── coursesService.js      # Course data operations
│   │   ├── roomsService.js        # Room data operations
│   │   ├── timetableService.js    # Timetable data operations
│   │   └── userProfileService.js  # User profile operations
│   ├── App.jsx                    # Main app component with routing
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Global styles
├── 📁 public/                     # Static assets
│   └── timetable-icon.svg         # Application icon
├── 📁 dist/                       # Production build output
├── 📄 package.json                # Dependencies and scripts
├── 📄 vite.config.js             # Vite configuration
├── 📄 tailwind.config.js         # Tailwind CSS config
├── 📄 postcss.config.js          # PostCSS configuration
└── 📄 README.md                   # This file
```

## 🎨 Key Design Features

### Professional UI/UX
- **Modern Design**: Clean, professional interface matching industry standards
- **Responsive Layout**: Adaptive design for different screen sizes
- **Smooth Animations**: Subtle transitions and hover effects
- **Consistent Theming**: Unified color scheme and typography

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Friendly**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG compliant color combinations
- **Focus Indicators**: Clear focus states for interactive elements

### Performance
- **Fast Loading**: Optimized bundle sizes with Vite
- **Smooth Interactions**: 60fps animations and transitions
- **Memory Efficient**: Optimized state management
- **Background Processing**: Non-blocking operations

## 📦 Building for Production

### Build Web Application
```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

This serves the production build locally for testing.

## 🌐 Deployment

The application can be deployed to any static hosting service:
- **Vercel**: Connect your repository for automatic deployments
- **Netlify**: Deploy with continuous integration
- **GitHub Pages**: Host directly from your repository
- **Any Static Host**: Upload the `dist/` folder contents

### Environment Variables
Make sure to set the following environment variables in your hosting platform:
- `VITE_CLERK_PUBLISHABLE_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🔒 Security Features

- **Clerk Authentication**: Secure user authentication and session management
- **Supabase RLS**: Row-level security for database access
- **Environment Variables**: Sensitive keys stored securely
- **HTTPS**: Secure connections for all API calls

## 💾 Data Management

### Cloud Storage
- **Supabase Backend**: All data stored securely in Supabase
- **Real-time Sync**: Changes sync across all devices
- **Automatic Backups**: Supabase handles data backups

### Export Options
- Export timetables to PDF or Excel
- Use the export buttons in the Timetable page

## 🔧 Troubleshooting

### Common Issues

**Application won't start?**
- Ensure Node.js is installed (version 16+)
- Run `npm install` to install dependencies
- Check if port 5173 is available
- Verify environment variables are set correctly

**Authentication not working?**
- Check that `VITE_CLERK_PUBLISHABLE_KEY` is set in `.env`
- Verify your Clerk account is properly configured
- Check browser console for authentication errors

**Database connection issues?**
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Check Supabase project status
- Verify database tables are created (see SQL files in root)

**Blank screen?**
- Wait a few seconds for the app to load
- Check the browser console for any error messages
- Try refreshing with `Ctrl+R` or `F5`
- Clear browser cache and cookies

**Performance issues?**
- Close unnecessary browser tabs
- Check network connection
- Verify Supabase project is not rate-limited

## 📊 Database Setup

The project includes SQL files for database setup:
- `create_courses_table.sql` - Courses table schema
- `create_user_profile_table.sql` - User profile table schema
- `create_rooms_table.sql` - Rooms table schema

Run these in your Supabase SQL editor to set up the required tables.

## 🛑 To Stop the Development Server
- Press `Ctrl+C` in the terminal

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the Help section in the app
- **Issues**: Report bugs via GitHub issues
- **Email**: noel.regis04@gmail.com, mdrakqibalam@gmail.com

## 🙏 Acknowledgments

- Built with ❤️ using React and Vite
- Authentication powered by [Clerk](https://clerk.com)
- Backend and database by [Supabase](https://supabase.com)
- Icons by [Lucide](https://lucide.dev)
- UI components styled with [Tailwind CSS](https://tailwindcss.com)

---

**Happy Scheduling! 🎓📅**
