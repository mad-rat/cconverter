import React from 'react'
import './App.scss'
import { Dashboard } from './components/Dashboard'
import MainHeader from './components/MainHeaderComponent/MainHeaderComponent'
import { Layout } from 'antd'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import About from './components/AboutComponent/AboutComponent'
import Contact from './components/ContactComponent/ContactComponent'

const { Header, Content } = Layout

const App = () => {
  return (
    <div className="cc-theme-purple">
      <Router>
        <Layout className="main-layout ">
          <Header className="main-layout__header">
            <MainHeader/>
          </Header>
          
          <Switch>
            <Route exact path="/">
              <Content className="main-layout__content">
                <Dashboard/>
              </Content>
            </Route>
            
            <Route path="/about">
              <About/>
            </Route>
            
            <Route path="/contact">
              <Contact/>
            </Route>
          </Switch>
          
        </Layout>
      </Router>
    </div>
  )
}

export default App
