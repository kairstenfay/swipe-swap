import React from 'react';
import '../App.css';

class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        fetch('https://localhost:5000/v1/create/individual', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstParam: 'yourValue',
                secondParam: 'yourOtherValue',
            })
        })
        alert('An account was created: ' + this.state.value);
        event.preventDefault();
    }

    render () {
        return (
            <div className="container">
                <form action="/success" onSubmit={this.handleSubmit}>
                    <label>
                        First name:
                        <input type="text" name="firstname" value={this.state.value} onChange={this.handleChange}/>
                    </label>
                    <label>
                        Last name:
                        <input type="text" name="lastname" />
                    </label>
                    <label>
                        Username:
                        <input type="text" name="username" />
                    </label>
                    <br />
                    <input type="submit" className="btn btn-primary" value="Join" />
                </form>
            </div>
        );
    }
}

export default CreateAccount;
