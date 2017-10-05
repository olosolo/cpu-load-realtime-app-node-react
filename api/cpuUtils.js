const os = require('os');

const updateTimeout = 1000;
const droppingTimer = 5;

let current = { cpuUsage: 0 }

//Getting CPU times from OS
const getCpuTimes = () => {
    const cpus = os.cpus();
    let time = 0;
    let idle = 0;

    cpus.forEach(cpu => {
        Object.keys(cpu.times).forEach(key => {
            key === "idle" ? idle += cpu.times[key] : time += cpu.times[key];
        })
    })

    const total = idle + time;

    return { idle, total}
}

//Calculating actual percentage of system load
const getCpuPercentage = () => {
    let initialTime = getCpuTimes();
    let counter = 0;

    const interval = setInterval(() => {
        const { idle, total } = getCpuTimes()
        let actualPercentage = (1 - ((idle - initialTime.idle) / (total - initialTime.total))) * 100;

        actualPercentage = actualPercentage.toFixed();
        current.cpuUsage = actualPercentage;

        if(counter == droppingTimer){
            initialTime = getCpuTimes();
            counter = 0;
        }
        counter++;

    }, updateTimeout)

    return interval;
}

export {
    getCpuPercentage,
    current
}