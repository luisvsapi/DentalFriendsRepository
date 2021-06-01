import 'package:dental_friends_app/screens/components.dart';
import 'package:dental_friends_app/screens/home.dart';
import 'package:dental_friends_app/screens/login.dart';
import 'package:dental_friends_app/screens/onboarding.dart';
import 'package:dental_friends_app/screens/profile.dart';
import 'package:dental_friends_app/screens/settings.dart';
import 'package:flutter/material.dart';
import 'package:get/get_navigation/src/root/get_material_app.dart';

void main() => runApp(MainApp());

class MainApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
        title: "Dental Friends",
        debugShowCheckedModeBanner: false,
        initialRoute: "/signIn",
        routes: <String, WidgetBuilder>{
          "/onBoarding": (BuildContext context) => new Onboarding(),
          "/home": (BuildContext context) => new Home(),
          "/components": (BuildContext context) => new Components(),
          "/profile": (BuildContext context) => new Profile(),
          "/settings": (BuildContext context) => new Settings(),
          "/signIn": (BuildContext context) => new Login(),
        });
  }
}
