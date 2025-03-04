const AddInput = ({ newTask, getNewTask, addNewTask }) => {
  return (
    <div className="input_group">
      <input
        type="text"
        value={newTask}
        placeholder="What is the task today?"
        onChange={getNewTask}
      />
      <button onClick={addNewTask}>Add task</button>
    </div>
  );
};

export { AddInput };
