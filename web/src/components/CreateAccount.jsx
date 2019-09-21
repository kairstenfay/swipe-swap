import React from 'react';
import '../App.css';

class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {first_name: '', last_name: '', username: '', details: {}}; // TODO: email

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const state = {};
        state[event.target.name] = event.target.value;

        this.setState({ ...this.state, ...state });
    }

    handleSubmit(event) {
        console.log(JSON.stringify(this.state));

        fetch('http://localhost:5000/api/v1/individual', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa("test:123"),
            },
            body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
        })
        .catch(error => {
            console.log(error);
        });
        alert('An account was created: ' + this.state.username);
        event.preventDefault();
    }

    render () {
        return (
            <div className="container">
                <form action="/success" onSubmit={this.handleSubmit}>
                    <label>
                        First name:
                        <input type="text" name="first_name" value={this.state.firstname}
                            onChange={this.handleChange} />
                    </label>
                    <label>
                        Last name:
                        <input type="text" name="last_name" value={this.state.lastname}
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
