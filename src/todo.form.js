var TodoForm = React.createClass({

	getInitialState: function () {
		return { item: '' };
	},

	submitHandle: function (e) {
		e.preventDefault();
		this.props.onFormSubmit(this.state.item);
		this.setState({item: ''});
		React.findDOMNode(this.refs.item).focus();
		return;
	},

	onChange: function (e) {
		this.setState({ item: e.target.value });
	},

	render: function () {
		return (
			<form onSubmit={this.submitHandle}>
				<input type='text' placeholder='What needs to be done?' ref='item' onChange={this.onChange} value={this.state.item} />
				<input type='submit' value='Add' />
			</form>
		);
	}
});