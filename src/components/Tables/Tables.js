import React,{useEffect} from 'react';
import {Switch ,Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { createSelector} from 'reselect';
import {deleteTable, searchTable, getTables} from "../../store/actions/tables/actions";
import List from '../List/List';
import TablesItem from "../TablesItem/TablesItem";
import TableForm from "../TableForm/TableForm";
import Spinner from "../Spinner/Spinner";

import './Tables.css';

const Tables = ({match, history, tables, search, loading, getTables, deleteTable, searchTable}) => {

    useEffect(() => {
        getTables();
    },[]);

    const onEditTable = (tableId) => {
        history.push(`${match.path}/${tableId}`);
    };

    return (
        <div className='tables_wrapper'>
            <Switch>
                <Route path={`${match.path}`} exact>
                    {
                        loading ? <Spinner/> :
                            <>
                                <Link to={`${match.url}/new`} className='add_btn'>Add table</Link>
                                <input type='text'
                                       name='search'
                                       value={search}
                                       className='table_search'
                                       placeholder='Search'
                                       onChange={(e) => searchTable(e.target.value)}
                                />
                                <List>
                                    {tables.map(item => {
                                        return <TablesItem
                                            table={item}
                                            key={item.id}
                                            deleteTable={deleteTable}
                                            editTable={onEditTable}
                                        />
                                    })}
                                </List>
                            </>
                    }
                </Route>
                <Route path={`${match.path}/:id`}>
                    {
                        ({match, history}) => {
                            return <TableForm id={match.params.id} history={history} match={match} tables={tables}/>;
                        }
                    }
                </Route>
            </Switch>
        </div>
    );
};

const listSelector = (state) => state.list;
const searchSelector = (state) => state.search;

const getFilterTables = createSelector(
    [listSelector, searchSelector],
    (list, search) => {
        const searchRegExp = new RegExp(search, 'gi');
        return search ?
            list.filter(item => (item.name.match(searchRegExp) || item.description.match(searchRegExp)))
            : list
    }
);

const mapStateToProps = ({tablesReducer}) => {
    return {
        tables: getFilterTables(tablesReducer),
        search: tablesReducer.search,
        loading: tablesReducer.loading
    }
};
const mapDispatchToProps = {
    getTables: getTables,
    deleteTable: deleteTable,
    searchTable: searchTable,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tables);