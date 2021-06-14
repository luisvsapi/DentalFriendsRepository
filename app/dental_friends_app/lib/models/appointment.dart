import 'package:dental_friends_app/models/user.dart';
import 'package:dental_friends_app/services/dio_client.dart';
import 'package:dental_friends_app/utils/utils.dart';
import 'package:json_annotation/json_annotation.dart';

import 'pacient.dart';

part 'appointment.g.dart';

@JsonSerializable()
class Appointment {
  final int id;
  final String state;
  final String dateBegin;
  final String dateFinish;
  final User user;
  final Pacient pacient;
  final String treatment;

  Appointment(
      {this.user,
      this.pacient,
      this.dateBegin,
      this.dateFinish,
      this.treatment,
      this.id,
      this.state});

  factory Appointment.fromJson(Map<String, dynamic> json) =>
      _$AppointmentFromJson(json);
  Map<String, dynamic> toJson() => _$AppointmentToJson(this);

  static Future<List<Appointment>> getByStare({int state = 1}) async {
    List<dynamic> response = await DioClient().getJsonListRequest(
        '/appointment/state/$state',
        tokenValue: await getSecureStorage("token"));
    List<Appointment> result =
        response.map((entry) => Appointment.fromJson(entry)).toList();
    result.add(result[0]);
    result.add(result[0]);
    result.add(result[0]);
    result.add(result[0]);
    result.add(result[0]);
    result.add(result[0]);
    result.add(result[0]);
    result.add(result[0]);
    result.add(result[0]);
    return result;
  }
}
