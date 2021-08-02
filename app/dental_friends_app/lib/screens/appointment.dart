import 'package:dental_friends_app/constants/strings.dart';
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

enum popupButtonDecisition { accept, reject }

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

  /**
   * Este metodo podria ser mas eficiente si deseas actualizar el listado
   * Porque no mejor se coloca un select en donde los valores son las fechas???
   */
  @deprecated
  updateLayoutByDay(BuildContext context, int day) {
    switch (day) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      default:
        break;
    }
  }

  contentScreen(BuildContext context) {
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
                    children: buttonByDay(context),
                  )
                ],
              )),
          loadAppointmentByDayScreen(context),
        ],
      ),
    );
    return citas;
  }

  List<Widget> buttonByDay(BuildContext context) {
    List<Widget> buttons = [];
    daysOperation.forEach((element) {
      buttons.add(TextButton(
        autofocus: true,
        onPressed: () => updateLayoutByDay(context, element['value']),
        style: ButtonStyle(
          //backgroundColor: MaterialStateColor.resolveWith((states) => Colors.blue[100]),
          shape: MaterialStateProperty.all(
            RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(25.0),
              side: BorderSide(color: Colors.blueAccent),
            ),
          ),
        ),
        child: Text(element['label'], style: boldStyle),
      ));
    });
    return buttons;
  }

  FutureBuilder<List<Appointment>> loadAppointmentByDayScreen(
      BuildContext context) {
    return FutureBuilder<List<Appointment>>(
        future: Appointment.getByState(),
        builder: (context, request) {
          if (request.hasData) {
            List<Appointment> result = request.data;
            int dataLen = result?.length ?? 0;
            if (dataLen > 0) {
              return ListView.builder(
                itemCount: dataLen,
                scrollDirection: Axis.vertical,
                shrinkWrap: true,
                itemBuilder: (context, index) {
                  Appointment item = result[index];
                  return Card(
                    //color: Colors.blueAccent,
                    child: ListTile(
                      tileColor: Colors.white30,
                      title: Text("${item.treatment}", style: boldStyle),
                      subtitle: Text(
                          "${item.pacient.namePacient} ${item.pacient.lastnamePacient}",
                          style: boldStyle),
                      leading:
                          IconButton(icon: Icon(Icons.info),
                              onPressed: () => printInfo(context, item)
                          ),
                      trailing: PopupMenuButton<popupButtonDecisition>(
                        onSelected: (popupButtonDecisition result) {
                          executeDecisiton(result, item.id);
                        },
                        itemBuilder: (BuildContext context) =>
                            <PopupMenuEntry<popupButtonDecisition>>[
                          const PopupMenuItem<popupButtonDecisition>(
                            value: popupButtonDecisition.accept,
                            child: Text('Aceptar'),
                          ),
                          const PopupMenuItem<popupButtonDecisition>(
                            value: popupButtonDecisition.reject,
                            child: Text('Rechazar'),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              );
            } else {
              return Card(
                color: Colors.blueAccent,
                child: ListTile(
                  tileColor: Colors.white30,
                  title: Text("Sin Tratamientos"),
                  subtitle: Text(""),
                  leading:
                      IconButton(icon: Icon(Icons.people), onPressed: null),
                  trailing: Wrap(
                    children: <Widget>[
                      IconButton(
                          icon: Icon(Icons.info),
                          onPressed: null), // icon-1// icon-2
                    ],
                  ),
                ),
              );
            }
          } else {
            return Container(
              child: Center(
                child: Text("Cargando..."),
              ),
            );
          }
        });
  }

  /**
   * En caso de presionar los 3 puntos muestra distintas opciones
   */
  void executeDecisiton(popupButtonDecisition result, int id) {
    switch (result) {
      case popupButtonDecisition.accept:
        Appointment.acceptAppointment(id);
        break;
      case popupButtonDecisition.reject:
        Appointment.deleteAppointment(id);
        break;
      default:
        break;
    }
  }

  printInfo(BuildContext context, Appointment item) {
    print(item);
    showDialog(
        context: context,
        builder: (_) => new AlertDialog(
          title: new Text("Informacion de la cita"),
          content: Column(
            children: [
              Text("${item.pacient?.namePacient}"),
              Text("${item.pacient?.agePacient}")
            ],
          ),
          actions: <Widget>[
            TextButton(
              child: Text('Close me!'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            )
          ],
        ));
  }

  /**
    Mostrar info de la cita en un cuadro de dialogo
  */
  /*
  Future<void> showDialogueInfo(BuildContext context, Appointment appointment) {
    return showDialog<void>(
      context: context,
      barrierDismissible: false, // user must tap button!
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('AlertDialog Title'),
          content: SingleChildScrollView(
            child: ListBody(
              children: const <Widget>[
                Text('This is a demo alert dialog.'),
                Text('Would you like to approve of this message?'),
              ],
            ),
          ),
          actions: <Widget>[
            TextButton(
              child: const Text('Approve'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }
  */
}
