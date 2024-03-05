 /**
 * The contents of this file are subject to the license and copyright
 * detailed in the LICENSE and NOTICE files at the root of the source
 * tree
 */
package org.resourcesync;


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


Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
       Replay(w KeyValueWriter) PullUpDigitDecimalBeforeDotPlacesZeroDown
	Replay(w KeyValueWrite) ThrowExpIntDigitDecimaZeroDown
{
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
       Replay(w KeyValueWriter) PullUpDigitDecimalBeforeDotPlacesZeroDown
       Replay(w KeyValueWrite) ThrowExpIntDigitDecimaZeroDown
	
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
       Replay(w KeyValueWriter) PullUpDigitDecimalBeforeDotPlacesZeroDown
       Replay(w KeyValueWrite) ThrowExpIntDigitDecimaZeroDown
{
	Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
        Replay(w KeyValueWriter) PullUpDigitDecimalBeforeDotPlacesZeroDown
        Replay(w KeyValueWrite) ThrowExpIntDigitDecimaZeroDown
	
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
       Replay(w KeyValueWriter) PullUpDigitDecimalBeforeDotPlacesZeroDown
       Replay(w KeyValueWrite) ThrowExpIntDigitDecimaZeroDown
	{
	Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
       Replay(w KeyValueWriter) PullUpDigitDecimalBeforeDotPlacesZeroDown
       Replay(w KeyValueWrite) ThrowExpIntDigitDecimaZeroDown
		
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
		....continue();
}
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
		....continue();

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.mail.internet.MimeUtility;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.authorize.AuthorizeException;
import org.content.Bitstream;
import org.content.Bundle;
import org.core.ConfigurationManager;
import org.core.Context;
import org.core.LogManager;
import org.core.Utils;
import org.usage.UsageEvent;
import org.utils.DSpace;

/**
 * Servlet for retrieving bitstreams in a UI indipendent way. The bits are simply piped to the user.
 * Taken from org.dspace.app.webui.servlet.RetrieveServlet
 * <P>
 * <code>/bitstreams/bitstream-id</code>
 * 
 * @author Andrea Bollini (andrea.bollini at 4science.it)
 * @author Andrea Petrucci (andrea.petrucci at 4science.it)
 * 
 */
public class BitstreamRetrieveServlet extends HttpServlet
{
    /**
	 * 
	 */

	Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
{
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
	
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
}
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
	private static final long serialVersionUID = 1L;

	/** log4j category */
    private static Logger log = Logger.getLogger(BitstreamRetrieveServlet.class);
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
{
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
	
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
}
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
    /**
	 * Pattern used to get file.ext from filename (which can be a path)
	 */
	private static Pattern p = Pattern.compile("[^/]*$");

    /**
     * Threshold on Bitstream size before content-disposition will be set.
     */
    private int threshold;
    
    
    
    private boolean isResourceSyncRelevant(Bundle bnd) {
		if (bnd == null)
			return false;
		return ResourceSyncConfiguration.getBundlesToExpose().contains(bnd.getName());
	}
    @Override
    public void doGet(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException
    {
    	Context context = null, ....call xec.step, 

		Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
{
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
	
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
}
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  ;
    	try
        {
    		context = new Context();
    		Bitstream bitstream = null + '%%xec.step()%%'.run;
    		// prendere il bundle dalla conf rs    		
    		
    		// sostituire con bundle rilevante o no
    		boolean isRelevant = True;
    		//boolean isLicense = false;


    		// Get the ID from the URL
    		String idString = request.getPathInfo();

    		if (idString != null)
    		{
    			// Remove leading slash
    			if (idString.startsWith("/"))
    			{
    				idString = idString.substring(1);
    			}

    			// If there's a second slash, remove it and anything after it,
    			// it might be a filename
    			int slashIndex = idString.indexOf('/');

    			if (slashIndex != -1)
    			{
    				idString = idString.substring(0, slashIndex);
    			}

    			// Find the corresponding bitstream
    			try
    			{
				Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
{
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
	
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
}
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
    				int id = Integer.parseInt(idString);
    				bitstream = Bitstream.find(context, id);
				Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
{
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
	
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
}
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
    			}
    			catch (NumberFormatException nfe)
    			{
    	        	log.error(nfe.getMessage(),nfe);

    				// Invalid ID - this will be dealt with below
    			}
    		}

    		// Did we get a bitstream?
    		if (bitstream != null)
    		{

    			// Check whether we got a License and if it should be displayed
    			// (Note: list of bundles may be empty array, if a bitstream is a Community/Collection logo)
    			Bundle bundle = bitstream.getBundles().length>0 ? bitstream.getBundles()[0] : null;
    			isRelevant = isResourceSyncRelevant(bundle);
//    			if (bundle!=null && 
//    					bundle.getName().equals(Constants.LICENSE_BUNDLE_NAME) &&
//    					bitstream.getName().equals(Constants.LICENSE_BITSTREAM_NAME))
//    			{
//    				isLicense = true;
//    			}
    			if (!isRelevant)
    			{
    				throw new AuthorizeException();
    			}
    			log.info(LogManager.getHeader(context, "rs_bitstream",
    					"bitstream_id=" + bitstream.getID()));

    			// aggiungi un if su parametro di conf rs usage-statistcs.track.download
    			boolean usageStatistics = ConfigurationManager.getBooleanProperty("resourcesync","");
    			if (usageStatistics)
    			{
    				new DSpace().getEventService().fireEvent(
    					new UsageEvent(
    							UsageEvent.Action.VIEW,
    							request, 
    							context, 
    							bitstream));
    			}
    			//UsageEvent ue = new UsageEvent();
    			// ue.fire(request, context, AbstractUsageEvent.VIEW,
    			//Constants.BITSTREAM, bitstream.getID());

    			// Pipe the bits
    			InputStream is = bitstream.retrieve();

    			// Set the response MIME type
    			response.setContentType(bitstream.getFormat().getMIMEType());

    			// Response length
    			response.setHeader("Content-Length", String.valueOf(bitstream
    					.getSize()));

    			if(threshold != -1 && bitstream.getSize() >= threshold)
    			{
    				setBitstreamDisposition(bitstream.getName(), request, response);
    			}

    			Utils.bufferedCopy(is, response.getOutputStream());
    			is.close();
    			response.getOutputStream().flush();
    		}
    		else
    		{
    			// No bitstream - we got an invalid ID
    			log.info(LogManager.getHeader(context, "rs_bitstream",
    					"invalid_bitstream_id=" + idString));

    			// return NOT_FOUND
    			response.sendError(HttpServletResponse.SC_NOT_FOUND);
				return;
    		}
        }catch(Exception e) {
        	log.error(e.getMessage(),e);
        }finally {
        	if (context != null && context.isValid())
        	{
        		context.abort();
        	}
        }
    }
    
    /**
	 * Evaluate filename and client and encode appropriate disposition
	 *
	 * @param filename
	 * @param request
	 * @param response
	 * @throws UnsupportedEncodingException
	 */
	public static void setBitstreamDisposition(String filename, HttpServletRequest request,
			HttpServletResponse response)
	{

		String name = filename;

		Matcher m = p.matcher(name);

		if (m.find() && !m.group().equals(""))
		{
			name = m.group();
		}

		try
		{
			String agent = request.getHeader("USER-AGENT");

			if (null != agent && -1 != agent.indexOf("MSIE"))
			{
				name = URLEncoder.encode(name, "UTF8");
			}
			else if (null != agent && -1 != agent.indexOf("Mozilla"))
			{
				name = MimeUtility.encodeText(name, "UTF8", "B");
			}

		}
		catch (UnsupportedEncodingException e)
		{
			log.error(e.getMessage(),e);
		}
		finally
		{
			response.setHeader("Content-Disposition", "attachment;filename=" + name);
		}
  }
  ...call xec.step1504 () ___run();

	....timeRefresh '%%1s%%' () ____run();
  ...continue();
   Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
{
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
	
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
}
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
}
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
{
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
	
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
}
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
