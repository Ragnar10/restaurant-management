import React, {useState} from 'react';
import {transformDateAfterForm} from "../../utils/transformDate";

import './WaitersItem.css';

const WaitersItem = ({waiter, deleteWaiter, editWaiter}) => {

    const [showMenu, setShowMenu] = useState(false);

    const onShowMenu = (e) => {
        e.preventDefault();
        setShowMenu(true);
    };

    const onDeleteWaiter = (waiterId) => {
        setShowMenu(false);
        deleteWaiter(waiterId);
    };

    const onEditWaiter = (waiterId) => {
        setShowMenu(false);
        editWaiter(waiterId);
    };

    return (
        <div className='waiter' onContextMenu={onShowMenu} onClick={() => setShowMenu(false)} title='Есть контекстное меню'>
            { showMenu ?
                <div className='waiter_menu'>
                    <div className='waiter_edit' onClick={() => onEditWaiter(waiter.id)}>Редактировать</div>
                    <div className='waiter_del' onClick={() => onDeleteWaiter(waiter.id)}>Удалить</div>
                </div>: null
            }
            <div className='waiter_name'>{waiter.name}</div>
            <div className='waiter_salary'>
                Зарплата: <span className='salary'>{waiter.salary}</span> грн
            </div>
            <div className='waiter_startDate'>
                <span className='date_start_desc'>Дата устройства на работу:</span>{transformDateAfterForm(waiter.startDate)}
            </div>
        </div>
    );
};

export default WaitersItem;