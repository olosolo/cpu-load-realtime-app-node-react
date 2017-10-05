import React from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';

export default class CpuLoadChart extends React.Component {
    render() {

        const {
            data = []
        } = this.props

        return (
           <LineChart width={730} height={250} data={ [...data] }
             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
             <XAxis dataKey="name" />
             <YAxis />
             <Tooltip />
             <Line type="monotone" dataKey="value" stroke="#8884d8" isAnimationActive={ false } />
           </LineChart>
        )
    }
}