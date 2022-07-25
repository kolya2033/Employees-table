import { Component } from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state ={
            data: [
                {name: 'Alex C.', salary: 800, increase: false, rise: true, id: 1},
                {name: 'John M.', salary: 3000, increase: true, rise: false, id: 2},
                {name: 'Kolya I.', salary: 5000, increase: false, rise: false, id: 3}
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            // const index = data.findIndex(elem => elem.id === id);
            // const before = data.slice(0, index);
            // const after = data.slice(index + 1);
            // const result = [...before, ...after];
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem]
            return{
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item
            })
        }))
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    onUpdateData = (data) => {
        this.setState({data})
    }

    serchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }   

    filterPost = (items, fillter) => {
        switch(fillter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000);
            case 'increase':
                return items.filter(item => item.increase);
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    onSalarySelect = (id, salary) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, salary: salary}
                }
                return item
            })
        }))
    }
    

    render() {

        const {data, term, filter} = this.state;
        const employees = data.length;
        const increased = data.filter(item => item.increase).length;
        const rised = data.filter(item => item.rise).length;
        const visibleData = this.filterPost(this.serchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased} rised={rised}/>
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
                <EmployeesList 
                    data={visibleData}
                    onSalarySelect={this.onSalarySelect}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm addItem={this.addItem}/>
            </div>
        )
    }
    
}

export default App;