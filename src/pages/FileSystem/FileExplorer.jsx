import { useState } from "react";
import Folder from "./Folder";
import { initialData } from "./constants";
import styles from "./files.module.css";

const updateData=(root,folder)=>{
  let temp=structuredClone(root)
  for(let item of temp){
    if(item.name===folder?.name){
      item.isOpen=!item?.isOpen
    }
    if(item?.files?.length>0){
      item.files=updateData(item.files,folder)
    }
  }
  return temp
}


const updateDataToAddFolder=(root,folder,folderName)=>{
  let temp=structuredClone(root)
  for(let item of temp){
    if(item.name===folder?.name){
      item.files.push({name:`New folder-${item.name}-${item.files.length+1}`,isOpen:false,files:[]})
    }
    if(item?.files?.length>0){
      item.files=updateData(item.files,folder,folderName)
    }
  }
  return temp
}
const FileExplorer = () => {
  const [root, setRoot] = useState(initialData);

  // ✅ Deeply toggle folder open/close
  const toggleFolder = (data) => {
   let updatedData=updateData(root,data)
   setRoot(updatedData)
  };

  // ✅ Add new folder inside any folder
  const addFolder = (data) => {
  let updatedData=updateDataToAddFolder(root,data)
  setRoot(updatedData)
  };

  // ✅ Add folder at root level
  const addRootFolder = () => {
    let temp=structuredClone(root)
    temp.push({
      name:`New Folder-${root?.length+1}`,
      isOpen:false,
      files:[]
    })
    setRoot(temp)
  };
  return (
    <div className={styles.container}>
      <ul>
        {root.map((folder, idx) => (
          <Folder
            key={idx}
            data={folder}
            toggleFolder={toggleFolder}
            addFolder={addFolder}
          />
        ))}
      </ul>

      <button className={styles.addBtn} onClick={addRootFolder}>
        + Add Folder to Root
      </button>
    </div>
  );
};

export default FileExplorer;
