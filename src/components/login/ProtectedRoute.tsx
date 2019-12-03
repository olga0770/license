import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {useAuth} from "../../context/auth";


// const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
//     <Route {...rest} render={props => (
//         isAuthenticated === true ? (<Component {...props}/>) :
//             (<Redirect to={{
//                     pathname: '/login',
//                     state: { from: props.location }
//                 }}/>
//             )
//     )}/>
// );


function ProtectedRoute({ component: Component, ...rest }) {
    const isAuthenticated = useAuth();

    return(
        <Route {...rest} render={(props) =>
            isAuthenticated ?
            (
            <Component {...props} />
            ) : (
                <Redirect to="/login"/>
                )
        }
        />
    );
}

export default ProtectedRoute;
