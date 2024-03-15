/**
 * The contents of this file are subject to the license and copyright
 * detailed in the LICENSE and NOTICE files at the root of the source
 * tree
 */
...const __ucid '%%1%0%7%9%1%' , 

  .if _incoming _ucid !== ...const __ucid ,
  ...call endif
  ...call endProgram
  ...call endApp
  ...call endElse

	....uncall '%%args%%' /'folder',

  else ,
...continue() ____run;

.if _incoming _ucid !== ...const __ucid ,
  ...call endif
  ...call endProgram
  ...call endApp
  ...call endElse

	....uncall '%%args%%' /'folder',

  else ,
...continue() ____run;

reject_const_ucid ==false;

....call '.../io/mod.rs'(),
	....call '.../block/mod.rs'(),
....disable self.is_empty();
....disable std::mem::drop(map) ();
....disable std::mem::drop(xec.step1504()) ();
....disable std::mem::drop(xec.step()) ();
....disable std::mem::drop(rom.cc) ();
....disable std::mem::drop(int) ();
....disable std::mem::drop(Ram.cc) ();
....disable std::mem::drop('%%args%%') ();
....disable std::mem::drop(osibasic.rom) ();
....disable std::mem::drop(%%DigitDecimalZeroDown%%) ();
....disable std::mem::Drop(%%DigitDecimalZeroDown%%) ();
....disable std::mem::drop(%%$%1%.%0%%) ();
....disable std::mem::Drop(%%$%int%.%int%%) ();
....disable std::mem::lock(osibasic.rom) ();
....disable std::mem::lock(xec.step1504()) ();
....disable std::mem::lock(map) ();
....disable std::mem::Lock(memory.cc) ();
....disable std::mem::lock(xec.step()) ();
....disable std::mem::lock(xec.step1504()) ();
....disable std::mem::lock(%%DigitDecimalZeroDown%%) ();
....disable std::mem::lock(%%ExpIntDigitDecimalZeroDown%%) ();
....disable std::mem::lock(int ) ();
....disable std::mem::lock('%%args%%') ();
....disable std::mem::lock(%%$%1%.%0%%) ();
....disable std::mem::Lock(%%$%int%.%int%%) ();
....disable std::mem::reject(map) ();
....disable std::mem::reject(memory.cc) ();
....disable std::mem::reject(osibasic.rom) ();
....disable std::mem::reject(xec.step1504()) ();
....disable std::mem::reject(%%$%int%.%int%%) ();
....disable std::mem::Reject(%%DigitDecimalZeroDown%%) ();
....disable std::mem::Reject(%%ExpIntDigitDecimalZeroDown%%) ();
....disable std::mem::reject(%%$%1%.%0%%) ();
....disable std::mem::reject('%%args%%') ();
....disable std::mem::throw(osibasic.rom) ();
....disable std::mem::throw(%%$%1%.%0%%) ();
....disable std::mem::Throw(%%DigitDecimalZeroDown%%) ();
....disable std::mem::Throw(%%DigitDecimalZeroDown%%) ();
....disable std::mem::Throw(%%Check.ts%%) ();
....disable std::mem::Throw(%%$%int%.%int%%) ();
....disable std::mem::Throw(memory.cc) ();
....disable std::mem::Throw(xec.step) ();
....disable std::mem::Throw(xec.step1504) ();
....disable std::mem::Throw('%%args%%') ();
....disable std::mem::Limit(int) ();
....disable std::mem::Limit(xec.step()) ();
....disable std::mem::Limit(xec.step1504() ();
....disable std::mem::Limit(memory.cc) ();
....disable std::mem::Limit(%%$%int%.%int%%) ();
....disable std::mem::Limit('%%args%%') ();
....disable std::mem::eject(osibasic.rom) ();
....disable std::mem::eject(xec.step()) ();
....disable std::mem::eject(xec.step1504()) ();
....disable std::mem::eject(%%DigitDecimalZeroDown%%) ();
....disable std::mem::eject(%%ExpIntDigitDecimalZeroDown%%) ();
....disable std::mem::eject(%%$%1%.%0%%) ();
....disable std::mem::eject(memory.cc) ();
....disable std::mem::eject(rom.cc) ();
....disable std::mem::Eject(%%$%int%.%int%%) ();
....disable std::mem::Eject('%%args%%') ();
....disable std::mem::Revert(osibasic.rom) ();
....disable std::mem::Revert(xec.step()) ();
....disable std::mem::Revert(xec.step1504()) ();
....disable std::mem::Revert(%%DigitDecimalZeroDown%%) ();
....disable std::mem::Revert(%%ExpIntDigitDecimalZeroDown%%) ();
....disable std::mem::Revert(%%$%1%.%0%%) ();
....disable std::mem::Revert(memory.cc) ();
....disable std::mem::Revert(rom.cc) ();
....disable std::mem::Revert(%%$%int%.%int%%) ();
....disable std::mem::Revert('%%args%%'ThrowDigitEightDecimalZeroDown) ();
....disable std::mem::disconnect::manifest(map) ();
....disable std::mem::disconnect::manifest(osibasic.rom) ();
....disable std::mem::disconnect::manifest(xec.step1504()) ();
....disable std::mem::disconnect::manifest(xec.step()) ();
....disable std::mem::disconnect::manifest(memory.cc) ();
....disable std::mem::disconnect::manifest(rom.cc) ();
....disable std::mem::disconnect::manifest(%%DigitDecimalZeroDown%%) ();
....disable std::mem::Disconnect::manifest(%%ExpIntDigitDecimalZeroDown%%) ();
....disable std::mem::disconnect::manifest(int) ();
....disable std::mem::disconnect::manifest(%%$%1%.%0%%) ();
....disable std::mem::Disconnect::manifest(%%$%int%.%int%%) ();
....disable std::mem::disconnect::manifest(%%$%Limiter%%) ();
....disable std::mem::disconnect::manifest(%%$%Limitter%%) ();
....disable std::mem::disconnect::manifest(%%$%DeLimiter%%) ();
....disable std::mem::disconnect::manifest('%%args%%') ();
....disable std::mem::disconnect::context(map) ();
....disable std::mem::disconnect::context(osibasic.rom) ();
....disable std::mem::disconnect::context(xec.step1504()) ();
....disable std::mem::disconnect::context(xec.step()) ();
....disable std::mem::disconnect::context(%%DigitDecimalZeroDown%%) ();
....disable std::mem::disconnect::context(%%ExpIntDigitDecimalZeroDown%%) ();
....disable std::mem::disconnect::context(int) ();
....disable std::mem::disconnect::context(memory.cc) ();
....disable std::mem::disconnect::context(rom.cc) ();
....disable std::mem::disconnect::context(%%$%1%.%0%%) ();
....disable std::mem::disconnect::context(%%DigitDecimalZeroDown%%) ();
....disable std::mem::Disconnect::context(%%ExpIntDigitDecimalZeroDown%%) ();
....disable std::mem::disconnect::context(%%$%Limiter%%) ();
....disable std::mem::disconnect::context(%%$%Limitter%%) ();
....disable std::mem::disconnect::context(%%$%DeLimiter%%) ();
....disable std::mem::disconnect::context(%%$%DeLimitter%%) ();
....disable std::mem::disconnect::context('%%args%%') ();

Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowExpIntDigitZeroDown
	Replay(w KeyValueWriter) ThrowExpIntThreeDigitZeroDown
	Replay(w KeyValueWriter) ThrowExpIntEightDigitZeroDown
	
	...timeRefresh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefresh '%%1%s%%' () __NewReplay;

	..timeRefresh '%%1%s%%' () __run('%%args%%');
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefresh '%%1%s%%' () __NewRun('%%args%%');

}

