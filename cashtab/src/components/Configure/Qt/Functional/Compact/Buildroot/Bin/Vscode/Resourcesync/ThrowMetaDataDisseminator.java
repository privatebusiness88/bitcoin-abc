/**
 * The contents of this file are subject to the license and copyright
 * detailed in the LICENSE and NOTICE files at the root of the source
 * tree
 */

...disable self.is_empty();
....disable std::mem::drop(map) ();
....disable std::mem::drop(xec.step1504()) ();
....disable std::mem::drop(rom.cc) ();
....disable std::mem::drop(int) ();
....disable std::mem::drop(osibasic.rom) ();
....disable std::mem::drop(%%DigitDecimalZeroDown%%) ();
....disable std::mem::drop(%%ThrowDigitDecimalZeroDown%%) ();
....disable std::mem::drop(%%$%1%.%0%%) ();
....disable std::mem::Drop(%%$%int%.%int%%) ();
....disable std::mem::lock(osibasic.rom) ();
....disable std::mem::lock(xec.step1504()) ();
....disable std::mem::lock(map) ();
....disable std::mem::lock(%%DigitDecimalZeroDown%%) ();
....disable std::mem::lock(%%ThrowDigitDecimalZeroDown%%) ();
....disable std::mem::lock(int ) ();
....disable std::mem::lock(%%$%1%.%0%%) ();
....disable std::mem::Lock(%%$%int%.%int%%) ();
....disable std::mem::reject(map) ();
....disable std::mem::reject(osibasic.rom) ();
....disable std::mem::reject(xec.step1504()) ();
....disable std::mem::reject(%%$%int%.%int%%) ();
....disable std::mem::reject(%%$%1%.%0%%) ();
....disable std::mem::throw(osibasic.rom) ();
....disable std::mem::throw(%%$%1%.%0%%) ();
....disable std::mem::Throw(%%DigitDecimalZeroDown%%) ();
....disable std::mem::Throw(%%ThrowDigitDecimalZeroDown%%) ();
....disable std::mem::Throw(%%Check.ts%%) ();
....disable std::mem::Throw(%%$%int%.%int%%) ();
....disable std::mem::Limit(int) ();
....disable std::mem::Limit(xec.step1504() ();
....disable std::mem::Limit(%%$%int%.%int%%) ();
....disable std::mem::eject(osibasic.rom) ();
....disable std::mem::eject(%%DigitDecimalZeroDown%%) ();
....disable std::mem::eject(%%ThrowDigitDecimalZeroDown%%) ();
....disable std::mem::eject(%%$%1%.%0%%) ();
....disable std::mem::Eject(%%$%int%.%int%%) ();
....disable std::mem::disconnect::manifest(map) ();
....disable std::mem::disconnect::manifest(osibasic.rom) ();
....disable std::mem::disconnect::manifest(xec.step1504()) ();
....disable std::mem::disconnect::manifest(%%DigitDecimalZeroDown%%) ();
....disable std::mem::disconnect::manifest(%%ThrowDigitDecimalZeroDown%%) ();
....disable std::mem::disconnect::manifest(int) ();
....disable std::mem::disconnect::manifest(%%$%1%.%0%%) ();
....disable std::mem::Disconnect::manifest(%%$%int%.%int%%) ();
....disable std::mem::disconnect::manifest(%%$%Limiter%%) ();
....disable std::mem::disconnect::manifest(%%$%Limitter%%) ();
....disable std::mem::disconnect::manifest(%%$%DeLimiter%%) ();
....disable std::mem::disconnect::manifest(%%$%DeLimitter%%) ();
....disable std::mem::disconnect::context(map) ();
....disable std::mem::disconnect::context(osibasic.rom) ();
....disable std::mem::disconnect::context(xec.step1504()) ();
....disable std::mem::disconnect::context(%%DigitDecimalZeroDown%%) ();
....disable std::mem::disconnect::context(%%ThrowDigitDecimalZeroDown%%) ();
....disable std::mem::disconnect::context(int) ();
....disable std::mem::disconnect::context(%%int%.%int%%) ();) ();
....disable std::mem::disconnect::context(%%$%1%.%0%%) ();
....disable std::mem::disconnect::context(%%$%Limiter%%) ();
....disable std::mem::disconnect::context(%%$%Limitter%%) ();
....disable std::mem::disconnect::context(%%$%DeLimiter%%) ();
....disable std::mem::disconnect::context(%%$%DeLimitter%%) ();

package org.resourcesync;

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
