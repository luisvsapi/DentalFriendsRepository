// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'pacient.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Pacient _$PacientFromJson(Map<String, dynamic> json) {
  return Pacient(
    id: json['id'] as int,
    idCardPacient: json['idCardPacient'] as String,
    namePacient: json['namePacient'] as String,
    lastnamePacient: json['lastnamePacient'] as String,
    agePacient: json['agePacient'] as int,
    emailPacient: json['emailPacient'] as String,
  );
}

Map<String, dynamic> _$PacientToJson(Pacient instance) => <String, dynamic>{
      'id': instance.id,
      'idCardPacient': instance.idCardPacient,
      'namePacient': instance.namePacient,
      'lastnamePacient': instance.lastnamePacient,
      'agePacient': instance.agePacient,
      'emailPacient': instance.emailPacient,
    };
