import styles from "./files.module.css";

const Folder = ({ data, toggleFolder, addFolder }) => {
  const isFolder = Array.isArray(data.files);

  const handleToggle = () => {
    if (isFolder) toggleFolder(data);
  };

  return (
    <li>
      <button onClick={handleToggle} className={styles.folderBtn}>
        {data.name} {isFolder ? (data.isOpen ? "📂" : "📁") : ""}
      </button>

      {data.isOpen && isFolder && (
        <ul className={styles.subList}>
          {data.files.map((item, idx) => (
            <Folder
              key={idx}
              data={item}
              toggleFolder={toggleFolder}
              addFolder={addFolder}
            />
          ))}

          <li>
            <button
              className={styles.addBtn}
              onClick={() => addFolder(data)}
            >
              + Add Folder
            </button>
          </li>
        </ul>
      )}
    </li>
  );
};

export default Folder;
