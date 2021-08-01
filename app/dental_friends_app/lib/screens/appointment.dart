import 'package:dental_friends_app/constants/theme.dart';
import 'package:dental_friends_app/models/appointment.dart';
import 'package:dental_friends_app/widgets/bottom-navigation-bar.dart';
import 'package:dental_friends_app/widgets/drawer.dart';
import 'package:dental_friends_app/widgets/navbar.dart';
import 'package:flutter/material.dart';

class AppointmentScreen extends StatefulWidget {
  @override
  State createState() => new StateAppointment();

  Future<String> initClass() async {
    return "";
  }
}

class StateAppointment extends State<AppointmentScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: Navbar(title: "Citas"),
      backgroundColor: MaterialColors.bgColorScreen,
      drawer: MaterialDrawer(currentPage: "Citas"),
      body: Container(
        padding: EdgeInsets.only(left: 16.0, right: 16.0),
        child: contentScreen(context),
      ),
      bottomNavigationBar: BottonNavigationBar(option: 1),
    );
  }
}

updateLayoutByDay(BuildContext context, int day){
  switch(day){
    case 0:
      print("Lunes");
      break;
    case 1:
      print("Martes");
      break;
    case 2:
      print("Miercoles");
      break;
    case 3:
      print("Jueves");
      break;
    case 4:
      print("Viernes");
      break;
    default:
      print("Default");
  }
}

contentScreen(BuildContext context){
  Container citas = new Container(
    padding: EdgeInsets.all(10.0),
    child: new Column(
      children: <Widget>[
        Text(
          "CALENDARIO",
          style: TextStyle(
            fontSize: 20.0,
            fontWeight: FontWeight.bold,
          ),
        ),
        SizedBox(
          height: 50,
          child: ListView(
            scrollDirection: Axis.horizontal,
            children: <Widget>[
              ButtonBar(
                overflowDirection: VerticalDirection.down,
                alignment: MainAxisAlignment.start,
                children: <Widget>[
                  TextButton(
                    autofocus: true,
                    onPressed: ()=>updateLayoutByDay(context,0),
                    style: ButtonStyle(
                      backgroundColor: MaterialStateColor.resolveWith((states) => Colors.blue[100]),
                      shape: MaterialStateProperty.all(
                        RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(25.0),
                          side: BorderSide(color:Colors.blueAccent),
                        ),
                      ),
                    ),
                    child: Text("Lun"),
                  ),
                  TextButton(
                    onPressed: ()=>updateLayoutByDay(context,1),
                    style: ButtonStyle(
                      shape: MaterialStateProperty.all(
                        RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(25.0),
                          side: BorderSide(color:Colors.blueAccent),
                        ),
                      ),
                    ),
                    child: Text("Mar"),
                  ),
                  TextButton(
                    onPressed: ()=>updateLayoutByDay(context,2),
                    style: ButtonStyle(
                      shape: MaterialStateProperty.all(
                        RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(25.0),
                          side: BorderSide(color:Colors.blueAccent),
                        ),
                      ),
                    ),
                    child: Text("Mie"),
                  ),
                  TextButton(
                    onPressed: ()=>updateLayoutByDay(context,3),
                    style: ButtonStyle(
                      shape: MaterialStateProperty.all(
                        RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(25.0),
                          side: BorderSide(color:Colors.blueAccent),
                        ),
                      ),
                    ),
                    child: Text("Jue"),
                  ),
                  TextButton(
                    onPressed: ()=>updateLayoutByDay(context,4),
                    style: ButtonStyle(
                      shape: MaterialStateProperty.all(
                        RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(25.0),
                          side: BorderSide(color:Colors.blueAccent),
                        ),
                      ),
                    ),
                    child: Text("Vie"),
                  ),
                ],
              )
            ],
          )
        ),
        loadAppointmentByDayScreen(context),
      ],
    ),
  );
  return citas;
}


loadAppointmentByDayScreen(BuildContext context){
  return FutureBuilder<List<Appointment>>(
      future: Appointment.getByStare(),
      builder: (context, request){
        print("Request received: $request");
        if(request.data != null){
          return ListView.builder(
            itemCount: request.data.length,
            scrollDirection: Axis.vertical,
            shrinkWrap: true,
            itemBuilder: (context, index){
              Appointment item = request.data[index];
              return Card(
                color: Colors.blueAccent,
                child: ListTile(
                  tileColor: Colors.white30,
                  title: Text("${item.treatment}"),
                  subtitle: Text(
                      "${item.pacient.namePacient} ${item.pacient.lastnamePacient}"),
                  leading:
                  IconButton(icon: Icon(Icons.people), onPressed: null),
                  trailing: Wrap(
                    children: <Widget>[
                      IconButton(
                          icon: Icon(Icons.info),
                          onPressed: null
                      ), // icon-1// icon-2
                    ],
                  ),
                ),
              );
              /*return Padding(
                padding: const EdgeInsets.only(top: 4.0),
                child: ListTile(
                  tileColor: MaterialColors.defaultButton,
                  title: Text("${item.treatment}"),
                  subtitle: Text(
                      "${item.pacient.namePacient} ${item.pacient.lastnamePacient}"),
                  leading:
                  IconButton(icon: Icon(Icons.info), onPressed: null),
                  trailing: Wrap(
                    children: <Widget>[
                      IconButton(
                          icon: Icon(Icons.done), onPressed: null), // icon-1
                      IconButton(
                          icon: Icon(Icons.delete),
                          onPressed: null), // icon-2
                    ],
                  ),
                ),
              );*/
            },
          );
        }else if(request.data.length==0){
          return Card(
            color: Colors.blueAccent,
            child: ListTile(
              tileColor: Colors.white30,
              title: Text("Sin Tratamientos"),
              subtitle: Text(
                  ""),
              leading:
              IconButton(icon: Icon(Icons.people), onPressed: null),
              trailing: Wrap(
                children: <Widget>[
                  IconButton(
                      icon: Icon(Icons.info),
                      onPressed: null
                  ), // icon-1// icon-2
                ],
              ),
            ),
          );
        }else{
          return Container(
            child: Center(
              child: Text("Cargando..."),
            ),
          );
        }

      }
  );
}
