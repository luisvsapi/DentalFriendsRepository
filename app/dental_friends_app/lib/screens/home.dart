import 'package:dental_friends_app/constants/strings.dart';
import 'package:flutter/material.dart';
import 'package:dental_friends_app/constants/theme.dart';
import 'package:dental_friends_app/widgets/card-horizontal.dart';
import 'package:dental_friends_app/widgets/card-square.dart';
import 'package:dental_friends_app/widgets/drawer.dart';
//widgets
import 'package:dental_friends_app/widgets/navbar.dart';

class Home extends StatelessWidget {
  // final GlobalKey _scaffoldKey = new GlobalKey();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: Navbar(
          title: "Dental Friends",
          searchBar: true,
          categoryOne: "Mis citas",
          categoryTwo: "Historiales",
        ),
        backgroundColor: MaterialColors.bgColorScreen,
        // key: _scaffoldKey,
        drawer: MaterialDrawer(currentPage: "Home"),
        body: Container(
          padding: EdgeInsets.only(left: 16.0, right: 16.0),
          child: SingleChildScrollView(
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.only(top: 16.0),
                  child: CardHorizontal(
                      cta: "View article 1",
                      title: homeCardsMap["Ice Cream"]['title'],
                      img: homeCardsMap["Ice Cream"]['image'],
                      tap: () {
                        Navigator.pushReplacementNamed(context, '/signIn');
                      }),
                ),
                SizedBox(height: 8.0),
                Padding(
                  padding: const EdgeInsets.only(bottom: 32.0),
                  child: CardSquare(
                      cta: "View article",
                      title: homeCardsMap["Argon"]['title'],
                      img: homeCardsMap["Argon"]['image'],
                      tap: () {
                        Navigator.pushReplacementNamed(context, '/signIn');
                      }),
                )
              ],
            ),
          ),
        ));
  }
}
