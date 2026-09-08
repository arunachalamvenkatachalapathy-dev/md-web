import React, { useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import ChannelsLedger from './components/ChannelsLedger';
import LatestUpload from './components/LatestUpload';
import ProductsStore from './components/ProductsStore';
import MessageCreator from './components/MessageCreator';
import Pipeline from './components/Pipeline';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('channels');

  return (
    <div className="min-h-screen flex flex-col bg-ink text-paper selection:bg-amber selection:text-ink">
      {/* Navigation */}
      <Nav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Continuous Monospace Ticker Marquee */}
        <Ticker />

        {/* Channels Ledger with Embedded Previews */}
        <ChannelsLedger />

        {/* Live Drive Feed: Latest Upload */}
        <LatestUpload />

        {/* Digital Products & Storefront */}
        <ProductsStore />

        {/* Interactive Community Pitch Desk / Ask Creator */}
        <MessageCreator />

        {/* 4-Stage Production Pipeline */}
        <Pipeline />
      </main>

      {/* Brand Bio & Footer */}
      <Footer />
    </div>
  );
}
