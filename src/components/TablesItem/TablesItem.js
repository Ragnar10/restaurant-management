import React, {useState} from 'react';

import './TablesItem.css';

const TablesItem = ({table, deleteTable, editTable}) => {

    const [showMenu, setShowMenu] = useState(false);

    const onShowMenu = (e) => {
        e.preventDefault();
        setShowMenu(true);
    };

    const onDeleteTable = (tableId) => {
        setShowMenu(false);
        deleteTable(tableId);
    };

    const onEditTable = (tableId) => {
        setShowMenu(false);
        editTable(tableId);
    };

    return (
        <div className='table' onContextMenu={onShowMenu} onClick={() => setShowMenu(false)} title='Есть контекстное меню'>
            { showMenu ?
                <div className='table_menu'>
                    <div className='table_edit' onClick={() => onEditTable(table.id)}>Редактировать</div>
                    <div className='table_del' onClick={() => onDeleteTable(table.id)}>Удалить</div>
                </div>: null
            }
            <div className='table_name'>{table.name}</div>
            <div className='table_description'>{`"${table.description}"`}</div>
            <div className='table_seatsCount'>
                <span className='seats'>Мест:</span>{table.seatsCount}
            </div>
        </div>
    );
};

export default TablesItem;