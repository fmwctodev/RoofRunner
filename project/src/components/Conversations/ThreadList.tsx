import React, { useState } from 'react';
import { Search, Star, Bell, Filter, Plus } from 'lucide-react';
import { Thread } from '../../types/conversations';
import ThreadItem from './ThreadItem';
import ThreadSkeleton from './ThreadSkeleton';
import SidePanel from './SidePanel';

interface ThreadListProps {
  threads: Thread[];
  selectedThread: Thread | null;
  onThreadSelect: (thread: Thread) => void;
  showFilterPanel: boolean;
  onCloseFilterPanel: () => void;
}

const ThreadList: React.FC<ThreadListProps> = ({ 
  threads, 
  selectedThread, 
  onThreadSelect,
  showFilterPanel,
  onCloseFilterPanel
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: 'unread', label: 'Unread' },
    { id: 'recents', label: 'Recents' },
    { id: 'starred', label: 'Starred' },
    { id: 'all', label: 'All' }
  ];

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex gap-2 mb-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex justify-between mt-4">
          <button 
            onClick={onCloseFilterPanel}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <Filter size={20} />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md">
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="divide-y divide-gray-200">
            {Array.from({ length: 5 }).map((_, index) => (
              <ThreadSkeleton key={index} />
            ))}
          </div>
        ) : threads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No conversations yet
            </h3>
            <p className="text-gray-500 mb-4">
              Start a new conversation to connect with your customers
            </p>
            <button className="btn btn-primary">
              New Conversation
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {threads.map(thread => (
              <ThreadItem
                key={thread.id}
                thread={thread}
                isSelected={selectedThread?.id === thread.id}
                onClick={() => onThreadSelect(thread)}
              />
            ))}
          </div>
        )}
      </div>

      <SidePanel
        isOpen={showFilterPanel}
        onClose={onCloseFilterPanel}
        title="Filters"
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Status</h4>
            <div className="space-y-2">
              {['Active', 'Archived', 'Spam'].map((item) => (
                <label key={item} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Channel</h4>
            <div className="space-y-2">
              {['SMS', 'WhatsApp', 'Email', 'Voice'].map((item) => (
                <label key={item} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Tags</h4>
            <div className="space-y-2">
              {['Priority', 'Follow-up', 'New lead', 'Support'].map((item) => (
                <label key={item} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </SidePanel>
    </div>
  );
};

export default ThreadList;