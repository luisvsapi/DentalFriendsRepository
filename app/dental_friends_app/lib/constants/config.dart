//PRODUCCION
// String apiUrl = 'http://dentalfriends.ec:80';
String apiUrl = 'http://67.205.165.126';
//DESARROLLO
// String apiUrl = 'http://192.168.100.61:3000';
var dateActual = DateTime.now();
var startDate = DateTime.utc(dateActual.year, dateActual.month, dateActual.day, 6, 0, 0);
var endDate = DateTime.utc(dateActual.year, dateActual.month, dateActual.day, 20, 0, 0);
const slotCalendarTime = Duration(minutes: 10);


