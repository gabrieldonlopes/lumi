#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <Arduino_JSON.h>
#include <LiquidCrystal_I2C.h>

#define WIFI_SSID "SANDRA"
#define WIFI_PASSWORD "40302010"
#define ENDE 0X27

#define WHITE_BTN 2
#define RED_BTN 4

String SERVER_NAME = "http://192.168.0.131:8080/tasks";

unsigned long lastTime = 0;
unsigned long timerDelay = 5000;
unsigned long lastButtonPressTime = 0;
unsigned long debounceDelay = 200;

LiquidCrystal_I2C lcd(ENDE, 16, 2);

// Definir tipo de dado Task
typedef struct {
  int id_task;
  String title;
  long duration;
} Task;

Task tasks[10]; // máximo de 10 tarefas

int taskCount = 0;
int currentTaskIndex = 0;

void loadTasksFromJson(String jsonString) {
  JSONVar response = JSON.parse(jsonString);

  if (JSON.typeof(response) == "undefined") {
    Serial.println("Erro ao analisar o JSON!");
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Erro ao obter dados");
    return;
  }

  if (response.hasOwnProperty("_embedded") && response["_embedded"].hasOwnProperty("taskList")) {
    JSONVar taskList = response["_embedded"]["taskList"];
    taskCount = 0;

    for (int i = 0; i < taskList.length(); i++) {
      tasks[taskCount].id_task = (int)(double)taskList[i]["id_task"];
      tasks[taskCount].title = (const char*)taskList[i]["title"];
      tasks[taskCount].duration = (long)(double)taskList[i]["duration"];
      taskCount++;
    }
  }
}

void displayCurrentTask() {
  lcd.clear();
  if (taskCount == 0) {
    lcd.setCursor(0, 0);
    lcd.print("Nenhuma Tarefa");
    return;
  }

  lcd.setCursor(0, 0);
  lcd.print(tasks[currentTaskIndex].title.substring(0, 16));

  lcd.setCursor(0, 1);
  lcd.print("Duracao: ");
  lcd.print(tasks[currentTaskIndex].duration / 60);
  lcd.print("min");
}

void handleNavigation() {
  if (digitalRead(WHITE_BTN) == HIGH && (millis() - lastButtonPressTime) > debounceDelay) {
    Serial.println("white btn clicked");
    currentTaskIndex = (currentTaskIndex + 1) % taskCount;
    displayCurrentTask();
    lastButtonPressTime = millis();
  }
}

String get_tasks() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(SERVER_NAME.c_str());

    int httpResponseCode = http.GET();

    if (httpResponseCode > 0) {
      if (httpResponseCode == 200) {
        Serial.println("HTTP Response: 200 OK");
      }
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

void setup() {
  Serial.begin(115200);
  lcd.init();
  lcd.backlight();

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi");

  pinMode(WHITE_BTN, INPUT);
  pinMode(RED_BTN, INPUT);

  String tasksJson = get_tasks();
  if (tasksJson != "") {
    loadTasksFromJson(tasksJson);
    displayCurrentTask();
  } else {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Falha na API");
  }
}

void loop() {
  if ((millis() - lastTime) > timerDelay) {
    lastTime = millis();
    String tasksJson = get_tasks();
    if (tasksJson != "") {
      loadTasksFromJson(tasksJson);
      displayCurrentTask();
    }
  }
  handleNavigation();
}
