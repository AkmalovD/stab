import React from 'react';
import { ForumPost } from '@/types';

interface ForumPostCardProps {
  post: ForumPost;
}

const ForumPostCard: React.FC<ForumPostCardProps> = ({ post }) => {
  const getTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#0d98ba] transition-all duration-300 hover:shadow-lg cursor-pointer">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <img
            src={post.authorPhoto}
            alt={post.author}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 group-hover:border-[#0d98ba] transition-colors"
          />
          {post.answered && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#0d98ba] rounded-full flex items-center justify-center border-2 border-white">
              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-bold text-[#0d171b] group-hover:text-[#0d98ba] transition-colors text-lg leading-tight">
              {post.title}
            </h3>
            {post.answered && (
              <span className="flex-shrink-0 text-xs px-2.5 py-1 bg-[#0d98ba]/10 text-[#0d98ba] rounded-lg font-semibold border border-[#0d98ba]/20">
                Solved
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-[#4c809a] mb-3">
            <span className="font-medium text-[#0d171b]">{post.author}</span>
            <span>•</span>
            <span>{getTimeAgo(post.timestamp)}</span>
          </div>

          <p className="text-sm text-[#4c809a] leading-relaxed line-clamp-2 mb-4">
            {post.content}
          </p>

          <div className="flex items-center gap-2 flex-wrap mb-4">
            <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#f8fafc] text-[#0d98ba] border border-[#0d98ba]/20">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#f8fafc] text-[#4c809a] border border-gray-200">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {post.country}
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs text-[#4c809a] pt-4 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <span className="font-medium">{post.views}</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span className="font-medium">{post.replies}</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span className="font-medium">{post.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPostCard;
