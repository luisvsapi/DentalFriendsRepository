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
    fontSize: 18,
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

Future<DateTime> datePickerLimits(BuildContext ctx,
    {Duration startBefore, Duration finishAfter}) {
  var now = DateTime.now();
  return showDatePicker(
    context: ctx,
    firstDate: now.subtract(startBefore),
    lastDate: now.add(finishAfter),
    initialDate: now,
  );
}

String stringFilterFormat(String value) {
  return value?.toLowerCase()?.trim() ?? '';
}

List<Duration> timeInSlot({int startHour, int endHour, int slotDuration}) {
  List<Duration> list = [];
  for (var hour = startHour; hour < endHour; hour++) {
    for (var minute = 0; minute < 60; minute += slotDuration) {
      list.add(Duration(hours: hour, minutes: minute));
    }
  }
  return list;
}

String dateFromDatetime(DateTime date) {
  return date != null ? date.toString().substring(0, 10) : '';
}

DateTime nowUntil({String mode = 'ALL'}) {
  final now = DateTime.now();
  switch(mode) {
    case 'ALL':
      return DateTime.utc(now.year, now.month, now.day, now.hour);
      break;
    case 'YEAR':
      return DateTime.utc(now.year, 1, 0, 0);
      break;
    case 'MONTH':
      return DateTime.utc(now.year, now.month, 0, 0);
      break;
    case 'DAY':
      return DateTime.utc(now.year, now.month, now.day, 0);
      break;
    case 'HOUR':
      return DateTime.utc(now.year, now.month, now.day, now.hour);
      break;
    default:
      return now;
      break;
  }
}

List<DateTime> limitDay(DateTime date) {
  DateTime tmpStart = DateTime.utc(date.year, date.month, date.day, 0, 0);
  DateTime tmpFinal = DateTime.utc(date.year, date.month, date.day, 23, 59);
  return [tmpStart, tmpFinal];
}