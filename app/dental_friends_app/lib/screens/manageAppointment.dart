import 'package:dental_friends_app/constants/config.dart';
import 'package:dental_friends_app/constants/theme.dart';
import 'package:dental_friends_app/models/appointment.dart';
import 'package:dental_friends_app/utils/utils.dart';
import 'package:dental_friends_app/widgets/bottom-navigation-bar.dart';
import 'package:dental_friends_app/widgets/drawer.dart';
import 'package:dental_friends_app/widgets/navbar.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:searchable_dropdown/searchable_dropdown.dart';
import 'package:table_calendar/table_calendar.dart';

class ManageAppoinment extends StatefulWidget {
  final AppointmentModel appointmenSelect;

  const ManageAppoinment({Key key, this.appointmenSelect}) : super(key: key);

  @override
  _ManageAppoinmentState createState() => _ManageAppoinmentState();
}

class _ManageAppoinmentState extends State<ManageAppoinment> {
  List<bool> _isOpen = [false, false];
  final controllerCalendarList = ScrollController();
  List<Duration> listDuration = timeInSlot(startHour: startDate.hour, endHour: endDate.hour,
      slotDuration: slotCalendarTime.inMinutes);

  Duration selectHour;
  DateTime selectDate = DateTime.now();

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: Scaffold(
            appBar: Navbar(title: "Citas"),
            backgroundColor: MaterialColors.bgColorScreen,
            drawer: MaterialDrawer(currentPage: "Citas"),
            body: SingleChildScrollView(
              padding: EdgeInsets.only(left: 16.0, right: 16.0),
              child: Column(
                children: [
                  Divider(),
                  Text('Seleccione las opciones para agendar:', style: boldStyle()),
                  Divider(),
                  Text('${dateFromDatetime(selectDate) ?? '-'} a las ${selectHour.toString()?.replaceAll(':00.000000', '') ?? '-'}'),
                  Divider(),
                  ExpansionPanelList(
                    expandedHeaderPadding: EdgeInsets.all(10),
                    dividerColor: Colors.blue,
                    children: [
                      ExpansionPanel(
                          isExpanded: _isOpen[0],
                          headerBuilder: (context, isOpen) {
                            return ListTile(
                              title: Text('Seleccionar dia:'),
                            );
                          },
                          body: TableCalendar(
                            firstDay: DateTime.utc(2010, 10, 16),
                            lastDay: DateTime.utc(2030, 3, 14),
                            focusedDay: DateTime.now(),
                            currentDay: selectDate,
                            onDaySelected: (selectedDay, focusedDay) {
                              setState(() {
                                selectDate = selectedDay;
                              });
                            },
                            onPageChanged: (focusedDay) {},
                          )),
                      ExpansionPanel(
                          isExpanded: _isOpen[1],
                          headerBuilder: (context, isOpen) {
                            return ListTile(
                              title: Text('Seleccionar hora:'),
                            );
                          },
                          body: loadAppointmentByDayScreen(context),
                      )
                    ],
                    expansionCallback: (i, isOpen) =>
                        setState(() => _isOpen[i] = !isOpen),
                  ),
                ],
              ),
            ),
            bottomNavigationBar: BottonNavigationBar(option: 1)));
  }

  FutureBuilder<List<AppointmentModel>> loadAppointmentByDayScreen(BuildContext context) {
    return FutureBuilder<List<AppointmentModel>>(
        future: AppointmentModel.getByState(state: 2, mode: 1,
            dateStart: selectDate.subtract(Duration(days: 1)),
            dateFinal: selectDate.add(Duration(days: 1))),
        builder: (context, request) {
          if (request.hasData) {
            List<AppointmentModel> dataRequest = request.data;
            int dataLen = dataRequest?.length ?? 0;
            if (dataLen > 0) {
              List<Duration> timeNoShow = filterTimeAppointments(dataRequest);
              listDuration.removeWhere((element) => timeNoShow.contains(element));
              return SearchableDropdown.single(
                items: listDuration.map((e) => DropdownMenuItem<Duration>(
                  child: Text('${e.toString().replaceAll(':00.000000', '')}'),
                  value: e,
                )).toList(),
                hint: "Seleccione una hora",
                searchHint: null,
                onChanged: (value) {
                  print(value);
                  setState(() {
                    selectHour = value;
                  });
                },
                dialogBox: false,
                isExpanded: true,
                menuConstraints: BoxConstraints.tight(Size.fromHeight(350)),
              );
            };
          }
          return Container(
            child: Center(
              child: Text("Cargando..."),
            ),
          );
        });
  }

  List<Duration> filterTimeAppointments(List<AppointmentModel> dataRequest) {
    return dataRequest.map((appointment) {
      DateTime hourReservated = DateTime.parse(appointment.dateBegin);
      return Duration(hours: hourReservated.hour, minutes: hourReservated.minute);
    }).toList();
  }

}
