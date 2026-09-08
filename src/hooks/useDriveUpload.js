import { useState, useEffect, useCallback } from 'react';
import { siteConfig } from '../config/siteConfig';

// Fallback demo episode when secrets are not yet configured or offline with no cache
const DEMO_UPLOAD = {
  id: "demo-latest",
  name: "Episode 48: The 'Safe 12% Dividend' Trap in Public REITs",
  createdTime: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
  mimeType: "video/mp4",
  formatTag: "VIDEO",
  thumbnailLink: "/logo.png",
  webViewLink: siteConfig.links.youtube,
  isMock: true
};

export function useDriveUpload() {
  const { apiKey, folderId, pollIntervalMs, staleThresholdMs, cacheKey } = siteConfig.drive;

  const [upload, setUpload] = useState(null);
  const [lastSynced, setLastSynced] = useState(null);
  const [status, setStatus] = useState('loading'); // 'live' | 'cached' | 'reconnecting' | 'standby' | 'empty'
  const [statusMessage, setStatusMessage] = useState('Syncing with Drive…');
  const [isStale, setIsStale] = useState(false);

  // Helper to map mimeType to clean tag
  const getFormatTag = (mimeType = '') => {
    if (mimeType.includes('video')) return 'VIDEO';
    if (mimeType.includes('image')) return 'IMAGE';
    if (mimeType.includes('pdf') || mimeType.includes('document')) return 'DOC';
    return 'FILE';
  };

  const fetchDriveLatest = useCallback(async (isPolling = false) => {
    // If no API key is set, use cached or fallback standby state
    if (!apiKey || !folderId || apiKey.includes('your_')) {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          const age = Date.now() - parsed.timestamp;
          setUpload(parsed.data);
          setLastSynced(new Date(parsed.timestamp));
          setIsStale(age > staleThresholdMs);
          setStatus('cached');
          setStatusMessage(`Cached · Key not configured in .env`);
          return;
        } catch {
          // ignore cache parse errors
        }
      }

      // Standby with demo data
      setUpload(DEMO_UPLOAD);
      setLastSynced(new Date());
      setIsStale(false);
      setStatus('standby');
      setStatusMessage('Demo Feed · Add VITE_DRIVE_API_KEY in .env for live sync');
      return;
    }

    try {
      const query = encodeURIComponent(`'${folderId}' in parents and trashed = false`);
      const fields = encodeURIComponent('files(id,name,createdTime,mimeType,thumbnailLink,webViewLink)');
      const url = `https://www.googleapis.com/drive/v3/files?q=${query}&orderBy=createdTime%20desc&pageSize=1&fields=${fields}&key=${apiKey}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Drive API responded with HTTP ${response.status}`);
      }

      const json = await response.json();

      if (!json.files || json.files.length === 0) {
        setStatus('empty');
        setStatusMessage('No uploads yet — check back soon.');
        setUpload(null);
        return;
      }

      const file = json.files[0];
      const normalizedData = {
        id: file.id,
        name: file.name.replace(/\.[^/.]+$/, ""), // strip file extension for clean title
        rawName: file.name,
        createdTime: file.createdTime,
        mimeType: file.mimeType,
        formatTag: getFormatTag(file.mimeType),
        thumbnailLink: file.thumbnailLink || null,
        webViewLink: file.webViewLink || `https://drive.google.com/file/d/${file.id}/view`,
        isMock: false
      };

      const now = Date.now();
      localStorage.setItem(cacheKey, JSON.stringify({
        data: normalizedData,
        timestamp: now
      }));

      setUpload(normalizedData);
      setLastSynced(new Date(now));
      setIsStale(false);
      setStatus('live');
      setStatusMessage('Live Feed');
    } catch (err) {
      console.warn('[Market Debunk] Drive API fetch issue:', err.message);

      // Attempt reading cache
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          const age = Date.now() - parsed.timestamp;
          setUpload(parsed.data);
          setLastSynced(new Date(parsed.timestamp));
          setIsStale(age > staleThresholdMs);
          setStatus('reconnecting');
          setStatusMessage(`reconnecting…`);
          return;
        } catch {
          // ignore
        }
      }

      // No cache available
      setStatus('standby');
      setStatusMessage('Latest upload unavailable right now.');
      setUpload(DEMO_UPLOAD);
    }
  }, [apiKey, folderId, cacheKey, staleThresholdMs]);

  useEffect(() => {
    fetchDriveLatest(false);

    // Set up polling interval
    const intervalId = setInterval(() => {
      // Don't waste quota when tab is inactive
      if (!document.hidden) {
        fetchDriveLatest(true);
      }
    }, pollIntervalMs);

    // Sync when tab becomes visible again
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchDriveLatest(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchDriveLatest, pollIntervalMs]);

  return {
    upload,
    lastSynced,
    status,
    statusMessage,
    isStale,
    refresh: () => fetchDriveLatest(false)
  };
}
