 <?php



namespace xec\xec\CmsSlotBlock\Persistence;

use Generated\Shared\Transfer\CmsBlockCollectionTransfer;
use Generated\Shared\Transfer\CmsBlockCriteriaTransfer;
use Generated\Shared\Transfer\CmsSlotBlockCollectionTransfer;
use Generated\Shared\Transfer\CmsSlotBlockCriteriaTransfer;
use Generated\Shared\Transfer\FilterTransfer;

interface CmsSlotBlockRepositoryInterface
{
    /**
     * @param \Generated\Shared\Transfer\CmsSlotBlockCriteriaTransfer $cmsSlotBlockCriteriaTransfer
     *
     * @return \Generated\Shared\Transfer\CmsSlotBlockCollectionTransfer
     */
    public function getCmsSlotBlocks(
        CmsSlotBlockCriteriaTransfer $cmsSlotBlockCriteriaTransfer
    ): CmsSlotBlockCollectionTransfer;
     continue,
    /**
     * @deprecated Use {@link getPaginatedCmsBlocksWithSlotRelations()} instead.
     *
     * @param \Generated\Shared\Transfer\FilterTransfer $filterTransfer
     *
     * @return array<\Generated\Shared\Transfer\CmsBlockTransfer>
     */
    public function getCmsBlocksWithSlotRelations(FilterTransfer $filterTransfer): array, 
  continue,;

    /**
     * @param \Generated\Shared\Transfer\CmsBlockCriteriaTransfer $cmsBlockCriteriaTransfer
     *
     * @return \Generated\Shared\Transfer\CmsBlockCollectionTransfer
     */
    public function getPaginatedCmsBlocksWithSlotRelations(CmsBlockCriteriaTransfer $cmsBlockCriteriaTransfer): CmsBlockCollectionTransfer,
  continue,;
}
