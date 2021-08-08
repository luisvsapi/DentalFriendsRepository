import 'package:dental_friends_app/constants/config.dart';
import 'package:dental_friends_app/constants/theme.dart';
import 'package:dental_friends_app/models/appointment.dart';
import 'package:dental_friends_app/utils/utils.dart';
import 'package:dental_friends_app/widgets/bottom-navigation-bar.dart';
import 'package:dental_friends_app/widgets/drawer.dart';
import 'package:dental_friends_app/widgets/navbar.dart';
import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';

class ManageAppoinment extends StatefulWidget {
  final AppointmentModel appointmenSelect;

  const ManageAppoinment({Key key, this.appointmenSelect}) : super(key: key);

  @override
  _ManageAppoinmentState createState() => _ManageAppoinmentState();
}

class _ManageAppoinmentState extends State<ManageAppoinment> {
  List<bool> _isOpen = [true, true];
  final controllerCalendarList = ScrollController();

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: Scaffold(
            appBar: Navbar(title: "Citas"),
            backgroundColor: MaterialColors.bgColorScreen,
            drawer: MaterialDrawer(currentPage: "Citas"),
            body: SingleChildScrollView(
              padding: EdgeInsets.only(left: 16.0, right: 16.0),
              child: ExpansionPanelList(
                children: [
                  ExpansionPanel(
                      isExpanded: _isOpen[0],
                      headerBuilder: (context, isOpen) {
                        return ListTile(
                          title: Text('Seleccionar dia'),
                        );
                      },
                      body: TableCalendar(
                        firstDay: DateTime.utc(2010, 10, 16),
                        lastDay: DateTime.utc(2030, 3, 14),
                        focusedDay: DateTime.now(),
                        onDaySelected: (selectedDay, focusedDay) {
                          print(selectedDay);
                        },
                        onPageChanged: (focusedDay) {
                          print(focusedDay);
                        },
                      )),
                  ExpansionPanel(
                      isExpanded: _isOpen[1],
                      headerBuilder: (context, isOpen) {
                        return ListTile(
                          title: Text('Seleccionar dia'),
                        );
                      },
                      body: loadAppointmentByDayScreen(context),
                  )
                ],
                expansionCallback: (i, isOpen) =>
                    setState(() => _isOpen[i] = !isOpen),
              ),
            ),
            bottomNavigationBar: BottonNavigationBar(option: 1)));
  }

  FutureBuilder<List<AppointmentModel>> loadAppointmentByDayScreen(BuildContext context) {
    List<Duration> listDuration = timeInSlot(startHour: startDate.hour, endHour: endDate.hour,
        slotDuration: slotCalendarTime.inMinutes);
    return FutureBuilder<List<AppointmentModel>>(
        future: AppointmentModel.getByState(state: 2),
        builder: (context, request) {
          if (request.hasData) {
            List<AppointmentModel> dataRequest = request.data;
            int dataLen = dataRequest?.length ?? 0;
            if (dataLen > 0) {
              return ListView.builder(
                  itemCount: listDuration.length,
                  scrollDirection: Axis.vertical,
                  addAutomaticKeepAlives: true,
                  shrinkWrap: true,
                  controller: controllerCalendarList,
                  itemBuilder: (context, index) {
                    Duration item = listDuration[index];
                    //DateTime.parse(element.dateBegin).day)
                    listDuration.map((duration) => {
                      dataRequest.map((appointment) => {
                        if(DateTime.parse(appointment.))
                      })
                    });
                    return Card(
                      child: ListTile(
                        onTap: () => print(1),
                        dense: true,
                        tileColor: Colors.white30,
                        title: Text('${item}', style: boldStyle(size: 14)),
                      ),
                    );
                  },
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

}
