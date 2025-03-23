import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, MessageCircle, Plus, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import useStore from '../store/useStore';

const PostList: React.FC = () => {
  const users = useStore((state) => state.users);
  const likeOption = useStore((state) => state.likeOption);
  const shareOption = useStore((state) => state.shareOption);
  const addComment = useStore((state) => state.addComment);
  const addOption = useStore((state) => state.addOption);

  const [expandedComments, setExpandedComments] = useState<string[]>([]);
  const [newComments, setNewComments] = useState<{ [key: string]: string }>({});
  const [newOptions, setNewOptions] = useState<{ [key: string]: string }>({});

  const toggleComments = (optionId: string) => {
    setExpandedComments(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleAddOption = (postId: string) => {
    if (!newOptions[postId]?.trim()) return;

    addOption(postId, {
      id: Math.random().toString(36).substr(2, 9),
      text: newOptions[postId],
      likes: 0,
      shares: 0,
      comments: [],
    });

    setNewOptions(prev => ({ ...prev, [postId]: '' }));
  };

  const handleAddComment = (postId: string, optionId: string) => {
    const commentKey = `${postId}-${optionId}`;
    if (!newComments[commentKey]?.trim()) return;

    addComment(postId, optionId, {
      id: Math.random().toString(36).substr(2, 9),
      userId: '1',
      text: newComments[commentKey],
      createdAt: new Date(),
    });

    setNewComments(prev => ({ ...prev, [commentKey]: '' }));
  };

  return (
    <div className="space-y-8">
      {users.map((user) =>
        user.posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                </p>
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-4">{post.title}</h2>
            <div className="space-y-4">
              {post.options.map((option) => (
                <motion.div
                  key={option.id}
                  className="border rounded-lg p-4"
                  whileHover={{ scale: 1.01 }}
                >
                  <p className="text-lg mb-3">{option.text}</p>
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => likeOption(post.id, option.id)}
                      className="flex items-center gap-2 text-pink-600 hover:bg-pink-50 px-3 py-2 rounded-lg transition-colors"
                    >
                      <Heart size={20} />
                      <span>{option.likes}</span>
                    </button>
                    <button
                      onClick={() => shareOption(post.id, option.id)}
                      className="flex items-center gap-2 text-green-600 hover:bg-green-50 px-3 py-2 rounded-lg transition-colors"
                    >
                      <Share2 size={20} />
                      <span>{option.shares}</span>
                    </button>
                    <button
                      onClick={() => toggleComments(option.id)}
                      className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                    >
                      <MessageCircle size={20} />
                      <span>{option.comments.length}</span>
                      {expandedComments.includes(option.id) ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                  </div>
                  <AnimatePresence>
                    {expandedComments.includes(option.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-4 space-y-2 overflow-hidden"
                      >
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newComments[`${post.id}-${option.id}`] || ''}
                            onChange={(e) =>
                              setNewComments(prev => ({
                                ...prev,
                                [`${post.id}-${option.id}`]: e.target.value
                              }))
                            }
                            placeholder="Add a comment..."
                            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => handleAddComment(post.id, option.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Send size={20} />
                          </button>
                        </div>
                        {option.comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="bg-gray-50 rounded-lg p-3"
                          >
                            <p className="text-sm">{comment.text}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDistanceToNow(comment.createdAt, {
                                addSuffix: true,
                              })}
                            </p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 flex gap-2">
              <input
                type="text"
                value={newOptions[post.id] || ''}
                onChange={(e) =>
                  setNewOptions(prev => ({ ...prev, [post.id]: e.target.value }))
                }
                placeholder="Add a new option..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleAddOption(post.id)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} />
                Add Option
              </button>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default PostList;