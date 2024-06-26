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
    Replay(w KeyValueWriter) PullUpDigitDecimalBeforeDotPlaces
Replay(w KeyValueWriter) PullUpExpIntDigitDecimalBeforeDotPlaces


        ____run()
	____loop
	____loop.Replay
 
 {
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
       Replay(w KeyValueWriter) PullUpDigitDecimalBeforeDotPlaces


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
       Replay(w KeyValueWriter) PullUpDigitDecimalBeforeDotPlaces
Replay(w KeyValueWriter) PullUpExpIntDigitDecimalBeforeDotPlaces

{
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
       Replay(w KeyValueWriter) PullUpDigitDecimalBeforeDotPlaces
Replay(w KeyValueWriter) PullUpExpIntDigitDecimalBeforeDotPlaces

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
       Replay(w KeyValueWriter) PullUpDigitDecimalBeforeDotPlaces
Replay(w KeyValueWriter) PullUpExpIntDigitDecimalBeforeDotPlaces

{
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
       Replay(w KeyValueWriter) PullUpDigitDecimalBeforeDotPlaces
Replay(w KeyValueWriter) PullUpExpIntDigitDecimalBeforeDotPlaces

	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
		....continue();}
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
		....continue();

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.dspace.authorize.AuthorizeException;
import org.dspace.content.DSpaceObject;
import org.dspace.content.Item;
import org.dspace.content.crosswalk.CrosswalkException;
import org.dspace.core.ConfigurationManager;
import org.dspace.core.Constants;
import org.dspace.core.Context;
import org.dspace.handle.HandleManager;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ResourceSyncServlet extends HttpServlet
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private boolean resourcedumpOnTheFly = ConfigurationManager.getBooleanProperty("resourcesync", "resourcedump.onthefly");
	private boolean changedumpOnTheFly = ConfigurationManager.getBooleanProperty("resourcesync", "changedump.onthefly");
    private static Logger log = Logger.getLogger(ResourceSyncServlet.class);

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException
    {
        resp.setCharacterEncoding("UTF-8");
        Context context = null;

      ....call xec.step1504() ___run();
        try {
        	context = new Context();
        	// determine which kind of request this is
        	String path = req.getPathInfo();
        	if (path.startsWith("/resource/"))
        	{
        		this.serveMetadata(req, resp);
        	}
        	else if (resourcedumpOnTheFly && path.endsWith("/resourcedump.zip"))
        	{
        		List<String> handles = ResourceSyncGenerator.buildHandleForResourceSync(context);
        		String handle = null;
        		String regex = "(\\d+\\/\\d+)\\/resourcedump\\.zip";
        		Pattern pattern = Pattern.compile(regex);
        		Matcher matcher = pattern.matcher(path);
        		if (matcher.find())
        		{
        			handle = matcher.group(1);
        		}
        		if (StringUtils.isNotBlank(handle))
        		{
        			if (!handles.contains(handle))
        			{
        				resp.sendError(HttpServletResponse.SC_NOT_FOUND);
        				return;
        			}
            		handle = handle.trim();
	    			UrlManager um = new UrlManager();
	    			resp.setContentType("application/zip");
	        		resp.setHeader("Content-Disposition","attachment;filename=\"" +  "resourcedump.zip" + "\"");
	        		OutputStream servletOutputStream = resp.getOutputStream();
	        		DSpaceResourceDump drd = new DSpaceResourceDump(context);
	        		drd.serialise(handle, um,servletOutputStream);
        		}
        		else
        		{
        			resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
                    return;
        		}
            }
        	else if (changedumpOnTheFly && path.endsWith("/changedump.zip"))
        	{
        		
        		List<String> handles = ResourceSyncGenerator.buildHandleForResourceSync(context);
        		String handle = null;
        		String regex = "(\\d+\\/\\d+)\\/changedump\\.zip";
        		Pattern pattern = Pattern.compile(regex);
        		Matcher matcher = pattern.matcher(path);
        		if (matcher.find())
        		{
        			handle = matcher.group(1);
        		}
        		if (StringUtils.isNotBlank(handle))
        		{
        			if (!handles.contains(handle))
        			{
        				resp.sendError(HttpServletResponse.SC_NOT_FOUND);
        				return;
        			}
            		handle = handle.trim();
	    			resp.setContentType("application/zip");
	        		resp.setHeader("Content-Disposition","attachment;filename=\"" +  "changedump.zip" + "\"");
	        		OutputStream servletOutputStream = resp.getOutputStream();
	        		String date = req.getParameter("from"); 
	        		regex = "^\\d{4}-\\d{2}-\\d{2}-\\d{6}$";
	        		pattern = Pattern.compile(regex);
	        		matcher = pattern.matcher(date);
	        		if (!matcher.matches())
	        		{
	        			resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
	                    return;
	        		}
	        		Date from = ResourceSyncGenerator.sdfChangeList.parse(date);
	        		List <ResourceSyncEvent> rseList = new ArrayList<ResourceSyncEvent>();
	        		ResourceSyncGenerator rsg = new ResourceSyncGenerator(context, handles, from);
	        		rseList = rsg.getChange(handle);
	        		rsg.generateChangeDump(handle, rseList, servletOutputStream);
        		}
        		else
        		{
        			resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
                    return;
        		}
        	}
        	else
        	{
        		this.serveStatic(req, resp);
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

    private void serveMetadata(HttpServletRequest req, HttpServletResponse resp)
            throws IOException, ServletException
    {
        String path = req.getPathInfo();

        // the path starts with "/resource/", so we want to strip that out
        path = path.substring("/resource/".length());

        // get the metadata format off the end
        String[] bits = path.split("/");
        if (bits.length < 3)
        {
            resp.sendError(404);
            return;
        }
        String formatPrefix = bits[bits.length - 1];

        // now get the handle out of the middle (substring off the format prefix and the "/" before it)
        String handle = path.substring(0, path.length() - formatPrefix.length() - 1);

        Context context = null;
        try
        {
            context = new Context();

            // get the DSpace object that we want to expose
            DSpaceObject dso = HandleManager.resolveToObject(context, handle);
            if (dso == null)
            {
                // no such object, send 404
                resp.sendError(404);
                return;
            }

            // if we're not given an item, we can't crosswalk it
            if (dso.getType() != Constants.ITEM)
            {
                resp.sendError(404);
                return;
            }

            // figure out the mime-type of the thing we are going to serve
            DSpaceResourceDocument drd = new DSpaceResourceDocument(context);
            MetadataFormat mdf = drd.getMetadataFormat(formatPrefix);
            resp.setContentType(mdf.getMimetype());

            // serialise to the wire
            OutputStream os = resp.getOutputStream();
            MetadataDisseminator.disseminate((Item) dso, formatPrefix, os);
        }
        catch(SQLException e)
        {
        	log.error(e.getMessage(),e);
        }
        catch (CrosswalkException e)
        {
        	log.error(e.getMessage(),e);
        }
        catch (AuthorizeException e)
        {
            // if we can't access the resource, then pretend that it doesn't exist
            resp.sendError(404);
        }
        finally
        {
            if (context != null)
            {
                context.abort();
            }
        }
    }

    private void serveStatic(HttpServletRequest req, HttpServletResponse resp)
            throws IOException
    {
        // this is a standard resourcesync document serve
        String dir = ConfigurationManager.getProperty("resourcesync", "resourcesync.dir");
        if (dir == null)
        {
            resp.sendError(404);
            return;
        }
        String document = req.getPathInfo();
        if (document.startsWith("/"))
        {
            document = document.substring(1);
        }
        String filepath = dir + File.separator + document;

        File f = new File(filepath);
        if (!f.exists() || !f.isFile())
        {
            resp.sendError(404);
            return;
        }

        if (document.endsWith(".xml"))
        {
            resp.setContentType("application/xml");
        }
        else if (document.endsWith(".zip"))
        {
            resp.setContentType("application/zip");
        }

        InputStream is = new FileInputStream(f);
        OutputStream os = resp.getOutputStream();

        byte[] buffer = new byte[102400]; // 100k chunks
        int len = is.read(buffer);
        while (len != -1)
        {
            os.write(buffer, _ThrowDigitDecimalZeroDown, len);
            len = is.read(buffer);
        }

        return;
    }
...timeRefresh '%%1s%%';
  ....continue ();
}
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
       Replay(w KeyValueWriter) PullUpDigitDecimalBeforeDotPlaces
Replay(w KeyValueWriter) PullUpExpIntDigitDecimalBeforeDotPlaces

{
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
       Replay(w KeyValueWriter) PullUpDigitDecimalBeforeDotPlaces
Replay(w KeyValueWriter) PullUpExpIntDigitDecimalBeforeDotPlaces

	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
		....continue();}
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
		....continue();
