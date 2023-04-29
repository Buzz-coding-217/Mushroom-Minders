// Define the API endpoint
var api = 'http://localhost:4000/scd';
var api_soil = 'http://localhost:4000/soil';

const complete = document.getElementById('complete');
complete.addEventListener('click', () => {
    drawGraph0_C("SCD-30");
    drawGraph1_C("SCD-30");
    drawGraph2_C("SCD-30");
    drawGraph3_C("mux-1");
});

const hour = document.getElementById('hour');
hour.addEventListener('click', () => {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - (60 * 60 * 1000));
    drawGraph0_H("SCD-30", oneHourAgo);
    drawGraph1_H("SCD-30", oneHourAgo);
    drawGraph2_H("SCD-30", oneHourAgo);
    drawGraph3_H("mux-1", oneHourAgo);
});
const sixhour = document.getElementById('six');
sixhour.addEventListener('click', () => {
    const now = new Date();
    const time = new Date(now.getTime() - (6* 60 * 60 * 1000));
    drawGraph0_H("SCD-30", time);
    drawGraph1_H("SCD-30", time);
    drawGraph2_H("SCD-30", time);
    drawGraph3_H("mux-1", time);
});

const day = document.getElementById('day');
day.addEventListener('click', () => {
    const now = new Date();
    const time = new Date(now.getTime() - (24 * 60 * 60 * 1000));
    drawGraph0_H("SCD-30", time);
    drawGraph1_H("SCD-30", time);
    drawGraph2_H("SCD-30", time);
    drawGraph3_H("mux-1", time);
});

const week = document.getElementById('week');
week.addEventListener('click', () => {
    const now = new Date();
    const time = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
    drawGraph0_H("SCD-30", time);
    drawGraph1_H("SCD-30", time);
    drawGraph2_H("SCD-30", time);
    drawGraph3_H("mux-1", time);
});

const month = document.getElementById('month');
month.addEventListener('click', () => {
    const now = new Date();
    const time = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
    drawGraph0_H("SCD-30", time);
    drawGraph1_H("SCD-30", time);
    drawGraph2_H("SCD-30", time);
    drawGraph3_H("mux-1", time);
});

