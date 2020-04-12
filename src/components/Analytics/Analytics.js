import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {Route} from "react-router-dom";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {getChecks} from "../../store/actions/checks/actions";
import Spinner from "../Spinner/Spinner";

import './Analytics.css';

const Analytics = ({match, checks, loading, getChecks}) => {
    useEffect(() => {
        getChecks();
    },[]);

    const getCaption = (id) => {
        return id.includes('table') ?
            checks.find(item => item.tableId.id === id.slice(5)).tableId.name :
            checks.find(item => item.waiterId.id === id.slice(6)).waiterId.name;
    };

    const getTableOrWaiter = (id) => {
        return id.includes('table') ?
            checks.filter(item => item.tableId.id === id.slice(5)).map(item => {
                return {
                    tip: `Чек №${item.id}`,
                    ["Total, грн"]: item.total
                };
            }) :
            checks.filter(item => item.waiterId.id === id.slice(6)).map(item => {
                return {
                    tip: `Чек №${item.id}`,
                    ["Total, грн"]: item.total
                };
            })
    };

    const arithmeticalMean = (id) => {
        const countChecks = getTableOrWaiter(id).length;
        return  (getTableOrWaiter(id)
            .map(item => +item["Total, грн"])
            .reduce((sum, acc) => +sum + acc , 0) / countChecks).toFixed(2);
    };

    const _findTable = (checks, match) => {
        return checks.findIndex(item =>  item.tableId.id === match.params.id.slice(5)) === -1;
    };

    const _findWaiter = (checks, match) => {
        return checks.findIndex(item =>  item.waiterId.id === match.params.id.slice(6))  === -1;
    };


    if ( match.params.id === undefined ||
        !match.params.id.includes('table') &&
        !match.params.id.includes('waiter') ||
        _findTable(checks, match) && _findWaiter(checks, match) ) {
        return (
            <Route>
                <div className='error_message'>Выберете нужного вам официанта или столик!</div>
            </Route>
        );
    }

    return (
        <div className='analytics_wrapper'>
            {
                loading ? <Spinner/> :
                    <div>
                        <div className='analytics_caption'>{getCaption(match.params.id)}</div>
                        <LineChart width={1000} height={400} data={getTableOrWaiter(match.params.id)}
                                   margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <XAxis dataKey="tip"/>
                            <YAxis/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend />
                            <Line type="monotone" dataKey="Total, грн" stroke="#8884d8" activeDot={{r: 8}}/>
                        </LineChart>
                        <div className='analytics_am'>{`Средний чек: ${arithmeticalMean(match.params.id)} грн`}</div>
                    </div>
            }
        </div>
    );
};


const mapStateToProps = ({checksReducer}) => {
    return {
        checks: checksReducer.list,
        loading: checksReducer.loading
    }
};
const mapDispatchToProps = {
    getChecks: getChecks
};

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);