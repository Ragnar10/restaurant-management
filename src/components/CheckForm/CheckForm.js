import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from "react-router-dom";
import {saveCheck} from '../../store/actions/checks/actions';

import './CheckForm.css';

const CheckForm = ({check, checks, tables, waiters, dishes, history, match, saveCheck}) => {
    const [newCheck, setNewCheck] = useState(check);
    const [error, setError] = useState(false);

    const onAddTable = (table) => {
        setNewCheck({
            ...newCheck,
            tableId: table
        });
    };

    const changeTable = () => {
        setNewCheck({
            ...newCheck,
            tableId: ''
        });
    };

    const onAddWaiter = (waiter) => {
        setNewCheck({
            ...newCheck,
            waiterId: waiter
        });
    };

    const changeWaiter = () => {
        setNewCheck({
            ...newCheck,
            waiterId: ''
        });
    };

    const onAddDish = (dish) => {
        setNewCheck({
            ...newCheck,
            dishes: newCheck.dishes.length === 0 ? [...newCheck.dishes, dish] :
                    newCheck.dishes.findIndex(item => item.id === dish.id) < 0 ?
                    [...newCheck.dishes, dish] : newCheck.dishes.map(item => item.id === dish.id ? {...item, multiplier: +item.multiplier + 1} : item)
        });
    };

    const deleteDish = (dishId) => {
        setNewCheck({
            ...newCheck,
            dishes: newCheck.dishes.filter(item => item.id !== dishId)
        });
    };

    const onSaveCheck = () => {
        if (!newCheck.tableId || !newCheck.waiterId) {
            setError(true);
            return;
        }
        setError(false);
        saveCheck(newCheck);
        history.goBack();
    };

    const id = checks.findIndex(item => item.id === match.params.id);
    if (id === -1 && match.params.id !== 'new') {
        return (
            <Route>
                <Redirect to='/tables'/>
            </Route>
        );
    }

    return (
        <div className='check_form'>
            <div className='check_label'>
                Table:
                {newCheck.tableId ? <span className='selected_item' onClick={changeTable}>{newCheck.tableId.name}</span> : null}
            </div>
            {
                !newCheck.tableId ?
                 <div className='check_select'>
                    {
                        tables.map((item) => {
                            return (
                                <div style={{display: 'flex'}} key={item.id}>
                                    <div className='check_tableId'
                                         onClick={() => onAddTable(item)}
                                    >
                                        {item.name}
                                    </div>
                                </div>
                            );
                        })
                    }
                </div> : null
            }
            <div className='check_label'>
                Waiter:
                {newCheck.tableId ? <span className='selected_item' onClick={changeWaiter}>{newCheck.waiterId.name}</span> : null}
            </div>
            {
                !newCheck.waiterId ?
                <div className='check_select check_waiter_width'>
                    {
                        waiters.map((item) => {
                            return (
                                <div style={{display: 'flex'}} key={item.id}>
                                    <div className='check_waiterId'
                                         onClick={() => onAddWaiter(item)}
                                    >
                                        {item.name}
                                    </div>
                                </div>
                            );
                        })
                    }
                </div> : null
            }
            <div className='check_label'>Dishes:</div>
            <div className='check_select_wrapper'>
                {
                    newCheck.dishes.length > 0 ?
                        <div className='check_select'>
                            {
                                newCheck.dishes.map((item) => {
                                    return (
                                        <div style={{display: 'flex'}} key={item.id}>
                                            <div className='check_dish_item' onClick={() => deleteDish(item.id)}>
                                                {`${item.name} x${item.multiplier}`}
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div> : null
                }
                <div className='check_select'>
                    {
                        dishes.map((item) => {
                            return (
                                <div style={{display: 'flex'}} key={item.id}>
                                    <div className='check_dishId'
                                         onClick={() => onAddDish(item)}
                                    >
                                        {item.name}
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div className='check_error'>{error ? 'Не все поля заполенны': null}</div>
            <div className='save_btn' onClick={onSaveCheck}>Save</div>
        </div>
    );
};

const mapStateToProps = (state, props) => {
    return {
        check: props.id !== 'new' ? props.checks.find(item => item.id === props.id) : {tableId: '', waiterId: '', dishes: [], total: '', tips: ''},
        checks: props.checks,
        tables: props.tables,
        waiters: props.waiters,
        dishes: props.dishes
    }
};
const mapDispatchToProps = {
    saveCheck: saveCheck
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckForm);