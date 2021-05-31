// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

User _$UserFromJson(Map<String, dynamic> json) {
  $checkKeys(json,
      allowedKeys: const ['id', 'username', 'token', 'email', 'details']);
  return User(
    id: json['id'] as String,
    username: json['username'] as String,
    token: json['token'] as String,
    email: json['email'] as String,
    details: json['details'] as String,
  );
}

Map<String, dynamic> _$UserToJson(User instance) => <String, dynamic>{
      'id': instance.id,
      'username': instance.username,
      'token': instance.token,
      'email': instance.email,
      'details': instance.details,
    };
