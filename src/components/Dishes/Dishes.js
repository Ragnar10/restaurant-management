import React,{useEffect} from 'react';
import {Switch ,Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { createSelector} from 'reselect';
import {deleteDish, searchDish, getDishes} from "../../store/actions/dishes/actions";
import DishesTable from '../DishesTable/DishesTable';
import DishForm from "../DishForm/DishForm";
import Spinner from "../Spinner/Spinner";

import './Dishes.css';

const Dishes = ({match, history, dishes, search, loading, getDishes, deleteDish, searchDish}) => {

    useEffect(() => {
        getDishes();
    },[]);

    const editDish = (dishId) => {
        history.push(`${match.path}/${dishId}`);
    };

    return (
        <div className='dishes_wrapper'>
            <Switch>
                <Route path={`${match.path}`} exact>
                    {
                        loading ? <Spinner/> :
                            <>
                                <Link to={`${match.url}/new`} className='add_btn'>Add Dish</Link>
                                <input type='text'
                                       name='search'
                                       value={search}
                                       className='dish_search'
                                       placeholder='Search'
                                       onChange={(e) => searchDish(e.target.value)}
                                />
                                <DishesTable dishes={dishes}
                                             deleteDish={deleteDish}
                                             editDish={editDish}
                                />
                            </>
                    }
                </Route>
                <Route path={`${match.path}/:id`}>
                    {
                        ({match, history}) => {
                            return <DishForm id={match.params.id} history={history} match={match} dishes={dishes}/>;
                        }
                    }
                </Route>
            </Switch>
        </div>
    );
};

const listSelector = (state) => state.list;
const searchSelector = (state) => state.search;

const getFilterDishes = createSelector(
    [listSelector, searchSelector],
    (list, search) => {
        const searchRegExp = new RegExp(search, 'gi');
        return search ?
            list.filter(item => (item.name.match(searchRegExp) || item.description.match(searchRegExp)))
            : list
    }
);

const mapStateToProps = ({dishesReducer}) => {
    return {
        dishes: getFilterDishes(dishesReducer),
        search: dishesReducer.search,
        loading: dishesReducer.loading
    }
};
const mapDispatchToProps = {
    getDishes: getDishes,
    deleteDish: deleteDish,
    searchDish: searchDish,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dishes);