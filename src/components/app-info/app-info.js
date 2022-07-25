import './app-info.css';

const AppInfo = ({employees, increased, rised}) => {

    

    return(
        <div className="app-info">
            <h1>Учет сотрудников в компании N</h1>
            <h2>Общее число сотрудников: {employees}</h2>
            <h2>Пмремию получит: {increased}</h2>
            <h2>На повышение: {rised}</h2>
        </div>
    );
}

export default AppInfo;