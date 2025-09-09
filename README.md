# 🎓 Timetable Manager - Professional Desktop Application

A **professional desktop application** for managing college timetables, built with modern web technologies. This standalone application provides an intuitive interface for creating, managing, and organizing academic schedules.

![Timetable Manager](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-blue.svg)
![Electron](https://img.shields.io/badge/Electron-27.1.3-green.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-blue.svg)

## 🚀 Quick Start

### ⚡ **Instant Launch (Recommended)**
```bash
Double-click: start.bat
```

### 💻 **Manual Start (Alternative)**
```bash
npm run electron-dev
```

### ✅ **Success Indicators**
- ✅ Vite server shows: `Local: http://localhost:5173/`
- ✅ Electron window opens with blue sidebar
- ✅ Dashboard displays statistics cards

## 📋 Prerequisites & Setup

### First Time Setup
1. **Install Node.js** (version 16 or higher) from [nodejs.org](https://nodejs.org/)
2. **Install Dependencies**: `npm install`
3. **Launch Application**: Double-click `start.bat` or run `npm run electron-dev`

### Available Commands
| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run electron` | Run Electron with built files |
| `npm run electron-dev` | **Start development with Electron** |
| `npm run electron-build` | Build Electron app |
| `npm run dist` | Create distributable packages |

## ✨ Features

### 📊 Dashboard
- **Real-time Statistics**: View total courses, rooms, departments, and weekly classes
- **Recent Activity**: Track recent changes and updates
- **Quick Actions**: Fast access to common tasks

### 📅 Timetable Management
- **Interactive Grid**: Drag-and-drop interface for scheduling
- **Conflict Detection**: Automatic detection of scheduling conflicts
- **Multiple Views**: Daily, weekly, and monthly calendar views
- **Export Options**: PDF and Excel export functionality
- **Personal 5th Semester CSE B Timetable**: Pre-loaded with your specific schedule

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

### 🏛️ Department Management
- **Administrative Details**: Store department head information
- **Contact Management**: Maintain phone and email contacts
- **Faculty Tracking**: Monitor faculty count per department
- **Student Enrollment**: Track student numbers by department

### ⚙️ Settings & Configuration
- **Theme Customization**: Light/dark mode support
- **Notification Preferences**: Customizable alert system
- **Backup Management**: Automatic and manual backup options
- **Export Settings**: Configure default export formats

## 🎯 Key Features to Try

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

## 🎨 Customization

### Theme Settings
- Go to **Settings** → **General**
- Choose between Light/Dark themes
- Adjust language and timezone

### Notifications
- Configure email and push notifications
- Set class reminders
- Enable schedule change alerts

## 💾 Data Management

### Auto-Save
- Your data is automatically saved
- Changes are preserved between sessions

### Export Options
- Export timetables to PDF or Excel
- Use the export buttons in the Timetable page

### Backup
- Automatic daily backups (configurable)
- Manual backup options in Settings

## 📱 Application Overview

### Navigation 🧭
Use the sidebar to navigate between:
- **Dashboard** - Overview and statistics
- **Timetable** - Weekly schedule grid
- **Courses** - Course management
- **Rooms** - Facility management
- **Departments** - Academic departments
- **Settings** - Preferences
- **Help** - Documentation and support

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 18.2.0 |
| **Vite** | Build Tool | 4.5.0 |
| **Electron** | Desktop App | 27.1.3 |
| **Tailwind CSS** | Styling | 3.3.6 |
| **React Router** | Navigation | 6.20.1 |
| **Lucide React** | Icons | 0.294.0 |

## 📁 Project Structure

```
timetable-manager/
├── 📁 src/
│   ├── 📁 components/          # React components
│   │   ├── Dashboard.jsx       # Main dashboard
│   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   ├── Timetable.jsx       # Timetable management
│   │   ├── Courses.jsx         # Course management
│   │   ├── Rooms.jsx           # Room management
│   │   ├── Departments.jsx     # Department management
│   │   ├── Settings.jsx        # Application settings
│   │   ├── Help.jsx            # Help and support
│   │   └── StatCard.jsx        # Reusable stat card
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
├── 📁 electron/
│   ├── main.js                 # Electron main process
│   └── preload.js              # Electron preload script
├── 📄 package.json             # Dependencies and scripts
├── 📄 vite.config.js          # Vite configuration
├── 📄 tailwind.config.js      # Tailwind CSS config
└── 📄 README.md               # This file
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

### Build Web Version
```bash
npm run build
```

### Build Desktop Application
```bash
npm run electron-build
```

### Create Installer
```bash
npm run dist
```

## 📱 Platform Support

- ✅ **Windows** (Windows 10/11)
- ✅ **macOS** (macOS 10.15+)
- ✅ **Linux** (Ubuntu 18.04+)

## 🔒 Security Features

- **Sandboxed Renderer**: Isolated renderer process
- **Context Isolation**: Secure context bridge
- **Content Security Policy**: Protection against XSS
- **No Node Integration**: Secure renderer environment

## 📊 Sample Data

The application comes with sample data to help you get started:
- **24 Sample Courses** across different departments
- **12 Sample Rooms** with various capacities and equipment
- **5 Academic Departments** with complete information
- **Sample Timetable** with realistic scheduling
- **Personal 5th Semester CSE B Timetable** pre-loaded

## 🔧 Troubleshooting

### Common Issues

**Application won't start?**
- Ensure Node.js is installed
- Run `npm install` to install dependencies
- Check if port 5173 is available

**Blank screen?**
- Wait a few seconds for the app to load
- Check the terminal for any error messages
- Try refreshing with `Ctrl+R`

**Performance issues?**
- Close unnecessary applications
- Ensure sufficient RAM (4GB+ recommended)
- Update to latest Node.js version

## 🛑 To Stop the Application
- Close the Electron window
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
- **Email**: noel.regis04@gmail.com , mdrakqibalam@gmail.com
- **Community**: Join our community forum

## 🙏 Acknowledgments

- Built with ❤️ using React and Electron
- Icons by [Lucide](https://lucide.dev)
- UI components styled with [Tailwind CSS](https://tailwindcss.com)

---

**Happy Scheduling! 🎓📅**
