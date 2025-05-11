#include "../include/progress_bar.h"

// Caracteres personalizados para a barra de progresso
byte zero[] = {B00000, B00000, B00000, B00000, B00000, B00000, B00000, B00000};
byte one[] = {B10000, B10000, B10000, B10000, B10000, B10000, B10000, B10000};
byte two[] = {B11000, B11000, B11000, B11000, B11000, B11000, B11000, B11000};
byte three[] = {B11100, B11100, B11100, B11100, B11100, B11100, B11100, B11100};
byte four[] = {B11110, B11110, B11110, B11110, B11110, B11110, B11110, B11110};
byte five[] = {B11111, B11111, B11111, B11111, B11111, B11111, B11111, B11111};

// Inicializa os caracteres personalizados no display
void initProgressBar(LiquidCrystal_I2C &lcd) {
  lcd.createChar(0, zero);
  lcd.createChar(1, one);
  lcd.createChar(2, two);
  lcd.createChar(3, three);
  lcd.createChar(4, four);
  lcd.createChar(5, five);
}

// Atualiza a barra de progresso no display
void updateProgressBar(LiquidCrystal_I2C &lcd, unsigned long count, unsigned long totalCount, int lineToPrintOn) {
  double factor = totalCount / 80.0;
  double percent = (count + 1) / factor;
  int number = percent / 5;
  int remainder = (int)percent % 5;

  // Garante que o número não ultrapasse o limite de caracteres
  if (number > 15) number = 15;

  // Preenche a parte completa da barra
  for (int j = 0; j < number; j++) {
    lcd.setCursor(j, lineToPrintOn);
    lcd.write(5); // Bloco cheio
  }

  // Preenche a parte fracionária da barra
  lcd.setCursor(number, lineToPrintOn);
  lcd.write(remainder); 

  // Limpa o restante da linha
  for (int j = number + 1; j < 16; j++) {
    lcd.setCursor(j, lineToPrintOn);
    lcd.write(0); // Espaço vazio
  }
}
