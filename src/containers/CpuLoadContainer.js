import React from 'react';
import axios from 'axios';

import CpuLoadGauge from '../components/CpuLoadGauge';
import CpuLoadChart from '../components/CpuLoadChart';

export default class CpuLoadContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            interval: 0,
            updateTimeout: 1000,
            cpu: {
                percentage: 0,
                data: []
            }
        }
    }

    changeTimeout(e) {
        const updateTimeout = e.target.value;

        clearInterval(this.state.interval);

        const interval = setInterval(() => {
            this.getDataFromServer();
        }, updateTimeout)

        this.setState({ updateTimeout, interval });
    }

    getDataFromServer() {
        const self = this;
        const { cpu } = this.state;

        axios.get('/api/getCpuUsage')
        .then(function (response) {
            const percentage = parseInt(response.data.cpuUsage);

            cpu.percentage = percentage;
            cpu.data.push({
                value: cpu.percentage
            });

            self.setState({ cpu })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    componentWillMount() {
        let { updateTimeout } = this.state;

        const interval = setInterval(() => {
            this.getDataFromServer();
        }, updateTimeout)

        this.setState({ interval });
    }

    render() {
        const { percentage, history, ticks, data } = this.state.cpu;
        const { updateTimeout } = this.state;
        const { changeTimeout } = this;

        const cpuProps = { percentage }
        const chartProps = { history, ticks, data }

        const inputStyle = {
            right: '0',
            position: 'absolute',
            top: '0',
            margin:'10px',
        }

        return (
            <div>
                <h2>Realtime System Load</h2>
                <CpuLoadGauge {...cpuProps} />
                <h2>System Load since page open</h2>
                <CpuLoadChart {...chartProps} />
                <div style={ inputStyle }>
                    <span>Timeout update: </span>
                    <input onChange={ changeTimeout.bind(this) } value={ updateTimeout } />
                </div>
            </div>
        )
    }
}