const axios = require('axios');
API_URL="http://localhost:4000"

test('test SCD Device', async () => {
    const response = await axios.get(`${API_URL}/scd/devices`);
    const data = response.data;
    expect(data[0].device).toEqual('SCD-30');
  });

test('test post request', async () => {
    const data = {
      device: 'test'
    };
    const response = await axios.post(`${API_URL}/scd/devices`, data);
    expect(response.status).toEqual(201);
  });
  
test('test put request', async () => {
    const data = {
      device: 'changed',
    };
    const olddevice = 'test';
    const response = await axios.put(`${API_URL}/scd/devices/${olddevice}`, data);
    expect(response.status).toEqual(200);
  });
  
  
test('test delete request', async () => {
    const devicename = 'changed';
    const response = await axios.delete(`${API_URL}/scd/devices/${devicename}`);
    expect(response.status).toEqual(200);
  });