const EditInput = ({ updatedTask, getUpdateTask, updateTask }) => {
  return (
    <div className="input_group">
      <input type="text" value={updatedTask} onChange={getUpdateTask} />
      <button onClick={updateTask} value="Update task">
        Update task
      </button>
    </div>
  );
};

export { EditInput };
