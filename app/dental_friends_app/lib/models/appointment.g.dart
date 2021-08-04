// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'appointment.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

AppointmentModel _$AppointmentModelFromJson(Map<String, dynamic> json) {
  return AppointmentModel(
    user: json['user'] == null
        ? null
        : User.fromJson(json['user'] as Map<String, dynamic>),
    pacient: json['pacient'] == null
        ? null
        : Pacient.fromJson(json['pacient'] as Map<String, dynamic>),
    dateBegin: json['dateBegin'] as String,
    dateFinish: json['dateFinish'] as String,
    treatment: json['treatment'] as String,
    id: json['id'] as int,
    state: json['state'] as String,
  );
}

Map<String, dynamic> _$AppointmentModelToJson(AppointmentModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'state': instance.state,
      'dateBegin': instance.dateBegin,
      'dateFinish': instance.dateFinish,
      'user': instance.user,
      'pacient': instance.pacient,
      'treatment': instance.treatment,
    };
