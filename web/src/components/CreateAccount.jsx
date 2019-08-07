import React from 'react';
import '../App.css';

function CreateAccount() {
  return (
    <div className="container">
        <form action="/success" target="_blank" method="post">
            <label>
                First name:
                <input type="text" name="firstname" />
            </label>
            <label>
                Last name:
                <input type="text" name="lastname" />
            </label>
            <label>
                Username:
                <input type="text" name="username" />
            </label>
            <input type="submit" class="btn btn-primary" value="Join" />
        </form>
    </div>
  );
}

export default CreateAccount;
