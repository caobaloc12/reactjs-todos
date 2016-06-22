var TodoApp = React.createClass({

	getInitialState: function () {
		return {items: []};
	},

	updateItems: function (newItem) {
		var allItems = this.state.items.concat([newItem]);
		this.setState({items: allItems});
	},

	updateCompletedItem: function (completedItem) {
		
		this.state.items.map(function (item, index) {
			if (item.title === completedItem.title) {				
				item.completed = completedItem.completed;
			}
		});
		var sortByCompleted = _.sortBy(this.state.items, function (o) {
			return o.completed;
		});		
		this.setState({items: sortByCompleted});
	},

	render: function () {
		return (
			<div class='todo-app'>
				<TodoHeader />
				<TodoForm onFormSubmit={this.updateItems} items={this.state.items}/>
				<TodoList items={this.state.items} onItemChange={this.updateCompletedItem}/>
				<TodoRemaining items={this.state.items}/>
			</div>
		)
	}
});

var TodoHeader = React.createClass({

	render: function () {
		return (
			<h3>todos</h3>		
		);
	}
});


var TodoForm = React.createClass({

	getInitialState: function () {
		return {id: 0, title: '', completed: false };
	},

	submitHandle: function (e) {
		e.preventDefault();
		this.state.id = this.props.items.length;
		this.props.onFormSubmit(this.state);
		this.setState({ title: '', completed: false });
		return;
	},

	onChange: function (e) {
		this.setState({ title: e.target.value });
	},

	render: function () {
		return (
			<form onSubmit={this.submitHandle}>
				<input type='text' placeholder='add new todo here' ref='item' onChange={this.onChange} value={this.state.title} />
				<input type='submit' value='Add' class='btn'/>
			</form>
		);
	}
});

var TodoList= React.createClass({
	
	changeCompleted: function (item) {
		this.props.onItemChange(item);
	},

	render: function () {
		var self = this;
		return (
	        <ul>
	          {
	          	self.props.items.map(function(listValue) {
	            	return ( <TodoListItem key={listValue.id} item={listValue} onUpdateCompleted={self.changeCompleted}/> )
	          	})
	          }	          
	        </ul>
	        
	    )
	}
});

var TodoListItem = React.createClass({

	getInitialState: function () {
		return {id: this.props.item.id,title: this.props.item.title, completed: this.props.item.completed}
	},
	
	onUpdateCompleted: function () {
		this.props.onUpdateItem(this.state);
	},

	onChange: function (e) {
		this.setState({completed: e.target.checked});
		this.props.onUpdateCompleted({title: this.state.title, completed: e.target.checked});
	},

	render: function () {
		var titleStyle={
		      textDecoration: this.state.completed?'line-through':'',
		      color: this.state.completed?'#aaa': '#333'
		    };
		return (<li>
					<input type='checkbox' onChange={this.onChange} defaultChecked={this.state.completed} ref='completed'/>
        			<input type="text" value={this.state.title} style={titleStyle} disabled/>
        	   </li>)
	}

});

var TodoRemaining = React.createClass({

	render: function () {	
		var remaining = [];
		this.props.items.map(function (item) {
			if (!item.completed ) {
				remaining.push(item);
			}
		})

		return	<p>{ remaining.length } of {this.props.items.length} remaining</p>
	}

});

ReactDOM.render(<TodoApp />, document.getElementById('todo-app'));