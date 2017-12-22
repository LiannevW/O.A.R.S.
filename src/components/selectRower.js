import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const rowers = require('./rowersData');

const MAX_CONTRIBUTORS = 4;
const ASYNC_DELAY = 500;

const SelectRowers = createClass({
	displayName: 'rowers',
	propTypes: {
		label: PropTypes.string,
	},
	getInitialState () {
		return {
			multi: true,
			value: [rowers[0]],
		};
	},
	onChange (value) {
		this.setState({
			value: value,
		});
	},
	switchToMulti () {
		this.setState({
			multi: true,
			value: [this.state.value],
		});
	},
	switchToSingle () {
		this.setState({
			multi: false,
			value: this.state.value[0],
		});
	},
	getRowers (input, callback) {
		input = input.toLowerCase();
		var options = rowers.filter(i => {
			return i.lastname.substr(0, input.length) === input;
		});
		var data = {
			options: options.slice(0, MAX_CONTRIBUTORS),
			complete: options.length <= MAX_CONTRIBUTORS,
		};
		setTimeout(function() {
			callback(null, data);
		}, ASYNC_DELAY);
	},

	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}  </h3>
				<Select.Async multi={this.state.multi} value={this.state.value} onChange={this.onChange}  valueKey="last name" labelKey="first name" loadOptions={this.getRowers} />

			</div>
		);
	}
});

export default SelectRowers
