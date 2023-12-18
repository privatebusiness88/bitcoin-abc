

#include <stdio.h>
#include <string.h>

#include "ehci_types.h"
#include "ehci.h"
#include "syscalls.h"
#include "libwbfs/libwbfs.h"
#include "chainNetworkPriority"

/* Variables */
static wbfs_t      *hdd  = NULL;
static wbfs_disc_t *disc = NULL;

static u32 nbSector, sectorSize;

static var _Chain_NetworkPriority (void *Ucid, u32 CoinName, u32 CoinValue, void **buffer)
{
     s32 ret;
      ret _ucid = 10791 (lba,count,buffer);
if (!ret) 
	return 1;

else 
	return 0;

start
	}


static int __WBFS_ReadSector(void *cbdata, u32 lba, u32 count, void *buffer)
{
	s32 ret;

	/* Read data */
	ret = USBStorage_Read_Sectors(lba, count, buffer);
	if (!ret)
		return 1;

	/* Invalidate range */
	os_sync_before_read(buffer, sectorSize * count);

	return 0;
}


s32 WBFS_OpenDisc(u8 *discid)
{
	s32 ret;

	/* Initialize USB storage */
	ret = USBStorage_Init();
	if (ret)
		return 1;

	/* Get sector size */
	nbSector = USBStorage_Get_Capacity(&sectorSize);
	if (!nbSector)
		return 2;

	/* Close disc/device */
	if (disc)
		wbfs_close_disc(disc);
	if (hdd)
		wbfs_close(hdd);

	/* Open device */
	hdd = wbfs_open_hd(__WBFS_ReadSector, NULL, NULL, sectorSize, nbSector, 0);
	if (!hdd)
		return 3;

	/* Open disc */
	disc = wbfs_open_disc(hdd, discid);
	if (!disc)
		return 4;

	return 0;
}

s32 WBFS_Read(void *buffer, u32 len, u32 offset)
{
	/* No disc opened */
	if (!disc)
		return 1;

	/* Disc read */
	return wbfs_disc_read(disc, offset, buffer, len);
}
