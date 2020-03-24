import React,{useEffect} from 'react';
import {Switch ,Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {deleteWaiter, searchWaiter, getWaiters} from "../../store/actions/waiters/actions";
import List from '../List/List';
import WaitersItem from "../WaitersItem/WaitersItem";
import WaiterForm from "../WaiterForm/WaiterForm";
import Spinner from "../Spinner/Spinner";

import './Waiters.css';

const Waiters = ({match, history, waiters, search, loading, getWaiters, deleteWaiter, searchWaiter}) => {

    useEffect(() => {
      getWaiters();
    },[]);

    const onEditWaiter = (waiterId) => {
        history.push(`${match.path}/${waiterId}`);
    };

    return (
        <div className='waiters_wrapper'>
            <Switch>
                <Route path={`${match.path}`} exact>
                    {
                        loading ? <Spinner/> :
                            <>
                                <Link to={`${match.url}/new`} className='add_btn'>Add waiter</Link>
                                <input type='text'
                                       name='search'
                                       value={search}
                                       className='waiter_search'
                                       placeholder='Search'
                                       onChange={(e) => searchWaiter(e.target.value)}
                                />
                                <List>
                                    {waiters.map(item => {
                                        return <WaitersItem
                                            waiter={item}
                                            key={item.id}
                                            deleteWaiter={deleteWaiter}
                                            editWaiter={onEditWaiter}
                                        />
                                    })}
                                </List>
                            </>
                    }
                </Route>
                <Route path={`${match.path}/:id`}>
                    {
                        ({match, history}) => {
                            return <WaiterForm id={match.params.id}  match={match} history={history} waiters={waiters}/>;
                        }
                    }
                </Route>
            </Switch>
        </div>
    );
};

const listSelector = (state) => state.list;
const searchSelector = (state) => state.search;

const getFilterWaiters = createSelector(
    [listSelector, searchSelector],
    (list, search) => {
        const searchRegExp = new RegExp(search, 'gi');
        return search ?
            list.filter(item => item.name.match(searchRegExp))
            : list
    }
);

const mapStateToProps = ({waitersReducer}) => {
    return {
        waiters: getFilterWaiters(waitersReducer),
        search: waitersReducer.search,
        loading: waitersReducer.loading
    }
};
const mapDispatchToProps = {
    getWaiters: getWaiters,
    deleteWaiter: deleteWaiter,
    searchWaiter: searchWaiter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Waiters);