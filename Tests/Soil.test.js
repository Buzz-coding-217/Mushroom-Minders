const axios = require('axios');
API_URL="http://localhost:4000"

test('test SCD Device', async () => {
    const response = await axios.get(`${API_URL}/soil/devices`);
    const data = response.data;
    expect(data[0].device).toEqual('mux-1');
  });

test('test post request', async () => {
    const data = {
      device: 'test'
    };
    const response = await axios.post(`${API_URL}/soil/devices`, data);
    expect(response.status).toEqual(201);
  });
  
test('test put request', async () => {
    const data = {
      device: 'changed',
    };
    const olddevice = 'test';
    const response = await axios.put(`${API_URL}/soil/devices/${olddevice}`, data);
    expect(response.status).toEqual(200);
  });
  
  
test('test delete request', async () => {
    const devicename = 'changed';
    const response = await axios.delete(`${API_URL}/soil/devices/${devicename}`);
    expect(response.status).toEqual(200);
  });