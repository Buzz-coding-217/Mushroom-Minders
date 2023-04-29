const API_URL = 'http://localhost:4000/soil/devices';

$('#add-mux').on('submit', () => {
  const device = $('#device').val();

  const body = {
    device
  };

  $.post(`${API_URL}`, body)
    .then(response => {
        console.log("New device added");
    })
    .catch(error => {
      console.error(`Error: ${error}`);
    });
});

