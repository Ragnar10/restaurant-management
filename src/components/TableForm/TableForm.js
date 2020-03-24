import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {saveTable} from '../../store/actions/tables/actions';

import './TableForm.css';

const TableForm = ({table, tables, history, match, saveTable}) => {

    const id = tables.findIndex(item => item.id === match.params.id);
    if (id === -1 && match.params.id !== 'new') {
        return (
            <Route>
                <Redirect to='/tables'/>
            </Route>
        );
    }

    return (
        <Formik
            initialValues={{id: table.id || '' ,name: table.name, description: table.description, seatsCount: table.seatsCount}}
            validationSchema={Yup.object({
                name: Yup.string()
                    .min(2, "Ты че? Слишком короткое")
                    .max(20, "У тя че, больше 20?")
                    .matches(/^[A-Za-zА-Яа-я0-9 ]*$/g, "Не правильно заполнено поле")
                    .required("Обятазтельное поле"),
                description: Yup.string()
                    .min(2, "Ты че? Слишком короткое")
                    .max(20, "У тя че, больше 20?")
                    .matches(/^[A-Za-zА-Яа-я0-9 ]+$/g, "Не правильно заполнено поле")
                    .required("Обятазтельное поле"),
                seatsCount: Yup.string()
                    .required("Обятазтельное поле")
            })}
            onSubmit={(values, {setSubmitting}) => {
                saveTable(values);
                history.goBack();
                setSubmitting(false);
            }}
        >
            {
                (props) => (
                    <Form className='table_form' onSubmit={props.handleSubmit}>
                        <label htmlFor='name' className='table_label'>Table:</label>
                        <Field
                            name = 'name'
                            className = 'table_input'
                            onChange = {props.handleChange}
                        />
                        <span className="table_error">
                            <ErrorMessage name="name" />
                        </span>
                        <label htmlFor='description' className='table_label'>Description:</label>
                        <Field
                            name = 'description'
                            className = 'table_input'
                            onChange = {props.handleChange}
                        />
                        <span className="table_error">
                            <ErrorMessage name="description" />
                        </span>
                        <label htmlFor='seatsCount' className='table_label'>Seats count:</label>
                        <Field
                            name = 'seatsCount'
                            className = 'table_input'
                            onChange = {props.handleChange}
                        />
                        <span className="table_error">
                            <ErrorMessage name="seatsCount" />
                        </span>
                        <button type='submit' className='save_btn'>Save</button>
                    </Form>
                )
            }
        </Formik>
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