import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ReviewDashboard from '../components/Reputation/ReviewDashboard';
import ReviewCampaigns from '../components/Reputation/ReviewCampaigns';
import CampaignBuilder from '../components/Reputation/CampaignBuilder';
import ReviewTemplates from '../components/Reputation/ReviewTemplates';
import ReviewSettings from '../components/Reputation/ReviewSettings';
import ReviewFeed from '../components/Reputation/ReviewFeed';
import DisputeTracker from '../components/Reputation/DisputeTracker';
import ReviewWidget from '../components/Reputation/ReviewWidget';

export default function Reputation() {
  return (
    <Routes>
      <Route index element={<ReviewDashboard />} />
      <Route path="campaigns" element={<ReviewCampaigns />} />
      <Route path="campaigns/new" element={<CampaignBuilder />} />
      <Route path="campaigns/:id" element={<CampaignBuilder />} />
      <Route path="templates" element={<ReviewTemplates />} />
      <Route path="settings" element={<ReviewSettings />} />
      <Route path="feed" element={<ReviewFeed />} />
      <Route path="disputes" element={<DisputeTracker />} />
      <Route path="widgets" element={<ReviewWidget />} />
    </Routes>
  );
}