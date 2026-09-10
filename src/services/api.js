// API client connecting React frontend to Python FastAPI + PostgreSQL backend

const API_BASE = 
  import.meta.env.VITE_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' 
    ? '/api' 
    : 'http://localhost:8000/api')


export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`, { method: 'GET' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    return { status: 'offline', error: err.message, database: { engine: 'none', is_postgres: false } }
  }
}

export async function fetchProjectsFromApi() {
  try {
    const res = await fetch(`${API_BASE}/projects`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('Backend API offline, using local projects cache:', err.message)
    return null
  }
}

export async function submitContactMessage(payload) {
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      throw new Error(errData.detail || `Server error ${res.status}`)
    }
    return await res.json()
  } catch (err) {
    console.warn('Backend API submission error, utilizing local storage fallback:', err.message)
    // Save to localStorage so no user message is ever lost
    try {
      const existing = JSON.parse(localStorage.getItem('kiran_offline_messages') || '[]')
      existing.push({ ...payload, timestamp: new Date().toISOString(), offline: true })
      localStorage.setItem('kiran_offline_messages', JSON.stringify(existing))
    } catch {}
    return { status: 'fallback_saved', error: err.message }
  }
}

export async function fetchContactMessages() {
  try {
    const res = await fetch(`${API_BASE}/contact`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('Backend API offline, falling back to local cached messages:', err.message)
    try {
      return JSON.parse(localStorage.getItem('kiran_offline_messages') || '[]')
    } catch {
      return []
    }
  }
}

export async function toggleMessageRead(messageId) {
  try {
    const res = await fetch(`${API_BASE}/contact/${messageId}/read`, { method: 'PATCH' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('Failed to toggle read state:', err.message)
    return null
  }
}

export async function deleteContactMessage(messageId) {
  try {
    const res = await fetch(`${API_BASE}/contact/${messageId}`, { method: 'DELETE' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('Failed to delete message:', err.message)
    return null
  }
}


export async function trackAnalyticsEvent(eventType, eventName, metadata = {}) {
  try {
    fetch(`${API_BASE}/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: eventType,
        event_name: eventName,
        metadata: metadata
      })
    }).catch(() => {})
  } catch {}
}

export async function executeTerminalCommandOnServer(command) {
  try {
    const res = await fetch(`${API_BASE}/terminal/exec`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command })
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    return null
  }
}
