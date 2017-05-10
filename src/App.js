import React from 'react';
import Header from './components/Header';
import {Home, Login, Register} from 'containers';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends React.Component {
    render(){
        let re = /(login|register)/;
        let isAuth = re.test(this.props.location.pathname);
        return (
            <div>
                {isAuth? undefined:<Header/>}
                <div>
                    <Route exact path="/" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                </div>
            </div>
        );
    }
}

export default App;
