import React from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper blue darken-1">
                    <Link to="/" className="brand-logo center">MEMOPAD</Link>

                    <ul>
                        <li><a><i className="material-icons">search</i></a></li>
                    </ul>

                    <div className="right">
                        <ul>
                            {
                                this.props.isLoggedIn ?
                                    <li>
                                        <a><i className="material-icons">lock_open</i></a>
                                    </li>
                                    :
                                    <li>
                                    <Link to="/login"><i className="material-icons">vpn_key</i></Link>
                                    </li>

                            }
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

Header.propTypes = {
    isLoggedIn: React.PropTypes.bool,
    onLogout: React.PropTypes.func
};

Header.defaultProps = {
    isLoggedIn: false,
    onLogout: () => {
        console.error('logout function is not defined');
    }
}
export default Header;