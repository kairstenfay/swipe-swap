import React from 'react';
import '../App.css';

class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {firstname: '', lastname: '', username: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log(event.target.name);
        const state = {};
        state[event.target.name] = event.target.value;

        this.setState({ ...this.state, ...state });
    }

    handleSubmit(event) {
        console.log(this.state);

        fetch('https://localhost:5000/api/v1/individual', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "firstname": "Jane",
            })
        })
        alert('An account was created: ' + this.state.username);
        event.preventDefault();
    }

    render () {
        return (
            <div className="container">
                <form action="/success" onSubmit={this.handleSubmit}>
                    <label>
                        First name:
                        <input type="text" name="firstname" value={this.state.firstname}
                            onChange={this.handleChange} />
                    </label>
                    <label>
                        Last name:
                        <input type="text" name="lastname" value={this.state.lastname}
                            onChange={this.handleChange} />
                    </label>
                    <label>
                        Username:
                        <input type="text" name="username" value={this.state.username}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <input type="submit" className="btn btn-primary" value="Join" />
                </form>
            </div>
        );
    }
}

export default CreateAccount;
