import React from 'react';
import { format } from 'date-fns';
import { MessageSquare, Phone, Mail } from 'lucide-react';
import { Thread } from '../../types/conversations';
import { cn } from '../../utils/cn';

interface ThreadItemProps {
  thread: Thread;
  isSelected: boolean;
  onClick: () => void;
}

const ThreadItem: React.FC<ThreadItemProps> = ({ thread, isSelected, onClick }) => {
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'sms':
        return <MessageSquare size={16} />;
      case 'phone':
        return <Phone size={16} />;
      case 'email':
        return <Mail size={16} />;
      default:
        return <MessageSquare size={16} />;
    }
  };

  return (
    <div
      className={cn(
        'flex items-center p-3 h-[72px] cursor-pointer transition-colors',
        isSelected ? 'bg-primary-50' : 'hover:bg-gray-50'
      )}
      onClick={onClick}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-medium">
        {thread.contact.name.split(' ').map(n => n[0]).join('')}
      </div>
      
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {thread.contact.name}
          </h3>
          <span className="text-xs text-gray-500">
            {format(thread.lastMessage.timestamp, 'MMM d')}
          </span>
        </div>
        
        <div className="flex items-center mt-1">
          <span className="text-sm text-gray-500 truncate flex-1">
            {thread.lastMessage.content}
          </span>
          <div className="flex items-center ml-2">
            <div className="text-gray-400">
              {getChannelIcon(thread.channel)}
            </div>
            {thread.unreadCount > 0 && (
              <span className="ml-2 bg-primary-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                {thread.unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadItem;