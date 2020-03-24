import React,{useEffect} from 'react';
import {Switch ,Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { createSelector} from 'reselect';
import {searchCheck, getChecks, closeCheck} from "../../store/actions/checks/actions";
import {getTables} from "../../store/actions/tables/actions";
import {getWaiters} from "../../store/actions/waiters/actions";
import {getDishes} from "../../store/actions/dishes/actions";
import List from "../List/List";
import ChecksItem from "../ChecksItem/ChecksItem";
import CheckForm from "../CheckForm/CheckForm";
import Spinner from "../Spinner/Spinner";

import './Checks.css';




const Checks = ({
                    match, history,
                    checks, search,
                    loading, tables,
                    waiters, dishes,
                    getChecks, getTables
                    , getWaiters, getDishes,
                    searchCheck, closeCheck }) => {

    useEffect(() => {
        getChecks();
        getTables();
        getWaiters();
        getDishes();
    },[]);

    const editCheck = (checkId) => {
        history.push(`${match.path}/${checkId}`);
    };

    return (
        <div className='checks_wrapper'>
            <Switch>
                <Route path={`${match.path}`} exact>
                    {
                        loading ? <Spinner/> :
                            <>
                                <Link to={`${match.url}/new`} className='add_btn'>Create check</Link>
                                <input type='text'
                                       name='search'
                                       value={search}
                                       className='check_search'
                                       placeholder='Search'
                                       onChange={(e) => searchCheck(e.target.value)}
                                />
                                <List>
                                    {checks.map(item => {
                                        return <ChecksItem
                                            check={item}
                                            key={item.id}
                                            editCheck={editCheck}
                                            closeCheck={closeCheck}
                                        />
                                    })}
                                </List>
                            </>
                    }
                </Route>
                <Route path={`${match.path}/:id`}>
                    {
                        ({match, history}) => {
                            return <CheckForm id={match.params.id}
                                              history={history}
                                              match={match}
                                              checks={checks}
                                              tables={tables}
                                              waiters={waiters}
                                              dishes={dishes}
                            />;
                        }
                    }
                </Route>
            </Switch>
        </div>
    );
};

const listSelector = (state) => state.list;
const searchSelector = (state) => state.search;

const getFilterChecks = createSelector(
    [listSelector, searchSelector],
    (list, search) => {
        const searchRegExp = new RegExp(search, 'gi');
        return search ?
            list.filter(item => (item.tableId.match(searchRegExp) || item.waiterId.match(searchRegExp)))
            : list
    }
);

const mapStateToProps = ({checksReducer, dishesReducer, tablesReducer, waitersReducer}) => {
    return {
        checks: getFilterChecks(checksReducer),
        search: checksReducer.search,
        loading: checksReducer.loading,
        tables: tablesReducer.list,
        waiters: waitersReducer.list,
        dishes: dishesReducer.list
    }
};
const mapDispatchToProps = {
    getChecks: getChecks,
    getTables: getTables,
    getWaiters: getWaiters,
    getDishes: getDishes,
    searchCheck: searchCheck,
    closeCheck: closeCheck
};

export default connect(mapStateToProps, mapDispatchToProps)(Checks);