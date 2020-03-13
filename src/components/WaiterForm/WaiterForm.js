import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import {saveWaiter} from '../../store/actions/waiters/actions';
import {transformDateBeforeForm} from "../../utils/transformDate";

import './WaiterForm.css';

const WaiterForm = ({waiter, waiters, history, match, saveWaiter}) => {
    const [newWaiter, setNewWaiter] = useState(waiter);
    const [error, setError] = useState(false);

    const onChangeInput = (e) => {
        setNewWaiter({
            ...newWaiter,
            [e.target.name]: e.target.value
        });
    };

    const onSaveWaiter = () => {
        if (!newWaiter.name || !newWaiter.salary || !newWaiter.startDate) {
            setError(true);
            return;
        }
        saveWaiter(newWaiter);
        history.goBack();
    };

    const id = waiters.findIndex(item => item.id === match.params.id);
    if (id === -1 && match.params.id !== 'new') {
        return (
            <Route>
                <Redirect to='/waiters'/>
            </Route>
        );
    }

    return (
        <div className='waiter_form'>
            <label htmlFor='name' className='waiter_label'>Waiter:</label>
            <input type='text'
                   name='name'
                   className='waiter_input'
                   maxLength='30'
                   value={newWaiter.name}
                   onChange={onChangeInput}
            />
            <label htmlFor='salary' className='waiter_label'>Salary:</label>
            <input type='text'
                   name='salary'
                   className='waiter_input'
                   value={newWaiter.salary}
                   onChange={onChangeInput}
            />
            <label htmlFor='startDate' className='waiter_label'>Start date:</label>
            <input type='date'
                   name='startDate'
                   className='waiter_input'
                   value={transformDateBeforeForm(newWaiter.startDate)}
                   onChange={onChangeInput}
            />
            <div className='waiter_error'>{error ? 'Не все поля заполенны': null}</div>
            <div className='save_btn' onClick={onSaveWaiter}>Save</div>
        </div>
    );
};

const mapStateToProps = (state, props) => {
    return {
        waiter: props.id !== 'new' ? props.waiters.find(item => item.id === props.id) : {name: '', salary: '', startDate: ''},
        waiters: props.waiters
    }
};
const mapDispatchToProps = {
    saveWaiter: saveWaiter
};

export default connect(mapStateToProps, mapDispatchToProps)(WaiterForm);