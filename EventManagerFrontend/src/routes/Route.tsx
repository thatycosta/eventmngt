import React from 'react';
import {  Route as ReactDomRoute, Redirect, RouteProps as ReactDOMRouteProps } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
    isPrivate?: boolean;
    component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
    const { userid } = useAuth();

    return (
        <ReactDomRoute {...rest} 
        render={
            ( { location } )  =>{
               return isPrivate === !!userid ? (
                    <Component />
               ) : (
                   <Redirect to={{ pathname: isPrivate ? '/' : '/dashboard',
                    state: { from: location },
                }}/>
               );
            }
        } />
    );

};

export default Route;