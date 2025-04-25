import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Deals from './pages/Deals';
import BlankPage from './pages/BlankPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="conversations" element={<BlankPage title="Conversations" />} />
          <Route path="calendars" element={<BlankPage title="Calendars" />} />
          <Route path="contacts" element={<BlankPage title="Contacts" />} />
          <Route path="deals/*" element={<Deals />} />
          <Route path="jobs" element={<BlankPage title="Jobs" />} />
          <Route path="invoicing" element={<BlankPage title="Invoicing" />} />
          <Route path="payments" element={<BlankPage title="Payments" />} />
          <Route path="ai-agents" element={<BlankPage title="AI Agents" />} />
          <Route path="job-cam" element={<BlankPage title="Job Cam" />} />
          <Route path="marketing" element={<BlankPage title="Marketing" />} />
          <Route path="automation" element={<BlankPage title="Automation" />} />
          <Route path="sites" element={<BlankPage title="Sites" />} />
          <Route path="file-manager" element={<BlankPage title="File Manager" />} />
          <Route path="reputation" element={<BlankPage title="Reputation" />} />
          <Route path="reporting" element={<BlankPage title="Reporting" />} />
          <Route path="instant-estimator" element={<BlankPage title="Instant Estimator" />} />
          <Route path="measurements" element={<BlankPage title="Measurements" />} />
          <Route path="proposals" element={<BlankPage title="Proposals" />} />
          <Route path="material-orders" element={<BlankPage title="Material Orders" />} />
          <Route path="work-orders" element={<BlankPage title="Work Orders" />} />
          <Route path="support" element={<BlankPage title="Support" />} />
          <Route path="settings" element={<BlankPage title="Settings" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;