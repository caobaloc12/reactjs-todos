var TodoListItem = React.createClass({

	render: function () {
		return (
			<li>{this.props.children}</li>
		);
	}
});