import React from 'react';
import { Todo } from '../types';
import { Draggable } from '@hello-pangea/dnd';

interface TodoCardProps {
  todo: Todo;
  index: number;
  onDelete: (id: number) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, index, onDelete }) => {
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-lg shadow-md p-6 mb-4 ${snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-500' : ''} hover:shadow-lg transition-shadow duration-200`}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">{todo.text}</h3>
            <button
              onClick={() => onDelete(todo.id)}
              className="text-red-500 hover:text-red-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
          <div className="mt-2">
            <span className={`text-sm px-2 py-1 rounded ${getStatusColor(todo.status)}`}>
              {todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'todo':
      return 'bg-gray-100 text-gray-800';
    case 'doing':
      return 'bg-blue-100 text-blue-800';
    case 'done':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default TodoCard;