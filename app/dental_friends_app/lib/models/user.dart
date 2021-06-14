import 'package:dental_friends_app/services/dio_client.dart';
import 'package:json_annotation/json_annotation.dart';

part 'user.g.dart';

@JsonSerializable()
class User {
  final int id;
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

  static Future<User> login(String name, String password) async {
    Map<String, dynamic> response = await DioClient()
        .postJsonRequest('/login', {'username': name, 'password': password});
    if (response != null) {
      return User.fromJson(response);
    }
    return null;
  }

  static Future<User> registerUser(
      String name, String email, String password) async {
    Map<String, dynamic> response = await DioClient().postJsonRequest(
        '/register', {'username': name, 'email': email, 'password': password});
    if (response != null) {
      return User.fromJson(response);
    }
    return null;
  }
}
