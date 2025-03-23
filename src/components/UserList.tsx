import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import useStore from '../store/useStore';

const UserList: React.FC = () => {
  const users = useStore((state) => state.users);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Trophy className="text-yellow-500" />
        Top Users
      </h2>
      <div className="space-y-4">
        {[...users]
          .sort((a, b) => b.totalLikes - a.totalLikes)
          .map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <span className="text-2xl font-bold text-gray-400">
                #{index + 1}
              </span>
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">
                  {user.totalLikes} total likes
                </p>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default UserList;