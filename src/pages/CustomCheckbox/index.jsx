import { memo, useState } from "react"

const CustomCheckbox = ({ options }) => {
    const [selected, setSelected] = useState([])
    const [lastIndex, setLastIndex] = useState(null);
    const isChecked = (data) => {
        const findSelected = selected?.findIndex((el) => el.id === data?.id)
        if (findSelected == -1) {
            return false
        } else {
            return true
        }
    }

    const handleSingleSelect = (data, index) => {
    const exists = selected.some((el) => el.id === data.id);

    if (exists) {
      setSelected([]);
      setLastIndex(null);
    } else {
      setSelected([data]);
      setLastIndex(index);
    }
  };
    const handleMultiSelect = (data, index) => {
        setSelected((prev) => {
            const exists = prev.some((el) => el.id === data.id);
            let next = exists ? prev.filter((el) => el.id !== data.id) : [...prev, data];
            return next;
        });
        setLastIndex(index);
    };

    const handleBulkSelect = (index) => {
        if (lastIndex === null) return;

        const start = Math.min(lastIndex, index);
        const end = Math.max(lastIndex, index);

        const newRange = options.slice(start, end + 1);

        setSelected(newRange);
    };
    const handleClick = (e, data, index) => {
        const isCmd = e.metaKey
        const isShift = e.shiftKey;
        if (isCmd && isShift) {
            handleBulkSelect(index);
            return;
        }
        if (isCmd) {
            handleMultiSelect(data, index)
            return
        }
        handleSingleSelect(data, index)
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '300px' }}>
            {
                options?.map((option, index) => {
                    const checked = isChecked(option)
                    return (
                        <div key={option.id} onClick={(e) => handleClick(e, option, index)} style={{ padding: '10px',cursor:'pointer', display: 'flex', gap: '5px', backgroundColor: index % 2 == 0 ? '#f5f8fd' : '#ddd' }}>
                            <input type="checkbox" checked={checked} readOnly/>
                            {option.name}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default memo(CustomCheckbox)