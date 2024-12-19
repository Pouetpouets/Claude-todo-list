import React from 'react';
import { Todo } from '../types';

interface TodoCardProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
            {todo.text}
          </h3>
        </div>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-500 hover:text-red-700 transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Created: {new Date(todo.id).toLocaleDateString()}</span>
        <span className={`px-2 py-1 rounded ${todo.completed ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
          {todo.completed ? 'Completed' : 'Active'}
        </span>
      </div>
    </div>
  );
};

export default TodoCard;