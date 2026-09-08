import React from 'react';
import { createRoot } from 'react-dom/client';
import ChannelVideoHub from './components/ChannelVideoHub';

function initReactVideoHub() {
  const container = document.getElementById('react-channel-video-root');
  if (container) {
    const root = createRoot(container);
    root.render(<ChannelVideoHub />);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReactVideoHub);
} else {
  initReactVideoHub();
}
