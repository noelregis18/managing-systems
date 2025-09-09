/**
 * Electron Preload Script
 * 
 * This script runs in the renderer process before the web page loads.
 * It provides a secure bridge between the main process and renderer process.
 * 
 * Key features:
 * - Secure IPC communication between main and renderer processes
 * - Window control functions
 * - File operations and data persistence
 * - System information access
 * - Event handling for renderer process
 */

// Import Electron modules for preload functionality
const { contextBridge, ipcRenderer } = require('electron')

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
// This provides a secure API for the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // =============================================================================
  // WINDOW CONTROLS
  // =============================================================================
  // Functions to control the application window from the renderer process
  
  minimize: () => ipcRenderer.invoke('window-minimize'),  // Minimize the window
  maximize: () => ipcRenderer.invoke('window-maximize'),  // Maximize the window
  close: () => ipcRenderer.invoke('window-close'),        // Close the window
  
  // =============================================================================
  // FILE OPERATIONS
  // =============================================================================
  // Functions for data persistence and file export operations
  
  saveData: (data) => ipcRenderer.invoke('save-data', data),           // Save application data
  loadData: () => ipcRenderer.invoke('load-data'),                     // Load application data
  exportPDF: (data) => ipcRenderer.invoke('export-pdf', data),         // Export data as PDF
  exportExcel: (data) => ipcRenderer.invoke('export-excel', data),     // Export data as Excel
  
  // =============================================================================
  // SYSTEM INFORMATION
  // =============================================================================
  // Functions to access system and application information
  
  getVersion: () => ipcRenderer.invoke('get-version'),                 // Get app version
  getPlatform: () => ipcRenderer.invoke('get-platform'),               // Get platform info
  
  // =============================================================================
  // EVENT LISTENERS
  // =============================================================================
  // Functions to listen for events from the main process
  
  onSaveData: (callback) => ipcRenderer.on('save-data', callback),     // Listen for save events
  onExportPDF: (callback) => ipcRenderer.on('export-pdf', callback),   // Listen for PDF export events
  onExportExcel: (callback) => ipcRenderer.on('export-excel', callback), // Listen for Excel export events
  
  // =============================================================================
  // UTILITY FUNCTIONS
  // =============================================================================
  // Helper functions for cleanup and management
  
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel) // Remove event listeners
})