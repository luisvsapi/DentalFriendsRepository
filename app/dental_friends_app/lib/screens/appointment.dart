import 'package:dental_friends_app/constants/enums.dart';
import 'package:dental_friends_app/constants/theme.dart';
import 'package:dental_friends_app/models/appointment.dart';
import 'package:dental_friends_app/screens/manageAppointment.dart';
import 'package:dental_friends_app/utils/utils.dart';
import 'package:dental_friends_app/widgets/bottom-navigation-bar.dart';
import 'package:dental_friends_app/widgets/drawer.dart';
import 'package:dental_friends_app/widgets/navbar.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:pull_to_refresh/pull_to_refresh.dart';

class AppointmentScreen extends StatefulWidget {
  @override
  State createState() => new StateAppointment();
}

class StateAppointment extends State<AppointmentScreen> {
  final controllerCardPacient = TextEditingController();
  final controllerNamePacient = TextEditingController();
  DateTime controllerDate = DateTime.now();

  List<AppointmentModel> listAppointmentLoad = [];
  List<AppointmentModel> filterAppointment = [];

  int filterMode = 0;

  RefreshController refreshController =
      RefreshController(initialRefresh: false);

  @override
  void dispose() {
    controllerCardPacient.dispose();
    controllerNamePacient.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    print('BUILD StateAppointment');
    return SafeArea(
      child: Scaffold(
        appBar: Navbar(title: "Citas"),
        backgroundColor: MaterialColors.bgColorScreen,
        drawer: MaterialDrawer(currentPage: "Citas"),
        body: Container(
          padding: EdgeInsets.only(left: 16.0, right: 16.0),
          child: contentScreen(context),
        ),
        bottomNavigationBar: BottonNavigationBar(option: 1),
        floatingActionButton: FloatingActionButton(
            tooltip: 'Filtros para cita',
            onPressed: () {
              filterForm();
            },
            child: Icon(Icons.search)),
      ),
    );
  }


  void onRefresh() async {
    clearScreen();
    await Future.delayed(Duration(milliseconds: 1000));
    refreshController.refreshCompleted();
  }

  void onLoading() async {
    await Future.delayed(Duration(milliseconds: 1000));
    refreshController.loadComplete();
  }

  void clearScreen() {
    setState(() {
      filterMode = 0;
    });
    controllerNamePacient.text = '';
    controllerCardPacient.text = '';
    controllerDate = DateTime.now();
  }

  contentScreen(BuildContext context) {
    return SmartRefresher(
        enablePullDown: true,
        enablePullUp: true,
        header: WaterDropHeader(),
        controller: refreshController,
        onRefresh: onRefresh,
        onLoading: onLoading,
        child: new Column(
          children: <Widget>[
            ListTile(
              title: Text('Solicitudes',
                  style: TextStyle(
                    fontSize: 20.0,
                    fontWeight: FontWeight.bold,
                  )),
              leading: Icon(Icons.arrow_downward_sharp),
            ),
            loadAppointmentByDayScreen(context),
          ],
        ));
  }

