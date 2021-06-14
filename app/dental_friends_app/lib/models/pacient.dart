import 'package:json_annotation/json_annotation.dart';

part 'pacient.g.dart';

@JsonSerializable()
class Pacient {
  final int id;
  final String idCardPacient;
  final String namePacient;
  final String lastnamePacient;
  final int agePacient;
  final String emailPacient;

  Pacient(
      {this.id,
      this.idCardPacient,
      this.namePacient,
      this.lastnamePacient,
      this.agePacient,
      this.emailPacient});

  @override
  String toString() {
    return 'Pacient{id: $id, idCardPacient: $idCardPacient, namePacient: $namePacient, lastnamePacient: $lastnamePacient, agePacient: $agePacient, emailPacient: $emailPacient}';
  }

  factory Pacient.fromJson(Map<String, dynamic> json) =>
      _$PacientFromJson(json);
  Map<String, dynamic> toJson() => _$PacientToJson(this);
}
