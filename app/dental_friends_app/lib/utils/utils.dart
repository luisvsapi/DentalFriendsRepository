import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:fluttertoast/fluttertoast.dart';

Future<bool> saveSecureStorage(String key, String value) async {
  try {
    final storage = new FlutterSecureStorage();
    await storage.write(key: key, value: value);
    return true;
  } on Exception catch (ex) {
    print("saveSecureStorage " + ex.toString());
  }
  return false;
}

Future<String> getSecureStorage(String key) async {
  try {
    final storage = new FlutterSecureStorage();
    return await storage.read(key: key);
  } on Exception catch (ex) {
    print("getSecureStorage " + ex.toString());
  }
  return null;
}

Future<bool> restartSecureStorage() async {
  try {
    final storage = new FlutterSecureStorage();
    storage.deleteAll();
    return true;
  } on Exception catch (ex) {
    print("restartSecureStorage " + ex.toString());
  }
  return false;
}

void showCenterShortToast(String message, {Color colorValue}) {
  Fluttertoast.cancel();
  Fluttertoast.showToast(
    backgroundColor: Colors.lightBlue,
    textColor: Colors.white,
    msg: message,
    toastLength: Toast.LENGTH_SHORT,
    gravity: ToastGravity.CENTER,
  );
}

bool haveContent(String element) {
  if (![null, ''].contains(element)) {
    return true;
  }
  return false;
}

String formatTimeReduced(String spMedium) {
  DateTime dt = DateTime.now().toLocal();
  return '${dt.year}${dt.month}${dt.day}$spMedium${dt.hour}${dt.minute}${dt.second}';
}
