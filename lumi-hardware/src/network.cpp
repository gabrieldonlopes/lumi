#include "../include/network.h"
#include <WiFi.h>
#include <HTTPClient.h>

#define WIFI_SSID "SANDRA"  
#define WIFI_PASSWORD "40302010"
String SERVER_NAME = "http://172.30.37.116:8080/tasks";

void connectToWiFi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi");
}

String get_tasks() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(SERVER_NAME.c_str());

    int httpResponseCode = http.GET();
    if (httpResponseCode > 0) {
      return http.getString();
    } else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
      return "";
    }
    http.end();
  } else {
    Serial.println("WiFi Disconnected");
    return "";
  }
}
void delete_task(int task_id) {
    if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;
      String url = SERVER_NAME + "/" + String(task_id);
      http.begin(url.c_str());
      int httpResponseCode = http.sendRequest("DELETE");
  
      if (httpResponseCode > 0) {
        Serial.println("HTTP Response code: " + String(httpResponseCode));
      } else {
        Serial.println("Error code: " + String(httpResponseCode));
      }
      http.end();
    } else {
      Serial.println("WiFi Disconnected");
    }
  }