  FutureBuilder<List<AppointmentModel>> loadAppointmentByDayScreen(
      BuildContext context) {
    return FutureBuilder<List<AppointmentModel>>(
        future: AppointmentModel.getByState(),
        builder: (context, request) {
          if (request.hasData) {
            listAppointmentLoad = request.data;
            var tmpAppointmentLoad =
                filterMode == 1 ? filterAppointment : listAppointmentLoad;
            int dataLen = tmpAppointmentLoad?.length ?? 0;
            if (dataLen > 0) {
              return Expanded(
                child: ListView.builder(
                  itemCount: dataLen,
                  scrollDirection: Axis.vertical,
                  shrinkWrap: true,
                  itemBuilder: (context, index) {
                    AppointmentModel item = tmpAppointmentLoad[index];
                    return Card(
                      child: ListTile(
                        dense: true,
                        tileColor: Colors.white30,
                        title: Text(
                            "${item.pacient.namePacient} ${item.pacient.lastnamePacient}",
                            style: boldStyle(size: 14)),
                        subtitle: Text("${item.id} - ${item.treatment}",
                            style: boldStyle(size: 14)),
                        leading: IconButton(
                            icon: Icon(Icons.info),
                            onPressed: () => printInfo(context, item)),
                        trailing: PopupMenuButton<popupButtonDecisition>(
                          onSelected: (popupButtonDecisition result) {
                            executeDecisiton(result, item);
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
  void executeDecisiton(
      popupButtonDecisition result, AppointmentModel element) {
    switch (result) {
      case popupButtonDecisition.accept:
        //AppointmentModel.acceptAppointment(element.id);
        Get.to(() => ManageAppoinment(appointmenSelect: element));
        break;
      case popupButtonDecisition.reject:
        AppointmentModel.deleteAppointment(element.id).then((value) {
          if (value['message'] == 1) {
            setState(() {});
            showCenterShortToast(
                'La cita #${element.id} se elimino correctamente');
          }
        });
        break;
      default:
        break;
    }
  }

  void printInfo(BuildContext context, AppointmentModel item) {
    showDialog(
        context: context,
        builder: (_) {
          return new AlertDialog(
            title: new Text("Informacion de la cita # ${item.id}"),
            content: Column(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Text("DETALLES", style: boldStyle(size: 14)),
                Text("Inicio:", style: boldStyle(size: 14)),
                Text("${item.dateBegin}"),
                // item.dateFinish != null ? Text("Fin:", style: boldStyle(size: 14)) : Container(),
                // item.dateFinish != null ? Text("${item.dateFinish}") : Container(),
                Text("PACIENTE", style: boldStyle(size: 14)),
                Text("Cedula:", style: boldStyle(size: 14)),
                Text("${item.pacient?.idCardPacient ?? ''}"),
                Text("Nombre:", style: boldStyle(size: 14)),
                Text(
                    "${item.pacient?.namePacient ?? ''} ${item.pacient?.lastnamePacient ?? ''}"),
                Text("Edad:", style: boldStyle(size: 14)),
                Text("${item.pacient?.agePacient ?? ''}"),
                Text("Contacto:", style: boldStyle(size: 14)),
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
                  Text("Fecha:", style: boldStyle(size: 14)),
                  IconButton(
                      onPressed: () async {
                        final DateTime picked = await datePickerLimits(context,
                            finishAfter: Duration(days: 15),
                            startBefore: Duration(days: 1));
                        controllerDate = picked;
                      },
                      icon: const Icon(Icons.calendar_today)),
                  SizedBox(height: 10),
                  Text("Nombre:", style: boldStyle(size: 14)),
                  TextField(controller: controllerNamePacient),
                  SizedBox(height: 10),
                  Text("Cedula:", style: boldStyle(size: 14)),
                  TextField(controller: controllerCardPacient)
                ],
              ),
            ),
            actions: <Widget>[
              TextButton(
                child: Text('Filtrar'),
                style: bottonBorderBlue,
                onPressed: () {
                  filterAppointment = [];
                  listAppointmentLoad.forEach((element) {
                    if (conditionsToFilter(element)) {
                      filterAppointment.add(element);
                    }
                  });
                  setState(() {
                    filterMode = 1;
                  });
                },
              ),
              TextButton(
                child: Text('Limpiar'),
                style: bottonBorderBlue,
                onPressed: () {
                  Navigator.of(context).pop();
                  clearScreen();
                },
              ),
              TextButton(
                child: Text('Salir'),
                style: bottonBorderBlue,
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),
            ],
          );
        });
  }

  bool conditionsToFilter(AppointmentModel element) {
    var nameValidation = stringFilterFormat(
                element.pacient.namePacient + element.pacient.lastnamePacient)
            .contains(stringFilterFormat(controllerNamePacient.text)) &&
        controllerNamePacient.text != '';
    var cardValidation = (stringFilterFormat(element.pacient.idCardPacient)
            .contains(stringFilterFormat(controllerCardPacient.text)) &&
        controllerCardPacient.text != '');
    var calendarValidation = (controllerDate != null &&
        controllerDate.day == DateTime.parse(element.dateBegin).day);
    return nameValidation || cardValidation || calendarValidation;
  }
}
