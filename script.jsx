{/*
*/}
var TodoInput = React.createClass({
    onSubmit: function(e){
        e.preventDefault();
        this.props.addItem(this.refs.name.value, this.refs.score.value);
        this.refs.name.value = '';
        this.refs.score.value = '';
    },
    render: function () {
        return (
            <form className='todo-add' onSubmit={this.onSubmit}>
                <input type='text' placeholder='name' ref='name'/>
                <input type='text' placeholder='score' ref='score'/>
                <button type='submit'>Add</button>
            </form>
        );
    }
});

var TodoFeature = React.createClass({
    getDefaultProps: function(){
        return {
            initialSortAsc: false,
        };
    },
    getInitialState: function(){
        return {
            sortAsc: this.props.initialSortAsc,
        };
    },
    onClick: function(){
        this.props.toggleSort();
        this.setState({sortAsc: !this.state.sortAsc});
    },
    render: function () {
        return (
            <div className='todo-feature todo-table'>
                <div className='todo-tr'>
                    <div className='todo-td'>Now sort: {this.state.sortAsc === true ? '🔼' : '🔽'}</div>
                    <div className='todo-td'><button type='button' onClick={this.onClick}>ReSort {this.state.sortAsc === true ? '🔽' : '🔼'}</button></div>
                </div>
            </div>
        )
    }
});

var TodoItem = React.createClass({
    getDefaultProps: function(){
        return {
            stuName: 'default',
            score: 0,
        };
    },
    render: function(){
        return (
            <div className='todo-tr'>
                <div className='todo-td'>{this.props.stuName}</div>
                <div className='todo-td'>{this.props.score}</div>
            </div>
        );
    }
});

var TodoList = React.createClass({
    render: function(){
        return (
            <div className='todo-table'>
                <div className='todo-td'>Name</div>
                <div className='todo-td'>Score</div>
                {
                    this.props.data.map(function(item){
                       return <TodoItem key={item.id} id={item.id} stuName={item.name} score={item.score}/>
                    })
                }
            </div>
        );
    }
});

var Todo = React.createClass({
    getDefaultProps: function(){
        return {
            dataList: [],
        }
    },
    getInitialState: function(){
        return {
            data: dataList,
            asc: false,
        }
    },
    addItem: function(name, score){
        var id = this.state.data.length + 1;
        var newData = this.state.data.concat({
            id: id,
            name: name,
            score: score
        });
        // newData.sort(function(a, b){
        //     return a.score - b.score;
        // })
        this.sortItem(newData);
        this.setState({ data: newData });
    },
    sortItem: function (dataSrc){
        if (this.state.asc === true) {
            dataSrc.sort(function (a, b) {
                return a.score - b.score;
            });
        }
        else if(this.state.asc === false) {
            dataSrc.sort(function (a, b) {
                return b.score - a.score;
            });
        }
    },
    toggleSort: function () {
        this.state.asc = !this.state.asc;
        this.sortItem(this.state.data);
        this.setState({
            data: this.state.data,
        })

    },
    render: function(){
        return (
            <div>
                <h2>Score list</h2>
                <TodoInput addItem={this.addItem}/>
                <TodoFeature toggleSort={this.toggleSort} initialSortAsc={this.state.asc}/>
                <TodoList data={this.state.data}/>
            </div>
        );
    }
});

var dataList = [
    { id: 1, name: 'AA', score: 88 }, 
    { id: 2, name: 'BB', score: 66 },
];

ReactDOM.render(
    <Todo dataList={dataList}/>, 
    document.getElementById('content')
);