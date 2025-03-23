import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import useStore from '../store/useStore';

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const addPost = useStore((state) => state.addPost);
  const currentUser = useStore((state) => state.currentUser);

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const newPost = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser.id,
      title,
      options: options
        .filter((opt) => opt.trim() !== '')
        .map((text) => ({
          id: Math.random().toString(36).substr(2, 9),
          text,
          likes: 0,
          shares: 0,
          comments: [],
        })),
      createdAt: new Date(),
    };

    addPost(newPost);
    setTitle('');
    setOptions(['', '', '', '']);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 mb-8"
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's your question?"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="space-y-3">
          {options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
                placeholder={`Option ${index + 1}`}
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {index >= 4 && (
                <button
                  type="button"
                  onClick={() => handleRemoveOption(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handleAddOption}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Plus size={20} />
            Add Option
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            disabled={!title.trim() || options.every((opt) => !opt.trim())}
          >
            Create Post
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreatePost;