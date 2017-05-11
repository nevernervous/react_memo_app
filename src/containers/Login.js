import React from 'react';
import {Authentication} from 'components';
import {connect} from 'react-redux';
import {loginRequest} from 'actions/authentication';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(id, pwd) {
        return this.props.loginRequest(id, pwd)
            .then(() => {
                if(this.props.status === "SUCCESS") {
                    // create session data
                    let loginData = {
                        isLoggedIn: true,
                        username: id
                    };

                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));
                    Materialize.toast('Welcome,' + id + '!', 2000);
                    this.props.history.push('/');
                    return true;
                }else {
                    let toastContent = '<span style="color: #FFB$BA">Incorrect username or password </span>';
                    Materialize.toast(toastContent, 2000);
                    return false;
                }
            })
    }

    render() {
        return (
            <div>
                <Authentication mode={true}
                                onLogin={this.handleLogin}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status
    };
};

const mapDispathToProps = (dispatch) => {
    return {
        loginRequest: (id, pwd) => {
            return dispatch(loginRequest(id, pwd));
        }
    };
}

export default connect(mapStateToProps, mapDispathToProps)(Login);