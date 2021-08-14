import 'package:dental_friends_app/models/user.dart';
import 'package:dental_friends_app/services/dio_client.dart';
import 'package:dental_friends_app/utils/utils.dart';
import 'package:json_annotation/json_annotation.dart';

import 'pacient.dart';

part 'appointment.g.dart';

@JsonSerializable()
class AppointmentModel {
  final int id;
  final String state;
  final String dateBegin;
  final String dateFinish;
  final User user;
  final Pacient pacient;
  final String treatment;

  AppointmentModel(
      {this.user,
      this.pacient,
      this.dateBegin,
      this.dateFinish,
      this.treatment,
      this.id,
      this.state});

  @override
  String toString() {
    return 'AppointmentModel{id: $id, state: $state, dateBegin: $dateBegin, user: $user, pacient: $pacient}';
  }

  factory AppointmentModel.fromJson(Map<String, dynamic> json) =>
      _$AppointmentModelFromJson(json);

  Map<String, dynamic> toJson() => _$AppointmentModelToJson(this);

  static Future<List<AppointmentModel>> getByState({int state = 1}) async {
    List<dynamic> response = await DioClient().getJsonListRequest(
        '${"/appointment/state/$state"}',
        tokenValue: await getSecureStorage("token"));
    List<AppointmentModel> result =
        response.map((entry) => AppointmentModel.fromJson(entry)).toList();
    return result;
  }

  static Future<List<AppointmentModel>> getByStateAndDate(
      {int state = 1, DateTime dateStart, DateTime dateFinal}) async {
    List<dynamic> response = await DioClient().postJsonListRequest(
        '/appointment/stateAndDate',
        {'state': "$state", 'dateStart': dateStart.toString(), 'dateFinal': dateFinal.toString()},
        tokenValue: await getSecureStorage("token"));
    return response.map((entry) => AppointmentModel.fromJson(entry)).toList();
  }

  static Future<Map<String, dynamic>> deleteAppointment(int id) async {
    Map<String, dynamic> response = await DioClient().deleteJsonRequest(
        '/appointment/delete', {'id': id},
        tokenValue: await getSecureStorage("token"));
    if (response != null) return response;
    return {'message': 0};
  }

  static Future<Map<String, dynamic>> updateAppointment(AppointmentModel appointment) async {
    Map<String, dynamic> response = await DioClient().putJsonRequest(
        '/appointment/changeState', {'id': appointment.id, 'state': '${appointment.state}',
        'dateBegin': appointment.dateBegin, 'dateFinish': appointment.dateFinish},
        tokenValue: await getSecureStorage("token"));
    if (response != null) return response;
    return {'message': 0};
  }
}
