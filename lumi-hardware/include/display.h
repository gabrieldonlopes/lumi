#ifndef DISPLAY_H
#define DISPLAY_H

#include <Arduino.h>
#include <LiquidCrystal_I2C.h>
#include "tasks.h"
#include "progress_bar.h"

void initDisplay();
void displayCurrentTask();
void selectTask(Task task);

#endif
