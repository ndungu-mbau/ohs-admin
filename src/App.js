import React from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { ApolloProvider } from "@apollo/react-hooks"

import client from "./utils/client"
// import Toast from "./components/toast"

import dashboard from "./pages/dashboard"
import hazards from "./pages/hazards"
import jobs from "./pages/jobs"
import roles from "./pages/roles"
import users from "./pages/users"
import departments from "./pages/departments"
import divisions from "./pages/divisions"
import scopes from "./pages/scopes"
import closuretypes from "./pages/closure-types"
import documents from "./pages/documents"

import login from "./pages/login"
import reset from "./pages/reset"
import verify from "./pages/verify"

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    sessionStorage.getItem('authorization')
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

const ProtectedRoute = ({ component: Component, ...rest }) => (
  JSON.parse(sessionStorage.getItem('user')).type.permissions.includes("OHS") ? <PrivateRoute component={Component} {...rest} /> : <Redirect to="/" />
)

function App() {
  // navigator.serviceWorker.addEventListener("message", (message) => {
  //   const notification = {
  //     body: message.data["firebase-messaging-msg-data"].notification.body,
  //     title: message.data["firebase-messaging-msg-data"].notification.title,
  //     data: message.data["firebase-messaging-msg-data"].data
  //   }
  //   Toast.show(notification)
  // })
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/login" exact component={login} />
          <Route path="/forgot" exact component={reset} />
          <Route path="/verify" exact component={verify} />
          <PrivateRoute path="/" exact component={dashboard} />
          <PrivateRoute path="/jobs" component={jobs} />
          <ProtectedRoute path="/roles" component={roles} />
          <ProtectedRoute path="/users" component={users} />
          <ProtectedRoute path="/hazards" component={hazards} />
          <ProtectedRoute path="/incidences" component={closuretypes} />
          <ProtectedRoute path="/documents" component={documents} />
          <ProtectedRoute path="/departments" component={departments} />
          <ProtectedRoute path="/divisions" component={divisions} />
          <PrivateRoute path="/scopes" component={scopes} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
