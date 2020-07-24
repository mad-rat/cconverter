import React, { useEffect, useState } from 'react'
import './App.scss'
import { ApiRate, Dashboard } from './components/Dashboard'
import MainHeader from './components/MainHeaderComponent/MainHeaderComponent'
import { Layout, Spin } from 'antd'

import About from './components/AboutComponent/AboutComponent'
import Contact from './components/ContactComponent/ContactComponent'
import UndefinedRoute from './components/UndefinedRouteComponent/UndefinedRouteComponent'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useCurrenciesFetch } from './services/CurrencyService'
import { History } from "./components/ExchangeRateHistoryComponent/ExchangeRateHistoryComponent";
import { RouterProps } from "react-router";
import { first } from "rxjs/operators";

const {Header, Content} = Layout

const resource = useCurrenciesFetch()

export interface CurrencyHistoryData {
    code: string,
    table: string
}

const App: React.FC = () => {

    const [apiRates, setApiRates] = useState<ApiRate[]>([])
    const [date, setCurrentDate] = useState('')
    const [dataReady, setDataReady] = useState(false)
    const [selectedCurrencies, setSelectedCurrencies] = useState<CurrencyHistoryData[]>([])

    const passSelectedCurrencies = (firstCurrency: CurrencyHistoryData, secondCurrency: CurrencyHistoryData) => {
        console.log('first Currency', firstCurrency)
        console.log('second Currency', secondCurrency)
        setSelectedCurrencies([firstCurrency, secondCurrency])
    }

    useEffect(() => {
        resource.subscribe((response: any) => {
            setApiRates(response.rates)
            setCurrentDate(response.date)
            setDataReady(true)
        })
    }, [])

    return (
        <div className="cc-theme-purple">
            <Router basename={process.env.PUBLIC_URL}>
                <Layout className="main-layout">
                    <Header className="main-layout__header">
                        <MainHeader/>
                    </Header>

                    <Switch>
                        <Route
                            exact
                            path="/"
                        >
                            <Content className="main-layout__content">
                                {!dataReady
                                    ? <Spin/>
                                    : <Dashboard
                                        rates={apiRates}
                                        date={date}
                                        selectedCurrencies={passSelectedCurrencies}
                                    />
                                }
                            </Content>
                        </Route>

                        <Route path="/about">
                            <Content className="main-layout__content">
                                {!dataReady
                                    ? <Spin/>
                                    :
                                    <About/>
                                }
                            </Content>
                        </Route>

                        <Route path="/contact">
                            <Contact/>
                        </Route>

                        <Route render={(props: RouterProps) => (
                            <Content className="main-layout__content">
                                <History {...props} selectedCurrencies={selectedCurrencies}/>
                            </Content>
                        )}>
                        </Route>

                        <Route path="*">
                            <UndefinedRoute/>
                        </Route>
                    </Switch>

                </Layout>
            </Router>
        </div>
    )
}

export default App
