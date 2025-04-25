import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  X, Phone, Mail, Building, Tag, Clock, Edit,
  MessageSquare, Calendar, FileText, Activity
} from 'lucide-react';
import type { Contact } from '../../types/contacts';

interface ContactDetailProps {
  contact: Contact;
  onClose: () => void;
}

export default function ContactDetail({ contact, onClose }: ContactDetailProps) {
  const [activeTab, setActiveTab] = useState<'timeline' | 'details' | 'custom' | 'activities'>('timeline');

  const tabs = [
    { id: 'timeline', label: 'Timeline', icon: Activity },
    { id: 'details', label: 'Details', icon: FileText },
    { id: 'custom', label: 'Custom Fields', icon: Tag },
    { id: 'activities', label: 'Activities', icon: Clock }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'timeline':
        return (
          <div className="space-y-4">
            {[
              {
                type: 'message',
                icon: MessageSquare,
                content: 'Sent follow-up email',
                date: new Date()
              },
              {
                type: 'appointment',
                icon: Calendar,
                content: 'Scheduled meeting',
                date: new Date(Date.now() - 86400000)
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-gray-100">
                  <item.icon size={16} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">{item.content}</p>
                  <p className="text-xs text-gray-500">
                    {format(item.date, 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );

      case 'details':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail size={16} className="text-gray-400" />
                  <span>{contact.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={16} className="text-gray-400" />
                  <span>{contact.phone}</span>
                </div>
                {contact.custom_fields?.company && (
                  <div className="flex items-center gap-2 text-sm">
                    <Building size={16} className="text-gray-400" />
                    <span>{contact.custom_fields.company}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {contact.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'custom':
        return (
          <div className="space-y-4">
            {Object.entries(contact.custom_fields || {}).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700">
                  {key}
                </label>
                <div className="mt-1 text-sm text-gray-900">{value}</div>
              </div>
            ))}
          </div>
        );

      case 'activities':
        return (
          <div className="space-y-4">
            {[
              { type: 'Email sent', date: new Date() },
              { type: 'Note added', date: new Date(Date.now() - 86400000) },
              { type: 'Contact created', date: new Date(Date.now() - 172800000) }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                  <p className="text-xs text-gray-500">
                    {format(activity.date, 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-medium">
            {contact.first_name[0]}{contact.last_name[0]}
          </div>
          <div>
            <h2 className="text-lg font-semibold">
              {contact.first_name} {contact.last_name}
            </h2>
            <p className="text-sm text-gray-500">{contact.type}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-500">
            <Edit size={16} />
          </button>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-500">
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  );
}