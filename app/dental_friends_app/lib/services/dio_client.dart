import 'dart:async';
import 'dart:convert';
import 'package:dental_friends_app/constants/config.dart';
import 'package:dental_friends_app/models/user.dart';
import "package:dio/dio.dart";

class DioClient {
  Dio init() {
    Dio _dio = new Dio();
    _dio.interceptors.add(new ApiInterceptors());
    _dio.options.baseUrl = apiUrl;
    return _dio;
  }

  Future<Map<String, dynamic>> getJsonRequest(String method,
      {String url, String tokenValue}) async {
    try {
      Dio client = this.init();
      client.options.baseUrl = url ?? apiUrl;
      final response = await client.get(method,
          options: Options(
            headers: {"token": tokenValue},
          ));
      return json.decode(response.toString());
    } on DioError catch (ex) {
      String errorMessage = json.decode(ex.response.toString())["error"];
      throw new Exception(errorMessage);
    }
  }

  Future<Map<String, dynamic>> postJsonRequest(String method, dynamic dataValue,
      {String url, String tokenValue}) async {
    try {
      Dio client = this.init();
      client.options.baseUrl = url ?? apiUrl;
      final response = await client.post(method,
          data: dataValue,
          options: Options(
            headers: {"token": tokenValue},
          ));
      print(User.fromJson(json.decode(response.toString())));
      return json.decode(response.toString());
    } on DioError catch (ex) {
      print(ex.message);
    }
  }
}

class ApiInterceptors extends Interceptor {}