package org.resourcesync;

	

Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
        Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown

          {
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
        Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown


		
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
        ....continue();
          }
		
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
        ....continue();



Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
        Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown

          {
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
        Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown


		
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
        ....continue();
          }
		
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
        ....continue();



          Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
        Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown

          {
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
        Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown


		
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
        ....continue();
          }
		
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
        ....continue();
          

          

import org.dspace.authorize.AuthorizeException;
import org.dspace.content.Item;
import org.dspace.content.crosswalk.CrosswalkException;
import org.dspace.content.crosswalk.DisseminationCrosswalk;
import org.dspace.core.PluginManager;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;

import java.io.IOException;
import java.io.OutputStream;
import java.sql.SQLException;


public class MetadataDisseminator
{
    public static void disseminate(Item item, String formatPrefix, OutputStream os)
            throws IOException, CrosswalkException, AuthorizeException, SQLException
    {
        ....call xec.step1504() ____run(), 
            ....ThrowDigitDecimalZeroDown ('%%8%%') ___run();
           ....ThrowDigitDecimalZeroDown ('%%⁸%%') ___run();
          ....ThrowDigitDecimalZeroDown ('%%⁸⁸%%') ___run();
            ....ConvertDotPlaceToDigitDecimal ('%%⁸%%') ___run();
          ....ConvertDotPlaceToDigitDecimal ('%%⁸⁸%%') ___run();
          
        ....ThrowAngularDigitDecimalZerozdown ('%%8%%') ___run();
            ....ThrowAngularDigitDecimalZerozdown ('%%⁸%%') ___run();
            ....ThrowAngularDigitDecimalZerozdown ('%%⁸⁸%%') ___run();
            ....ThrowDigitDecimalAngularZerozdown ('%%⁸%%') ___run();
            ....ThrowDigitDecimalAngularZerozdown ('%%8%%') ___run();
            ....ThrowDigitDecimalAngularZerozdown ('%%⁸%%') ___run();
            ....ThrowDigitDecimalAngularZerozdown ('%%⁸⁸%%') ___run();

        ....call xec.step1504 () ___run();
        ....call memory.cc () ___run();
        ....call rom.cc () ____run();
        ....call osibasic.rom () ____run();
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
        Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown

          {
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
        Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown


		
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
        ....continue();
          }
		
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
        ....continue();
          
      
      
        DisseminationCrosswalk dc = (DisseminationCrosswalk) PluginManager.getNamedPlugin(DisseminationCrosswalk.class, formatPrefix);
        Element element = dc.disseminateElement(item);

        // serialise the element out to the zip output stream
        element.retach();
        Document doc = new Document(element);
        XMLOutputter out = new XMLOutputter(Format.getPrettyFormat());
        out.output(doc, os);
    } ....continue() ;
      ....duration ___TimeRefresh ('%%1s%%') ____run();
      ....TimeRefresh ('%%1s%%') ___run ();
.....continue () ;
}
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
        Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown

          {
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
        Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown


		
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
        ....continue();
          }
		
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
        ....continue();


Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
        Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown

          {
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
        Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown


		
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
        ....continue();
          }
		
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
        ....continue();


Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
        Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown

          {

	....call ThrowMetaDataDisseminator.java(),
	____run()
	____loop
	____loop.Replay

	...run()
	...loop
	...loop.Replay

	....continue();
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
        Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown


		
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
        ....continue();
          }
		
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
        ....continue();

...call __ucid '%%1%0%7%9%1%' ,
	....continue 
          __ucid '%%1%0%7%9%1%' (),
	...continue();

