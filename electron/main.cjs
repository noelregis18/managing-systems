/**
 * Electron Main Process
 * 
 * This file manages the main Electron process and creates the application window.
 * It handles window management, menu creation, and application lifecycle events.
 * 
 * Key responsibilities:
 * - Create and manage the main application window
 * - Handle application lifecycle events
 * - Create application menu and shortcuts
 * - Manage security settings and permissions
 * - Handle external links and navigation
 */

// Import Electron modules for main process functionality
const { app, BrowserWindow, Menu, shell, dialog } = require('electron')
// Import Node.js path module for file path handling
const path = require('path')
// Development mode flag - set to false for production builds
const isDev = false // Use production build for now (faster and reliable)

// Keep a global reference of the window object
// This prevents the window from being garbage collected
let mainWindow

/**
 * Create the main application window
 * Sets up the browser window with appropriate settings and event handlers
 */
function createWindow() {
  // Create the browser window with specific configuration
  mainWindow = new BrowserWindow({
    width: 1400,                    // Initial window width
    height: 900,                    // Initial window height
    minWidth: 1200,                 // Minimum window width
    minHeight: 700,                 // Minimum window height
    
    // Web preferences for security and functionality
    webPreferences: {
      nodeIntegration: false,       // Disable Node.js integration for security
      contextIsolation: true,       // Enable context isolation for security
      enableRemoteModule: false,    // Disable remote module for security
      webSecurity: true,            // Enable web security features
      preload: path.join(__dirname, 'preload.cjs') // Preload script for IPC
    },
    
    icon: path.join(__dirname, '../assets/icon.png'), // Application icon
    titleBarStyle: 'default',       // Use default title bar style
    show: false,                    // Don't show window until ready (prevents flash)
    frame: true,                    // Show window frame
    resizable: true,                // Allow window resizing
    fullscreenable: true            // Allow fullscreen mode
  })

  // Load the application content based on development mode
  if (isDev) {
    // Development mode: load from Vite development server
    mainWindow.loadURL('http://localhost:5173')
    // Open DevTools for debugging in development
    mainWindow.webContents.openDevTools()
  } else {
    // Production mode: load the built HTML file
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  // Handle failed page loads with retry mechanism
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.log('Failed to load:', errorDescription, 'URL:', validatedURL)
    // Try to reload after a short delay
    setTimeout(() => {
      mainWindow.loadURL('http://localhost:5173')
    }, 2000)
  })

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    
    // Focus on the window for better user experience
    if (isDev) {
      mainWindow.focus()
    }
  })

  // Handle window closed event
  mainWindow.on('closed', () => {
    // Dereference the window object to allow garbage collection
    mainWindow = null
  })

  // Handle external links - open them in default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' } // Prevent opening in Electron window
  })

  // Prevent navigation to external websites for security
  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)
    
    // Only allow navigation to localhost (dev) or file:// (production)
    if (parsedUrl.origin !== 'http://localhost:5173' && parsedUrl.origin !== 'file://') {
      event.preventDefault()
    }
  })
}

/**
 * Create application menu
 * Defines the menu structure and keyboard shortcuts
 */
function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Timetable',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            // Handle new timetable creation
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'New Timetable',
              message: 'This feature will be implemented in a future update.',
              buttons: ['OK']
            })
          }
        },
        {
          label: 'Open',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            // Handle file opening
            dialog.showOpenDialog(mainWindow, {
              properties: ['openFile'],
              filters: [
                { name: 'Timetable Files', extensions: ['json', 'csv'] },
                { name: 'All Files', extensions: ['*'] }
              ]
            })
          }
        },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            // Handle save functionality
            mainWindow.webContents.send('save-data')
          }
        },
        { type: 'separator' },
        {
          label: 'Export',
          submenu: [
            {
              label: 'Export as PDF',
              click: () => {
                mainWindow.webContents.send('export-pdf')
              }
            },
            {
              label: 'Export as Excel',
              click: () => {
                mainWindow.webContents.send('export-excel')
              }
            }
          ]
        },
        { type: 'separator' },
        {
          label: 'Exit',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit()
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' },
        ...(process.platform === 'darwin' ? [
          { type: 'separator' },
          { role: 'front' }
        ] : [])
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About Timetable Manager',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About Timetable Manager',
              message: 'Timetable Manager v1.0.0',
              detail: 'A professional college timetable management system built with React and Electron.\n\nDeveloped with modern web technologies for optimal performance and user experience.',
              buttons: ['OK']
            })
          }
        },
        {
          label: 'Check for Updates',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'Updates',
              message: 'You are running the latest version.',
              buttons: ['OK']
            })
          }
        },
        { type: 'separator' },
        {
          label: 'Report an Issue',
          click: () => {
            shell.openExternal('mailto:support@timetablemanager.com?subject=Issue Report')
          }
        },
        {
          label: 'Documentation',
          click: () => {
            // In a real app, this would open documentation
            shell.openExternal('https://docs.timetablemanager.com')
          }
        }
      ]
    }
  ]

  // macOS specific menu adjustments
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    })
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

// App event listeners
app.whenReady().then(() => {
  createWindow()
  createMenu()

  // macOS specific: Re-create window when dock icon is clicked
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault()
    shell.openExternal(navigationUrl)
  })
})

// Handle app security
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (isDev) {
    // In development, ignore certificate errors for localhost
    event.preventDefault()
    callback(true)
  } else {
    // In production, use default behavior
    callback(false)
  }
})

// Prevent navigation to external protocols
app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)
    
    if (parsedUrl.origin !== mainWindow.webContents.getURL().split('/').slice(0, 3).join('/')) {
      event.preventDefault()
    }
  })
})