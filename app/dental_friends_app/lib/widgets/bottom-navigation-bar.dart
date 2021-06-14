import 'package:convex_bottom_bar/convex_bottom_bar.dart';
import 'package:flutter/material.dart';

class BottonNavigationBar extends StatelessWidget {
  final int option;

  BottonNavigationBar({this.option});

  @override
  Widget build(BuildContext context) {
    return ConvexAppBar(
      items: [
        TabItem(icon: Icons.home, title: 'Home'),
        TabItem(icon: Icons.assignment_sharp, title: 'Citas'),
      ],
      initialActiveIndex: this.option,
      onTap: (int i) => tapBottonBar(context, i),
    );
  }

  void tapBottonBar(BuildContext ctx, int i) {
    print('click index=$i');
    switch (i) {
      case 0:
        Navigator.pushNamed(ctx, '/home');
        break;
      case 1:
        Navigator.pushNamed(ctx, '/appointment');
        break;
      default:
        break;
    }
  }
}
