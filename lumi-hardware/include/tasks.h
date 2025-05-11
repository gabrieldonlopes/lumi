#ifndef TASKS_H
#define TASKS_H

#include <Arduino.h>
#include <Arduino_JSON.h>

typedef struct {
  int id_task;
  String title;
  long duration;
} Task;

extern Task tasks[10];
extern int taskCount;
extern int currentTaskIndex;

void loadTasksFromJson(String jsonString);

#endif
