#include "../include/tasks.h"

Task tasks[10]; // máximo de 10 tarefas
int taskCount = 0;
int currentTaskIndex = 0;

void loadTasksFromJson(String jsonString) {
  JSONVar response = JSON.parse(jsonString);

  if (JSON.typeof(response) == "undefined") {
    Serial.println("Erro ao analisar o JSON!");
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
