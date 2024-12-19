import React, { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import TodoCard from './TodoCard';
import { Todo, Column } from '../types';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: Date.now(),
      text: 'Create a todolist repo with Claude MCP',
      status: 'todo'
    }
  ]);

  const [columns, setColumns] = useState<{ [key: string]: Column }>({
    todo: {
      id: 'todo',
      title: 'Todo',
      taskIds: todos.filter(t => t.status === 'todo').map(t => t.id)
    },
    doing: {
      id: 'doing',
      title: 'In Progress',
      taskIds: todos.filter(t => t.status === 'doing').map(t => t.id)
    },
    done: {
      id: 'done',
      title: 'Completed',
      taskIds: todos.filter(t => t.status === 'done').map(t => t.id)
    }
  });

  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      status: 'todo'
    };

    setTodos([...todos, newTodo]);
    setColumns({
      ...columns,
      todo: {
        ...columns.todo,
        taskIds: [...columns.todo.taskIds, newTodo.id]
      }
    });
    setInputValue('');
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
    setColumns({
      ...columns,
      todo: {
        ...columns.todo,
        taskIds: columns.todo.taskIds.filter(taskId => taskId !== id)
      },
      doing: {
        ...columns.doing,
        taskIds: columns.doing.taskIds.filter(taskId => taskId !== id)
      },
      done: {
        ...columns.done,
        taskIds: columns.done.taskIds.filter(taskId => taskId !== id)
      }
    });
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    if (sourceColumn === destColumn) {
      const newTaskIds = Array.from(sourceColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, parseInt(draggableId));

      setColumns({
        ...columns,
        [sourceColumn.id]: {
          ...sourceColumn,
          taskIds: newTaskIds
        }
      });
    } else {
      const sourceTaskIds = Array.from(sourceColumn.taskIds);
      const destTaskIds = Array.from(destColumn.taskIds);
      sourceTaskIds.splice(source.index, 1);
      destTaskIds.splice(destination.index, 0, parseInt(draggableId));

      setColumns({
        ...columns,
        [sourceColumn.id]: {
          ...sourceColumn,
          taskIds: sourceTaskIds
        },
        [destColumn.id]: {
          ...destColumn,
          taskIds: destTaskIds
        }
      });

      setTodos(todos.map(todo =>
        todo.id === parseInt(draggableId)
          ? { ...todo, status: destination.droppableId as 'todo' | 'doing' | 'done' }
          : todo
      ));
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
          Claude TodoList
        </h1>
        
        <form onSubmit={handleAddTodo} className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add a new todo..."
              className="flex-1 px-4 py-3 bg-card-bg border border-border-color rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent placeholder-text-secondary"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background transition-colors duration-200"
            >
              Add Todo
            </button>
          </div>
        </form>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(columns).map(column => (
              <div key={column.id} className="bg-card-bg rounded-xl p-4 border border-border-color">
                <h2 className="text-lg font-semibold mb-4 text-text-primary px-2">
                  {column.title}
                  <span className="ml-2 text-sm text-text-secondary">
                    ({column.taskIds.length})
                  </span>
                </h2>
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`min-h-[200px] ${snapshot.isDraggingOver ? 'bg-accent/5' : ''} rounded-lg transition-colors duration-200 p-2`}
                    >
                      {column.taskIds.map((taskId, index) => {
                        const todo = todos.find(t => t.id === taskId);
                        if (!todo) return null;
                        return (
                          <TodoCard
                            key={todo.id}
                            todo={todo}
                            index={index}
                            onDelete={deleteTodo}
                          />
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default TodoList;