function drawGraph0_C(name) {
    const now = new Date();
    $.get(`${api}/devices`)
        .then(response => {
            response.forEach(devices => {
                if (devices.device === name) {
                    const sensorData = devices.sensorData;
                    const intensities = sensorData.map(data => [new Date(data.time).getTime(), data.temp]);


                    const chartOptions = {
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: 'SCD data'
                        },
                        xAxis: {
                            type: 'datetime',
                            title: {
                                text: 'Time'
                            }
                        },
                        yAxis: {
                            title: {
                                text: 'Temperature'
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return `Time: ${Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x)}<br>Temperature: ${this.y}`;
                            }
                        },
                        series: [{
                            name: 'Intensity series',
                            data: intensities
                        }]
                    };
                    // Call the Highcharts function to render the chart using chartOptions
                    Highcharts.chart('container3', chartOptions);
                }
            });
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
}
function drawGraph1_C(name) {
    const now = new Date();
    $.get(`${api}/devices`)
        .then(response => {
            response.forEach(devices => {
                if (devices.device === name) {
                    const sensorData = devices.sensorData;
                    const intensities = sensorData.map(data => [new Date(data.time).getTime(), data.hum]);


                    const chartOptions = {
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: 'SCD data'
                        },
                        xAxis: {
                            type: 'datetime',
                            title: {
                                text: 'Time'
                            }
                        },
                        yAxis: {
                            title: {
                                text: 'Humidity'
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return `Time: ${Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x)}<br>Humidity: ${this.y}`;
                            }
                        },
                        series: [{
                            name: 'Intensity series',
                            data: intensities
                        }]
                    };
                    // Call the Highcharts function to render the chart using chartOptions
                    Highcharts.chart('container4', chartOptions);
                }
            });
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
}

function drawGraph2_C(name) {
    const now = new Date();
    $.get(`${api}/devices`)
        .then(response => {
            response.forEach(devices => {
                if (devices.device === name) {
                    const sensorData = devices.sensorData;
                    const intensities = sensorData.map(data => [new Date(data.time).getTime(), data.co2]);


                    const chartOptions = {
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: 'SCD data'
                        },
                        xAxis: {
                            type: 'datetime',
                            title: {
                                text: 'Time'
                            }
                        },
                        yAxis: {
                            title: {
                                text: 'Co2'
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return `Time: ${Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x)}<br>CO2: ${this.y}`;
                            }
                        },
                        series: [{
                            name: 'Intensity series',
                            data: intensities
                        }]
                    };
                    // Call the Highcharts function to render the chart using chartOptions
                    Highcharts.chart('container2', chartOptions);
                }
            });
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
}

function drawGraph3_C(name) {
    const now = new Date();
    $.get(`${api_soil}/devices`)
        .then(response => {
            response.forEach(devices => {
                if (devices.device === name) {
                    const sensorData = devices.sensorData;
                    const intensities = sensorData.map(data => [new Date(data.time).getTime(), data.soil]);


                    const chartOptions = {
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: 'Soil Moisture Data'
                        },
                        xAxis: {
                            type: 'datetime',
                            title: {
                                text: 'Time'
                            }
                        },
                        yAxis: {
                            title: {
                                text: 'Moisture Level (%)'
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return `Time: ${Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x)}<br>CO2: ${this.y}`;
                            }
                        },
                        series: [{
                            name: 'Intensity series',
                            data: intensities
                        }]
                    };
                    // Call************ the Highcharts function to render the chart using chartOptions
                    Highcharts.chart('container5', chartOptions);
                }
            });
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
}

function drawGraph0_H(name, time) {
    $.get(`${api}/devices`)
        .then(response => {
            response.forEach(devices => {
                if (devices.device === name) {
                    const sensorData = devices.sensorData;
                    // Filter the sensorData array to include only the data points from the previous hour
                    const intensities = sensorData.filter(data => new Date(data.time) > time)
                        .map(data => [new Date(data.time).getTime(), data.temp]);

                    const chartOptions = {
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: 'SCD data'
                        },
                        xAxis: {
                            type: 'datetime',
                            title: {
                                text: 'Time'
                            }
                        },
                        yAxis: {
                            title: {
                                text: 'Temperature'
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return `Time: ${Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x)}<br>Temperature: ${this.y}`;
                            }
                        },
                        series: [{
                            name: 'Intensity series',
                            data: intensities
                        }]
                    };
                    // Call the Highcharts function to render the chart using chartOptions
                    Highcharts.chart('container3', chartOptions);
                }
            });
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
}
function drawGraph1_H(name,time) {
    $.get(`${api}/devices`)
        .then(response => {
            response.forEach(devices => {
                if (devices.device === name) {
                    const sensorData = devices.sensorData;
                    // Filter the sensorData array to include only the data points from the previous hour
                    const intensities = sensorData.filter(data => new Date(data.time) > time)
                        .map(data => [new Date(data.time).getTime(), data.hum]);

                    const chartOptions = {
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: 'SCD data'
                        },
                        xAxis: {
                            type: 'datetime',
                            title: {
                                text: 'Time'
                            }
                        },
                        yAxis: {
                            title: {
                                text: 'Humidity'
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return `Time: ${Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x)}<br>Humidity: ${this.y}`;
                            }
                        },
                        series: [{
                            name: 'Intensity series',
                            data: intensities
                        }]
                    };
                    // Call the Highcharts function to render the chart using chartOptions
                    Highcharts.chart('container4', chartOptions);
                }
            });
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
}


function drawGraph2_H(name, time) {
    $.get(`${api}/devices`)
        .then(response => {
            response.forEach(devices => {
                if (devices.device === name) {
                    const sensorData = devices.sensorData;
                    // Filter the sensorData array to include only the data points from the previous hour
                    const intensities = sensorData.filter(data => new Date(data.time) > time)
                        .map(data => [new Date(data.time).getTime(), data.co2]);

                    const chartOptions = {
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: 'SCD data'
                        },
                        xAxis: {
                            type: 'datetime',
                            title: {
                                text: 'Time'
                            }
                        },
                        yAxis: {
                            title: {
                                text: 'CO2'
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return `Time: ${Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x)}<br>CO2: ${this.y}`;
                            }
                        },
                        series: [{
                            name: 'Intensity series',
                            data: intensities
                        }]
                    };
                    // Call the Highcharts function to render the chart using chartOptions
                    Highcharts.chart('container2', chartOptions);
                }
            });
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
}

function drawGraph3_H(name,time) {

    $.get(`${api_soil}/devices`)
        .then(response => {
            response.forEach(devices => {
                if (devices.device === name) {
                    const sensorData = devices.sensorData.filter(data => new Date(data.time) >= time); // Filter the data for the last hour
                    const intensities = sensorData.map(data => [new Date(data.time).getTime(), data.soil]);

                    const chartOptions = {
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: 'Soil Moisture Data'
                        },
                        xAxis: {
                            type: 'datetime',
                            title: {
                                text: 'Time'
                            }
                        },
                        yAxis: {
                            title: {
                                text: 'Moisture Level (%)'
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return `Time: ${Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x)}<br>CO2: ${this.y}`;
                            }
                        },
                        series: [{
                            name: 'Intensity series',
                            data: intensities
                        }]
                    };
                    // Call************ the Highcharts function to render the chart using chartOptions
                    Highcharts.chart('container5', chartOptions);
                }
            });
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
}

drawGraph0_C("SCD-30");
drawGraph1_C("SCD-30");
drawGraph2_C("SCD-30");
drawGraph3_C("mux-1");