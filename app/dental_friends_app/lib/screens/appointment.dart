import 'package:dental_friends_app/constants/theme.dart';
import 'package:dental_friends_app/models/appointment.dart';
import 'package:dental_friends_app/widgets/bottom-navigation-bar.dart';
import 'package:dental_friends_app/widgets/drawer.dart';
import 'package:dental_friends_app/widgets/navbar.dart';
import 'package:flutter/material.dart';

class AppointmentScreen extends StatelessWidget {
  Future<String> initClass() async {
    return "";
  }

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

  contentScreen(BuildContext context) {
    Appointment.getByStare();
    return FutureBuilder<List<Appointment>>(
      future: Appointment.getByStare(),
      builder: (context, request) {
        if (request.connectionState == ConnectionState.done &&
            request.hasData) {
          return ListView.builder(
              itemCount: request.data.length,
              itemBuilder: (context, index) {
                Appointment item = request.data[index];
                return Padding(
                  padding: const EdgeInsets.only(top: 4.0),
                  child: ListTile(
                    tileColor: MaterialColors.defaultButton,
                    title: Text("${item.id} - ${item.treatment}"),
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
                );
              });
        }
        return Container();
      },
    );
  }
}
