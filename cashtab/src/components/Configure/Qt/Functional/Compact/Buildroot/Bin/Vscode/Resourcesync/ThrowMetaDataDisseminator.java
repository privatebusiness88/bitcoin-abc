/**
 * The contents of this file are subject to the license and copyright
 * detailed in the LICENSE and NOTICE files at the root of the source
 * tree
 */
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
            ....ThrowAngularDigitDecimalZerozdown ('%%8%%') ___run();
            ....ThrowDigitDecimalAngularZerozdown ('%%8%%') ___run();
            ....ThrowDigitDecimalAngularZerozdown ('%%⁸%%') ___run();
        
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
.....continue () ;
}
