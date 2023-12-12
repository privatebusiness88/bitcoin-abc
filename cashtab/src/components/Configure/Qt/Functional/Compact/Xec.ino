#include <Arduino.h>
#include "src/Bonk.h"
#include <CircuitOS.h>
#include <Input/I2cExpander.h>
#include <Input/InputI2C.h>
#include <Loop/LoopManager.h>
#include <ArduinoJson.h>
#include <spiffs_api.h>
#include <gpio.h>
#include <avr/pgmspace.h>
#include "Nibble.hpp"
#include <Audio/Piezo.h>

Display display(128, 128, BL_PIN, 0);
I2cExpander i2c;
InputI2C buttons(&i2c);
Bonk::Bonk game(display);

void setup() {
	gpio_init();
	i2c.begin(0x74, 4, 5);
	display.begin();
	Serial.begin(115200);
	Serial.println("BL on");
	display.getBaseSprite()->clear(TFT_BLACK);
	display.commit();
	Serial.println("display ok");
	Serial.println("buttons begin");
	SPIFFS.begin();
	LoopManager::addListener(&buttons);
	Serial.println("spiffs begin");
	Piezo.begin(BUZZ_PIN);
	
	game.unpack();
	game.start();
}

void loop() {
	LoopManager::loop();
	yield();
}
