

var TodoItem = React.createClass({
    render(){
        return (
            <tr>
                <td></td>>
                <td></td>>
            </tr>
        );
    }
})

var TodoList = React.createClass({
    render(){
        return (
            <table>
                <TodoItem/>
            </table>
        );
    }
});

var Todo = React.createClass({
    render(){
        return (
            <div>
                <TodoList/>
            </div>
        );
    }
});

var dataList = [
    { name: 'AA', score: 88 }, 
    { name: 'BB', score: 66},
]

ReactDom.render(<Todo/>, document.getElementById('content'));