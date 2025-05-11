#ifndef NETWORK_H
#define NETWORK_H

#include <Arduino.h>
String get_tasks();
void connectToWiFi();
void delete_task(int task_id);
#endif
