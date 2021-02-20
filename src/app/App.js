import React, {Component} from 'react';

class App extends Component {

    constructor(){
        super();
        this.state = {
            title : '',
            description : '',
            subject : '',
            deadline : '',
            priority : '',
            tasks: [],
            _id: '',
            sort1: '1',
            sort2: '1'
        }

        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.fetchTask = this.fetchTask.bind(this);
    }

    addTask(e){
        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'put',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html: 'Tarea Actualizada'});
                this.setState({
                    title : '',
                    description : '',
                    subject : '',
                    deadline : '',
                    priority : '',
                    _id: ''
                });
                this.fetchTask();
            })
            .catch(err => console.log(err));
        }
        else{
            fetch('/api/tasks', {
                method: 'post',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html: 'Tarea Guardada'});
                this.setState({
                    title : '',
                    description : '',
                    subject : '',
                    deadline : '',
                    priority : '',
                });
                this.fetchTask();
            })
            .catch(err => console.log(err));
        }

        e.preventDefault();
    }

    componentDidMount(){
        this.fetchTask();
    }

    fetchTask(){
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data =>{
            this.setState({tasks: data});
        })
        .catch(err => console.log(err));
    }

    deleteTask(id){
        if(confirm('Seguro?')){
            fetch(`/api/tasks/${id}`,{
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html: 'Tarea Eliminada'});
                this.fetchTask();
            })
            .catch(err => console.log(err));
        }
    }

    editTask(id){
        fetch(`/api/tasks/${id}`)
        .then(res => res.json())
        .then(data => this.setState({
            title: data.title,
            description: data.description,
            subject: data.subject,
            deadline: data.deadline,
            priority: data.priority,
            _id: data._id
        }))
        .catch(err => console.log(err));
    }

    updateTask(){}

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
        if(name == 'sort1' || name == 'sort2')
            this.fetchTask();
    }

    render() {
        return(
            <div>
                {/* Navigation */}
                <nav className = 'light-blue darken-4'>
                    <div className = 'container'>
                        <a className = 'brand-logo' href = '/'>Administrador de tareas</a>
                    </div>
                </nav>

                <div className = 'container'>
                    <div className = 'row'>
                        <div className = 'col s5'>
                            <div className = 'card'>
                                <div className = 'card-content'>
                                    <form onSubmit = {this.addTask}>
                                        <div className = 'row'>
                                            <div className = 'input-field col s12'>
                                                <input name = 'title' onChange = {this.handleChange}
                                                type = 'text' placeholder = 'Titulo' value = {this.state.title}/>
                                            </div>
                                        </div>
                                        <div className = 'row'>
                                            <div className = 'input-field col s12'>
                                                <textarea name = 'description' onChange = {this.handleChange}
                                                placeholder = 'Descripcion' className = 'materialize-textarea' value = {this.state.description}/>
                                            </div>
                                        </div>
                                        <div className = 'row'>
                                            <div className = 'input-field col s12'>
                                                <input name = 'subject' onChange = {this.handleChange}
                                                type = 'text' placeholder = 'Materia' value = {this.state.subject}/>
                                            </div>
                                        </div>
                                        <div className = 'row'>
                                            <div className = 'input-field col s12'>
                                                <a>Fecha limite</a>
                                                <input name = 'deadline' onChange = {this.handleChange}
                                                type = 'date' value = {this.state.deadline}/>
                                            </div>
                                        </div>
                                        <div className = 'row'>
                                            <div className = 'input-field col s12'>
                                                <input name = 'priority' onChange = {this.handleChange}
                                                type = 'number' placeholder = 'Prioridad' value = {this.state.priority}/>
                                            </div>
                                        </div>
                                        <button type = 'submit' className = 'btn light-blue darken-4'>Guardar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className = 'col s7'>
                            
                            <label>Ordenar por:</label>
                            <select className = 'browser-default'
                            name = 'sort1' defaultValue = '1' onChange = {this.handleChange}>
                                <option value = '1'>Fecha Limite</option>
                                <option value = '2'>Materia</option>
                            </select>

                            <p/>

                            <select className = 'browser-default'
                            name = 'sort2' defaultValue = '1' onChange = {this.handleChange}>
                                <option value = '1' >Ascendente</option>
                                <option value = '-1'>Descendente</option>
                            </select>

                            <table>
                                <thead>
                                    <tr>
                                        <th>Titulo</th>
                                        <th>Descripcion</th>
                                        <th>Materia</th>
                                        <th>Fecha Limite</th>
                                        <th>Prioridad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.sort((a, b) => {

                                            if(this.state.sort1 == '1'){
                                                if(a.deadline.toLowerCase() < b.deadline.toLowerCase())
                                                    return -1 * parseInt(this.state.sort2);
                                                if(a.deadline.toLowerCase() > b.deadline.toLowerCase())
                                                    return 1 * parseInt(this.state.sort2);
                                            }
                                            else{
                                                if(a.subject.toLowerCase() < b.subject.toLowerCase())
                                                    return -1 * parseInt(this.state.sort2);
                                                if(a.subject.toLowerCase() > b.subject.toLowerCase())
                                                    return 1 * parseInt(this.state.sort2);
                                            }
                                            return 0;
                                        })
                                        .map(task =>{
                                            return(
                                                <tr key = {task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>{task.subject}</td>
                                                    <td>{task.deadline}</td>
                                                    <td>{task.priority}</td>
                                                    <td>
                                                        <button className = 'btn light-blue darken-4'
                                                        onClick = {() => this.editTask(task._id)}>
                                                            <i className = 'material-icons'>edit</i>
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button className = 'btn light-blue darken-4'
                                                        onClick = {() => this.deleteTask(task._id)}>
                                                            <i className = 'material-icons'>delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;