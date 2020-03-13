import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from "react-router-dom";
import {saveTable} from '../../store/actions/tables/actions';

import './TableForm.css';

const TableForm = ({table, tables, history, match, saveTable}) => {
    const [newTable, setNewTable] = useState(table);
    const [error, setError] = useState(false);

    const onChangeInput = (e) => {
        setNewTable({
            ...newTable,
            [e.target.name]: e.target.value
        });
    };

    const onSaveTable = () => {
        if (!newTable.name || !newTable.description || !newTable.seatsCount ) {
            setError(true);
            return;
        }
        setError(false);
        saveTable(newTable);
        history.goBack();
    };

    const id = tables.findIndex(item => item.id === match.params.id);
    if (id === -1 && match.params.id !== 'new') {
        return (
            <Route>
                <Redirect to='/tables'/>
            </Route>
        );
    }

    return (
        <div className='table_form'>
            <label htmlFor='name' className='table_label'>Table:</label>
            <input type='text'
                   name='name'
                   className='table_input'
                   maxLength='10'
                   value={newTable.name}
                   onChange={onChangeInput}
            />
            <label htmlFor='description' className='table_label'>Description:</label>
            <input type='text'
                   name='description'
                   className='table_input'
                   value={newTable.description}
                   onChange={onChangeInput}
            />
            <label htmlFor='seatsCount' className='table_label'>Seats count:</label>
            <input type='text'
                   name='seatsCount'
                   className='table_input'
                   value={newTable.seatsCount}
                   onChange={onChangeInput}
            />
            <div className='table_error'>{error ? 'Не все поля заполенны': null}</div>
            <div className='save_btn' onClick={onSaveTable}>Save</div>
        </div>
    );
};

const mapStateToProps = (state, props) => {
    return {
        table: props.id !== 'new' ? props.tables.find(item => item.id === props.id) : {name: '', description: '', seatsCount: ''},
        tables: props.tables
    }
};
const mapDispatchToProps = {
    saveTable: saveTable
};

export default connect(mapStateToProps, mapDispatchToProps)(TableForm);