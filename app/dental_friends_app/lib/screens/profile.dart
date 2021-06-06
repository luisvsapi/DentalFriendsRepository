import 'dart:ui';

import 'package:dental_friends_app/constants/theme.dart';
import 'package:dental_friends_app/widgets/drawer.dart';
import 'package:dental_friends_app/widgets/input.dart';
import 'package:dental_friends_app/widgets/navbar.dart';
import 'package:flutter/material.dart';

List<String> imgArray = [
  "https://images.unsplash.com/photo-1508264443919-15a31e1d9c1a?fit=crop&w=240&q=80",
  "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?fit=crop&w=240&q=80",
  "https://images.unsplash.com/photo-1487376480913-24046456a727?fit=crop&w=240&q=80",
  "https://images.unsplash.com/photo-1494894194458-0174142560c0?fit=crop&w=240&q=80",
  "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?fit=crop&w=240&q=80",
  "https://images.unsplash.com/photo-1542068829-1115f7259450?fit=crop&w=240&q=80"
];

class Profile extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        extendBodyBehindAppBar: true,
        appBar: Navbar(
          title: "Profile",
          transparent: true,
        ),
        backgroundColor: MaterialColors.bgColorScreen,
        drawer: MaterialDrawer(currentPage: "Profile"),
        body: Stack(
          children: [
            Container(
              height: MediaQuery.of(context).size.height * 0.6,
              decoration: BoxDecoration(
                  image: DecorationImage(
                      alignment: Alignment.topCenter,
                      image: NetworkImage(
                          "https://images.unsplash.com/photo-1512529920731-e8abaea917a5?fit=crop&w=840&q=80"),
                      fit: BoxFit.fitWidth)),
            ),
            Container(
              height: MediaQuery.of(context).size.height * 0.6,
              decoration: BoxDecoration(
                  gradient: LinearGradient(
                      begin: Alignment.center,
                      end: Alignment.bottomCenter,
                      colors: [
                    Colors.black.withOpacity(0),
                    Colors.black.withOpacity(0.9),
                  ])),
            ),
            Container(
              margin: EdgeInsets.only(
                top: MediaQuery.of(context).size.height * 0.50,
              ),
              padding: EdgeInsets.symmetric(horizontal: 28),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.only(bottom: 4.0),
                    child: Text("Rachel Brown",
                        style: TextStyle(fontSize: 28, color: Colors.white)),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Padding(
                            padding: const EdgeInsets.only(right: 8.0),
                            child: Text("Esp. cirugia",
                                style: TextStyle(
                                    color: Colors.white, fontSize: 16)),
                          ),
                          Row(
                            children: [
                              Padding(
                                padding: const EdgeInsets.only(right: 4.0),
                                child: Text("5",
                                    style: TextStyle(
                                        color: MaterialColors.warning,
                                        fontSize: 16)),
                              ),
                              Icon(Icons.star_border,
                                  color: MaterialColors.warning, size: 20)
                            ],
                          )
                        ],
                      ),
                      Row(
                        children: [
                          Padding(
                            padding: const EdgeInsets.only(right: 8.0),
                            child: Icon(Icons.pin_drop,
                                color: MaterialColors.muted),
                          ),
                          Text("Ecuador",
                              style: TextStyle(color: MaterialColors.muted))
                        ],
                      )
                    ],
                  )
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Container(
                decoration: BoxDecoration(
                    boxShadow: [
                      BoxShadow(
                          color: Colors.black.withOpacity(0.2),
                          spreadRadius: 8,
                          blurRadius: 10,
                          offset: Offset(0, 0))
                    ],
                    color: Colors.white,
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(13.0),
                      topRight: Radius.circular(13.0),
                    )),
                margin: EdgeInsets.only(
                  top: MediaQuery.of(context).size.height * 0.60,
                ),
                child: ListView(
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(left: 8, bottom: 8),
                      child: Align(
                        alignment: Alignment.topCenter,
                        child: Text("This is a muted paragraph.",
                            style: TextStyle(
                                fontSize: 16, color: MaterialColors.muted)),
                      ),
                    ),
                    Padding(
                        padding: const EdgeInsets.only(left: 8, right: 8),
                        child: Input(
                          placeholder: "icon right",
                          outlineBorder: true,
                          borderColor: MaterialColors.muted,
                          focusedBorderColor: MaterialColors.muted,
                          enabledBorderColor: MaterialColors.muted,
                          textColor: MaterialColors.muted,
                          hintTextColor: MaterialColors.muted,
                          suffixIcon: Icon(Icons.camera_enhance),
                        )),
                    Padding(
                      padding:
                          const EdgeInsets.only(left: 8, top: 8, bottom: 8),
                      child: Align(
                        child: Text("This is a muted paragraph.",
                            style: TextStyle(
                                fontSize: 16, color: MaterialColors.muted)),
                      ),
                    ),
                    Padding(
                        padding: const EdgeInsets.only(left: 8, right: 8),
                        child: Input(
                          placeholder: "icon right",
                          outlineBorder: true,
                          borderColor: MaterialColors.muted,
                          focusedBorderColor: MaterialColors.muted,
                          enabledBorderColor: MaterialColors.muted,
                          textColor: MaterialColors.muted,
                          hintTextColor: MaterialColors.muted,
                          suffixIcon: Icon(Icons.camera_enhance),
                        )),
                    Padding(
                      padding:
                          const EdgeInsets.only(left: 8, top: 8, bottom: 8),
                      child: Align(
                        child: Text("This is a muted paragraph.",
                            style: TextStyle(
                                fontSize: 16, color: MaterialColors.muted)),
                      ),
                    ),
                    Padding(
                        padding: const EdgeInsets.only(left: 8, right: 8),
                        child: Input(
                          placeholder: "icon right",
                          outlineBorder: true,
                          borderColor: MaterialColors.muted,
                          focusedBorderColor: MaterialColors.muted,
                          enabledBorderColor: MaterialColors.muted,
                          textColor: MaterialColors.muted,
                          hintTextColor: MaterialColors.muted,
                          suffixIcon: Icon(Icons.camera_enhance),
                        )),
                    Padding(
                      padding:
                          const EdgeInsets.only(left: 8, top: 8, bottom: 8),
                      child: Align(
                        child: Text("This is a muted paragraph.",
                            style: TextStyle(
                                fontSize: 16, color: MaterialColors.muted)),
                      ),
                    ),
                    Padding(
                        padding: const EdgeInsets.only(left: 8, right: 8),
                        child: Input(
                          placeholder: "icon right",
                          outlineBorder: true,
                          borderColor: MaterialColors.muted,
                          focusedBorderColor: MaterialColors.muted,
                          enabledBorderColor: MaterialColors.muted,
                          textColor: MaterialColors.muted,
                          hintTextColor: MaterialColors.muted,
                          suffixIcon: Icon(Icons.camera_enhance),
                        )),
                    Padding(
                      padding:
                          const EdgeInsets.only(left: 8, top: 8, bottom: 8),
                      child: Align(
                        child: Text("This is a muted paragraph.",
                            style: TextStyle(
                                fontSize: 16, color: MaterialColors.muted)),
                      ),
                    ),
                    Padding(
                        padding: const EdgeInsets.only(left: 8, right: 8),
                        child: Input(
                          placeholder: "icon right",
                          outlineBorder: true,
                          borderColor: MaterialColors.muted,
                          focusedBorderColor: MaterialColors.muted,
                          enabledBorderColor: MaterialColors.muted,
                          textColor: MaterialColors.muted,
                          hintTextColor: MaterialColors.muted,
                          suffixIcon: Icon(Icons.camera_enhance),
                        ))
                  ],
                ),
              ),
            )
          ],
        ));
  }
}
