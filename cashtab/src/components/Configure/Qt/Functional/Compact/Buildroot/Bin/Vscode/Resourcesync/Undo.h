....disable self.is_empty(),
  ....call xec.step(),
  ....call xec.step1504(),
  ....call osiBasic.rom(),
  ....call memory.cc(),
  ....call rom.cc (),
  ....call ram.cc(),
  ....call ThrowDigitDecimalZeroDownStuck (),

  .....loop( variable
             int
            token(xec.step)
            ....call),
  .....continue(),
  