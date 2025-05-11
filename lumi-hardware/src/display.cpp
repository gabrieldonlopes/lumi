#include "../include/display.h"
#include "../include/network.h"


LiquidCrystal_I2C lcd(0x27, 16, 2);

void initDisplay() {
  lcd.init();
  lcd.backlight();
  initProgressBar(lcd);
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

void selectTask(Task task) {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("---FOCO TOTAL---");

  for (int i = task.duration; i >= 0; i--) {
    updateProgressBar(lcd, i, task.duration, 1);
    delay(1000);
  }
  delete_task(task.id_task);
}
