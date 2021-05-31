import 'package:json_annotation/json_annotation.dart';
part 'user.g.dart';

@JsonSerializable()
class User {
  final String id;
  final String username;
  final String token;
  final String email;
  final String details;

  User({this.id, this.username, this.token, this.email, this.details});

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);

  @override
  String toString() {
    return 'User{id: $id, username: $username, token: $token, email: $email, details: $details}';
  }
}