import 'package:dental_friends_app/screens/appointment.dart';
import 'package:dental_friends_app/screens/components.dart';
import 'package:dental_friends_app/screens/infoAppointment.dart';
import 'package:dental_friends_app/screens/login.dart';
import 'package:dental_friends_app/screens/onboarding.dart';
import 'package:dental_friends_app/screens/profile.dart';
import 'package:dental_friends_app/screens/settings.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get_navigation/src/root/get_material_app.dart';

void main() => startApp(horizontalMode: false);

void startApp({bool horizontalMode = false}) {
  if (!horizontalMode) {
    WidgetsFlutterBinding.ensureInitialized();
    SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp])
        .then((_) {
      runAppMaterial();
    });
  } else {
    runAppMaterial();
  }
}

void runAppMaterial() async {
  /*
  runApp(MultiProvider(
    providers: [],
    child: MyApp(),
  ));
  */
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
        title: "Dental Friends",
        debugShowCheckedModeBanner: false,
        initialRoute: "/appointment",
        routes: <String, WidgetBuilder>{
          "/onBoarding": (BuildContext context) => new Onboarding(),
          "/home": (BuildContext context) => new InfoAppoinment(),
          "/components": (BuildContext context) => new Components(),
          "/profile": (BuildContext context) => new Profile(),
          "/settings": (BuildContext context) => new Settings(),
          "/signIn": (BuildContext context) => new Login(),
          "/appointment": (BuildContext context) => new AppointmentScreen(),
        });
  }
}
