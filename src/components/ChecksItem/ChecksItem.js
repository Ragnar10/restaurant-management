import React, {useState} from 'react';

import './ChecksItem.css';

const ChecksItem = ({check, editCheck, closeCheck}) => {

    const [newCheck, setNewCheck] = useState(check);
    const [showMenu, setShowMenu] = useState({showCloseCheck: true, showCalculateCheck: false});

    const onEditCheck = (checkId) => {
        editCheck(checkId);
    };


    const onCloseCheck = (check) => {
        const total = check.dishes.map(item => +item.price * +item.multiplier).reduce((sum, acc) => {
            return +sum + acc;
        }, 0);
        setNewCheck({
           ...newCheck,
           total: total
        });
        setShowMenu({
            showCloseCheck: false,
            showCalculateCheck: true
        });
    };

    const onChangeTips = (e) => {
        setNewCheck({
            ...newCheck,
            tips: e.target.value
        });
    };

    const calculateCheck = () => {
        closeCheck(newCheck);
    };

    return (
        <div className='check'>
            <div className='check_id'>{`Чек № ${check.id}`}</div>
            <div className='check_item_name'>
                Стол:
                <span className='check_name'>{check.tableId.name}</span>
            </div>
            <div className='check_item_name'>
                Официант:
                <span className='check_name'>{check.waiterId.name}</span>
            </div>
            <div className='check_dishes'>
                <div className='check_dishes_caption'>Заказанные блюда:</div>
                {
                    check.dishes.map(item => {
                        return (
                            <div className='check_dishes_item' key={item.id}>
                                <div className='check_dish_name'>{item.name}</div>
                                <div className='check_dish_multiplier'>{`x${item.multiplier}`}</div>
                                <div className='check_dish_price'>
                                    {`${item.price * item.multiplier} грн`}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <div>
                { !check.total ?
                    <div className='check_buttons'>
                        <div className='add_dish' onClick={() => onEditCheck(check.id)}>+</div>
                        { showMenu.showCloseCheck ? <div className='close_dish' onClick={() => onCloseCheck(check)}>Закрыть счет</div> : null}
                        { showMenu.showCalculateCheck ?
                            <>
                                <div className='tips_wrapper'>
                                    <label htmlFor='tips'>Чаевые:</label>
                                    <input type='text'
                                           name='tips'
                                           className='dish_input'
                                           value={newCheck.tips}
                                           onChange={onChangeTips}
                                    />
                                </div>
                                <div className='closed_dish' onClick={calculateCheck}>Рассчитать</div>
                            </>
                            : null}
                    </div> : null
                }
            </div>
            {check.total ?
                <>
                    <div className='check_total'>{`Total: ${check.total} грн`}</div>
                    {newCheck.tips ? <div className='check_tips'>{`Tips: ${newCheck.tips} грн`}</div> : <div className='check_tips'>Клиент не оставил чаевых!</div>}
                </>
                : null
            }
        </div>
    );
};

export default ChecksItem;