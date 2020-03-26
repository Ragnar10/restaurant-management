import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {saveWaiter} from '../../store/actions/waiters/actions';
import {transformDateBeforeForm} from "../../utils/transformDate";

import './WaiterForm.css';


const WaiterForm = ({waiter, waiters, history, match, saveWaiter}) => {

    const id = waiters.findIndex(item => item.id === match.params.id);
    if (id === -1 && match.params.id !== 'new') {
        return (
            <Route>
                <Redirect to='/waiters'/>
            </Route>
        );
    }

    return (
        <Formik
            initialValues={{id: waiter.id || '' , name: waiter.name, salary: waiter.salary, startDate: transformDateBeforeForm(waiter.startDate)}}
            validationSchema={Yup.object({
                name: Yup.string()
                    .min(2, "Ты че? Слишком короткое")
                    .max(25, "У тя че, больше 20?")
                    .matches(/^[A-Za-zА-Яа-я ]*$/g, "Не правильно заполнено поле")
                    .required("Обятазтельное поле"),
                salary: Yup.string()
                    .min(3, "Ты че? Слишком короткое")
                    .max(8, "У тя че, такая большая зп?")
                    .matches(/^[0-9 ]+$/g, "Не правильно заполнено поле")
                    .required("Обятазтельное поле"),
                startDate: Yup.date()
                    .required("Обятазтельное поле")
            })}
            onSubmit={(values, {setSubmitting}) => {
                saveWaiter(values);
                history.goBack();
                setSubmitting(false);
            }}
        >
            {
                (props) => (
                    <Form className='waiter_form' onSubmit={props.handleSubmit}>
                        <label htmlFor='name' className='waiter_label'>Waiter:</label>
                        <Field
                            name = 'name'
                            className = 'waiter_input'
                            onChange = {props.handleChange}
                        />
                        <span className="waiter_error">
                            <ErrorMessage name="name" />
                        </span>
                        <label htmlFor='salary' className='waiter_label'>Salary:</label>
                        <Field
                            name = 'salary'
                            className = 'waiter_input'
                            onChange = {props.handleChange}
                        />
                        <span className="waiter_error">
                            <ErrorMessage name="salary" />
                        </span>
                        <label htmlFor='startDate' className='waiter_label'>Start date:</label>
                        <Field
                            type = 'date'
                            name = 'startDate'
                            className = 'waiter_input'
                            onChange = {props.handleChange}
                        />
                        <span className="waiter_error">
                            <ErrorMessage name="startDate" />
                        </span>
                        <button type='submit' className='save_btn btn-width'>Save</button>
                    </Form>
                )
            }
        </Formik>
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