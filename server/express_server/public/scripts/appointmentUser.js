function momentoCargarxD(){
    let data = [
        {
          title: 'All Day Event',
          start: '2021-06-01'
        },
        {
          title: 'Long Event',
          start: '2021-06-07',
          end: '2021-06-10'
        },
        {
          groupId: '999',
          title: 'Repeating Event',
          start: '2021-06-09T16:00:00'
        },
        {
          groupId: '999',
          title: 'Repeating Event',
          start: '2021-06-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2021-06-11',
          end: '2021-06-13'
        },
        {
          title: 'Meeting',
          start: '2021-06-12T10:30:00',
          end: '2021-06-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2021-06-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2021-06-12T14:30:00'
        },
        {
          title: 'Birthday Party',
          start: '2021-06-13T07:00:00'
        },
        {
          title: 'Click for Google',
          start: '2021-06-28'
        }
      ];
      return data;
}


document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendarElement');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'timeGridDay',
      initialDate: '2021-06-01',
      selectable: true,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: momentoCargarxD(),
      /* dateClick: function(info){
        alert("Momento")
        console.log("Recuperado:",info)
      }, */
      select: function(info){
        alert("Momento insertar rango")
        console.log("Recuperado:",info)
        //Agregar a la Base De Datos nueva cita con estado ACEPTADO
        //reenderizar el /user/home
      },
      editable: true,
    });
  
    calendar.render();
  });