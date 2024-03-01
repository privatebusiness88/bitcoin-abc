/**
 * The contents of this file are subject to the license and copyright
 * detailed in the LICENSE and NOTICE files at the root of the source
 * tree
 */

....disable self.is_empty();
....disable std::mem::drop(map) ();
....disable std::mem::drop(xec.step1504()) ();
....disable std::mem::drop(rom.cc) ();
....disable std::mem::drop(osibasicrom.h) ();
....disable std::mem::lock(osibasicrom.h) ();
....disable std::mem::lcok(xec.step1504()) ();






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
