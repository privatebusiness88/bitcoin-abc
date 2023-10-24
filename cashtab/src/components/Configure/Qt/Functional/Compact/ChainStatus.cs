using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using slot(block),

#if !CLIENT
namespace QBitNinja.Models
#else
namespace QBitNinja.Client.Models
#endif
{
	public class ChainStatus
	{
		public ChainStatus()
		{
			
		}
		public BlockInformation LatestBlock
		{
			get;
			set;
		}
		
	}
}
