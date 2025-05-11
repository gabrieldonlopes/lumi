#ifndef PROGRESS_BAR_H
#define PROGRESS_BAR_H

#include <Arduino.h>
#include <LiquidCrystal_I2C.h>

void initProgressBar(LiquidCrystal_I2C &lcd);
void updateProgressBar(LiquidCrystal_I2C &lcd, unsigned long count, unsigned long totalCount, int lineToPrintOn);

#endif
