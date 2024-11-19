import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TicketCard from "./TicketCard";
import Filter from "./Filter";
import TaskModal from "./TaskModal";
import "../styles/KanbanBoard.css";

function KanbanBoard() {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Task 1", description: "Description of Task 1", status: "Todo" },
    { id: "2", title: "Task 2", description: "Description of Task 2", status: "In Progress" },
    { id: "3", title: "Task 3", description: "Description of Task 3", status: "Done" },
  ]);
  const [showModal, setShowModal] = useState(false);

  const columns = ["Todo", "In Progress", "Done"];

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  const addTask = (newTask) => {
    const id = (tasks.length + 1).toString();
    setTasks([...tasks, { id, ...newTask }]);
  };

  return (
    <div className="kanban-board">
      <Filter />
      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowModal(true)}
      >
        Add Task
      </button>
      <TaskModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        addTask={addTask}
      />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="board-columns">
          {columns.map((column) => (
            <Droppable key={column} droppableId={column}>
              {(provided) => (
                <div
                  className="board-column"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h2>{column}</h2>
                  {tasks
                    .filter((task) => task.status === column)
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TicketCard title={task.title} description={task.description} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default KanbanBoard;
