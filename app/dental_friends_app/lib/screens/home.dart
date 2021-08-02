import 'package:dental_friends_app/constants/strings.dart';
import 'package:dental_friends_app/constants/theme.dart';
import 'package:dental_friends_app/widgets/bottom-navigation-bar.dart';
import 'package:dental_friends_app/widgets/card-horizontal.dart';
import 'package:dental_friends_app/widgets/drawer.dart';
import 'package:dental_friends_app/widgets/navbar.dart';
import 'package:flutter/material.dart';

class Home extends StatelessWidget {
  Home() {
    initClass();
  }

  initClass() async {
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: Navbar(title: "Home"),
      backgroundColor: MaterialColors.bgColorScreen,
      drawer: MaterialDrawer(currentPage: "Home"),
      body: Container(
        padding: EdgeInsets.only(left: 16.0, right: 16.0),
        child: contentScreen(context),
      ),
      bottomNavigationBar: BottonNavigationBar(option: 0),
    );
  }

  SingleChildScrollView contentScreen(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 4.0),
            child: CardHorizontal(
                cta: "View article 1",
                title: homeCardsMap["Ice Cream"]['title'],
                img: homeCardsMap["Ice Cream"]['image'],
                tap: () {
                  Navigator.pushNamed(context, '/signIn');
                }),
          ),
          Padding(
            padding: const EdgeInsets.only(top: 4.0),
            child: CardHorizontal(
                cta: "View article 1",
                title: homeCardsMap["Ice Cream"]['title'],
                img: homeCardsMap["Ice Cream"]['image'],
                tap: () {
                  Navigator.pushNamed(context, '/signIn');
                }),
          ),
        ],
      ),
    );
  }
}
