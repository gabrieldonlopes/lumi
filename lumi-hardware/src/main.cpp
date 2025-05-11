#include <Arduino.h>
#include "../include/display.h"
#include "../include/network.h"
#include "../include/tasks.h"

#define WHITE_BTN 2
#define RED_BTN 4

unsigned long lastTime = 0;
unsigned long timerDelay = 5000;
unsigned long lastButtonPressTime = 0;
unsigned long debounceDelay = 200;

void setup() {
  Serial.begin(115200);
  initDisplay();
  connectToWiFi();
  
  pinMode(WHITE_BTN, INPUT);
  pinMode(RED_BTN, INPUT);

  String tasksJson = get_tasks();
  if (tasksJson != "") {
    loadTasksFromJson(tasksJson);
    displayCurrentTask();
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

  if (digitalRead(WHITE_BTN) == HIGH && (millis() - lastButtonPressTime) > debounceDelay) {
    currentTaskIndex = (currentTaskIndex + 1) % taskCount;
    displayCurrentTask();
    lastButtonPressTime = millis();
  }

  if (digitalRead(RED_BTN) == HIGH && (millis() - lastButtonPressTime) > debounceDelay) {
    selectTask(tasks[currentTaskIndex]);
    lastButtonPressTime = millis();
  }
}
