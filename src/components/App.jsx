import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addReminder, deleteReminder, clearReminders } from '../actions'
import moment from 'moment'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			text: '',
			dueDate: '',
		}
	}

	addReminder = e => {
		e.preventDefault()
		this.props.addReminder(this.state.text, this.state.dueDate)
		this.setState({ text: '' })
	}

	deleteReminder = id => {
		this.props.deleteReminder(id)
	}

	renderReminders = () => {
		const { reminders } = this.props
		return (
			<ul className='list-group col-sm-4'>
				{reminders.map(reminder => (
					<li className='list-group-item' key={reminder.id}>
						<div className='list-item'>
							<div>{reminder.text}</div>
							<div>
								<em>
									{moment(
										new Date(reminder.dueDate)
									).fromNow()}
								</em>
							</div>
						</div>
						<div
							className='list-item delete-button'
							onClick={() => this.deleteReminder(reminder.id)}
						>
							&#x2715;
						</div>
					</li>
				))}
			</ul>
		)
	}

	clearReminders = () => {
		console.log('Clear reminders')
		this.props.clearReminders()
	}

	render() {
		return (
			<div className='App'>
				<div className='title'>Reminder Pro</div>
				<form className='form' onSubmit={this.addReminder}>
					<input
						type='text'
						className='form-control'
						placeholder='What you do...'
						value={this.state.text}
						onChange={e => this.setState({ text: e.target.value })}
						required
					/>
					<input
						type='datetime-local'
						className='form-control'
						onChange={e =>
							this.setState({ dueDate: e.target.value })
						}
					/>
					<button className='btn btn-success'>Add Reminder</button>
				</form>
				{this.renderReminders()}
				<button
					className='btn btn-danger'
					onClick={this.clearReminders}
				>
					Clear All Reminders
				</button>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		reminders: state,
	}
}

export default connect(mapStateToProps, {
	addReminder,
	deleteReminder,
	clearReminders,
})(App)
