import 'package:dental_friends_app/constants/strings.dart';
import 'package:dental_friends_app/constants/theme.dart';
import 'package:dental_friends_app/models/appointment.dart';
import 'package:dental_friends_app/utils/utils.dart';
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

List<AppointmentModel> appointments;
List<AppointmentModel> appointmentsByDay;

enum popupButtonDecisition { accept, reject }

class StateAppointment extends State<AppointmentScreen> {
  @override
  Widget build(BuildContext context) {
    print('BUILD StateAppointment');
    return Scaffold(
      appBar: Navbar(title: "Citas"),
      backgroundColor: MaterialColors.bgColorScreen,
      drawer: MaterialDrawer(currentPage: "Citas"),
      body: Container(
        padding: EdgeInsets.only(left: 16.0, right: 16.0),
        child: contentScreen(context),
      ),
      bottomNavigationBar: BottonNavigationBar(option: 1),
      floatingActionButton: FloatingActionButton(
          onPressed: () {
            filterForm();
          },
          child: Icon(Icons.search)),
    );
  }

  /**
   * Este metodo podria ser mas eficiente si deseas actualizar el listado
   * Porque no mejor se coloca un select en donde los valores son las fechas???
   */
  updateLayoutByDay(int day) {
    DateTime dayAppointment;
    List<AppointmentModel> temp = [];
    switch (day) {
      case 0:
        appointments.forEach((e) => {
              dayAppointment = DateTime.parse(e.dateBegin),
              if (dayAppointment.weekday == DateTime.monday) {temp.add(e)}
            });
        break;
      case 1:
        appointments.forEach((e) => {
              dayAppointment = DateTime.parse(e.dateBegin),
              if (dayAppointment.weekday == DateTime.tuesday) {temp.add(e)}
            });
        break;
      case 2:
        appointments.forEach((e) => {
              dayAppointment = DateTime.parse(e.dateBegin),
              if (dayAppointment.weekday == DateTime.wednesday) {temp.add(e)}
            });
        break;
      case 3:
        appointments.forEach((e) => {
              dayAppointment = DateTime.parse(e.dateBegin),
              if (dayAppointment.weekday == DateTime.thursday) {temp.add(e)}
            });
        break;
      case 4:
        appointments.map((e) => {
              dayAppointment = DateTime.parse(e.dateBegin),
              if (dayAppointment.weekday == DateTime.friday) {temp.add(e)}
            });
        break;
      case 5:
        appointments.forEach((e) => {
              dayAppointment = DateTime.parse(e.dateBegin),
              if (dayAppointment.weekday == DateTime.saturday) {temp.add(e)}
            });
        break;
      case 6:
        appointments.forEach((e) => {
              dayAppointment = DateTime.parse(e.dateBegin),
              if (dayAppointment.weekday == DateTime.sunday) {temp.add(e)}
            });
        break;
      default:
        print("Imposible en dia");
        break;
    }
    print(appointments);
    setState(() {
      appointmentsByDay = temp;
    });
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
        onPressed: () => updateLayoutByDay(element['value']),
        style: bottonBorderBlue,
        child: Text(element['label'], style: boldStyle),
      ));
    });
    return buttons;
  }

  FutureBuilder<List<AppointmentModel>> loadAppointmentByDayScreen(
      BuildContext context) {
    return FutureBuilder<List<AppointmentModel>>(
        future: AppointmentModel.getByState(),
        builder: (context, request) {
          if (request.hasData) {
            List<AppointmentModel> result = request.data;
            int dataLen = result?.length ?? 0;
            if (dataLen > 0) {
              appointments = result;
              return Expanded(
                child: ListView.builder(
                  itemCount: dataLen,
                  scrollDirection: Axis.vertical,
                  shrinkWrap: true,
                  itemBuilder: (context, index) {
                    AppointmentModel item = result[index];
                    return Card(
                      //color: Colors.blueAccent,
                      child: ListTile(
                        tileColor: Colors.white30,
                        title: Text("${item.treatment}", style: boldStyle),
                        subtitle: Text(
                            "${item.pacient.namePacient} ${item.pacient.lastnamePacient}",
                            style: boldStyle),
                        leading: IconButton(
                            icon: Icon(Icons.info),
                            onPressed: () => printInfo(context, item)),
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
                ),
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
        AppointmentModel.acceptAppointment(id);
        break;
      case popupButtonDecisition.reject:
        AppointmentModel.deleteAppointment(id).then((value) {
          if (value['message'] == 1) {
            setState(() {});
            showCenterShortToast('La cita #${id} se elimino correctamente');
          }
        });
        break;
      default:
        break;
    }
  }

  printInfo(BuildContext context, AppointmentModel item) {
    showDialog(
        context: context,
        builder: (_) {
          return new AlertDialog(
            title: new Text("Informacion de la cita # ${item.id}"),
            content: Column(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Text("DETALLES", style: boldStyle),
                Text("Inicio:", style: boldStyle),
                Text("${item.dateBegin}"),
                // item.dateFinish != null ? Text("Fin:", style: boldStyle) : Container(),
                // item.dateFinish != null ? Text("${item.dateFinish}") : Container(),
                Text("PACIENTE", style: boldStyle),
                Text("Cedula:", style: boldStyle),
                Text("${item.pacient?.idCardPacient ?? ''}"),
                Text("Nombre:", style: boldStyle),
                Text(
                    "${item.pacient?.namePacient ?? ''} ${item.pacient?.lastnamePacient ?? ''}"),
                Text("Edad:", style: boldStyle),
                Text("${item.pacient?.agePacient ?? ''}"),
                Text("Contacto:", style: boldStyle),
                Text("${item.pacient?.emailPacient ?? ''} ")
              ],
            ),
            actions: <Widget>[
              TextButton(
                child: Text('Salir'),
                style: bottonBorderBlue,
                onPressed: () {
                  Navigator.of(context).pop();
                },
              )
            ],
          );
        });
  }

  void filterForm() {
    showDialog(
        context: context,
        builder: (_) {
          return new AlertDialog(
            title: new Text("Filtrar citas"),
            content: SingleChildScrollView(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Text("Fecha", style: boldStyle),
                  IconButton(
                      onPressed: () async {
                        final DateTime picked = await showDatePicker(
                          context: context,
                          firstDate: DateTime.now(),
                          lastDate: DateTime(2022),
                          initialDate: DateTime.now(),
                        );
                        print(picked);
                      },
                      icon: const Icon(Icons.calendar_today)),
                  SizedBox(height: 10),
                  Text("Nombre:", style: boldStyle),
                  TextField(),
                  SizedBox(height: 10),
                  Text("Cedula:", style: boldStyle),
                  TextField()
                ],
              ),
            ),
            actions: <Widget>[
              TextButton(
                child: Text('Salir'),
                style: bottonBorderBlue,
                onPressed: () {
                  Navigator.of(context).pop();
                },
              )
            ],
          );
        });
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
