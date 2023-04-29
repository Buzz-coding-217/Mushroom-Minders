// Define the API endpoint
const apiEndpoint = 'http://localhost:4000/scd';

// Define the Highcharts options
const options = {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Sensor Data'
    },
    xAxis: {
        categories: []
    },
    yAxis: {
        title: {
            text: 'Value'
        }
    },
    series: []
};

// Fetch sensor data from the API
function fetchSensors() {
    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => displayChart(data))
        .catch(error => console.error(error));
}

function drawGraph(name) {
    $.get(`${API_URL}/devices`)
        .then(response => {
            response.forEach(device => {
                if (device.device === name) {
                    const sensorData = device.sensorData;
                    const intensities = sensorData.map(data => data.temp);

                    const chartOptions = {
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: 'SCD data'
                        },
                        series: [{
                            name: 'Intensity series',
                            data: intensities
                        }]
                    };
                    // Call the Highcharts function to render the chart using chartOptions
                    Highcharts.chart('chart-container', chartOptions);
                }
            });
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
}
$('#graph').on('click', function () {
    id = $('#id').val();
    drawGraph("SCD-30");
})

// Display the chart
function displayChart(data) {
    const temperature = [];
    const humidity = [];
    const co2 = [];

    // Parse the sensor data
    for (let i = 0; i < data.length; i++) {
        temperature.push(data[i].temperature);
        humidity.push(data[i].humidity);
        co2.push(data[i].co2);
        options.xAxis.categories.push(data[i].timestamp);
    }

    // Add the temperature series to the chart
    options.series.push({
        name: 'Temperature',
        data: temperature
    });

    // Add the humidity series to the chart
    options.series.push({
        name: 'Humidity',
        data: humidity
    });

    // Add the CO2 series to the chart
    options.series.push({
        name: 'CO2',
        data: co2
    });

    // Render the chart
    Highcharts.chart('chart-container', options);

    // Set up an interval to update the chart every 5 minutes
    setInterval(() => updateChart(), 300000);
}

// Update the chart with new data
function updateChart() {
    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
            const temperature = [];
            const humidity = [];
            const co2 = [];

            // Parse the new sensor data
            for (let i = 0; i < data.length; i++) {
                temperature.push(data[i].temperature);
                humidity.push(data[i].humidity);
                co2.push(data[i].co2);
                options.xAxis.categories.push(data[i].timestamp);
            }

            // Update the temperature series
            options.series[0].setData(temperature);

            // Update the humidity series
            options.series[1].setData(humidity);

            // Update the CO2 series
            options.series[2].setData(co2);
        })
        .catch(error => console.error(error));
}

// Call the fetchSensors function to start the program
fetchSensors();















// Define variables
const apiURL = 'https://example.com/api/sensors';
const chartOptions = {
    chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        events: {
            load: function () {
                // set up the updating of the chart every 5 seconds
                const series = this.series[0];
                setInterval(function () {
                    updateData(series);
                }, 5000);
            }
        }
    },
    title: {
        text: 'Sensor Data'
    },
    xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
    },
    yAxis: {
        title: {
            text: 'Value'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                Highcharts.numberFormat(this.y, 2);
        }
    },
    legend: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    series: [{
        name: 'Value',
        data: []
    }]
};

// Fetch sensors data from API
function fetchSensors() {
    $.ajax({
        url: apiURL,
        type: 'GET',
        success: function (sensors) {
            populateSelect(sensors);
            updateData(sensors[0].id);
        },
        error: function () {
            console.log('Failed to fetch sensor data.');
        }
    });
}

// Populate dropdown menu with sensor IDs
function populateSelect(sensors) {
    const select = document.getElementById('sensor-select');
    select.innerHTML = '';
    sensors.forEach(function (sensor) {
        const option = document.createElement('option');
        option.value = sensor.id;
        option.textContent = sensor.id;
        select.appendChild(option);
    });
}

// Display chart for first sensor
function displayChart(sensorId) {
    $.ajax({
        url: apiURL + '/' + sensorId + '/data',
        type: 'GET',
        success: function (sensorData) {
            const chart = Highcharts.chart('chart-container', chartOptions);
            const series = chart.series[0];
            sensorData.forEach(function (data) {
                const x = new Date(data.timestamp).getTime();
                const y = data.value;
                series.addPoint([x, y], true, series.data.length > 50);
            });
        },
        error: function () {
            console.log('Failed to fetch sensor data.');
        }
    });
}

// Update chart with sensor data
function updateData(sensorId) {
    $.ajax({
        url: apiURL + '/' + sensorId + '/data/latest',
        type: 'GET',
        success: function (data) {
            const chart = Highcharts.chart('chart-container');
            const series = chart.series[0];
            const x = new Date(data.timestamp).getTime();
            const y = data.value;
            series.addPoint([x, y], true, series.data.length > 50);
        },
        error: function () {
            console.log('Failed to fetch sensor data.');
        }
    });
}

// Call fetchSensors function on page load
$(document).ready(function () {
    fetchSensors();
});