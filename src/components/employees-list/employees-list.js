import EmployeesListItem from "../employees-list-item/employees-list-item";
import "./employees-list.css"


const EmployeesList = ({data, onDelete, onToggleProp, onSalarySelect}) => {

    const elements = data.map((item) => {
        const {id, salary, ...itemProps} = item
        return (
            <EmployeesListItem 
                key={id}
                salary = {salary}
                onSalarySelect = {(e) => onSalarySelect(id, e.target.value)}
                {...itemProps}
                onDelete={() => onDelete(id)}
                onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}/>
        )
    })

    const str = <h2>В компании пока что нету сотрудников</h2>

    const test = data.length > 0 ? elements : str;

    return (
        <ul className="app-list list-group">
            {test}
        </ul>
    )
}

export default EmployeesList;