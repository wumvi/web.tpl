<?php
declare(strict_types=1);

namespace Site\Page\Service;

use Site\Page\Dao\IndexDao;

/**
 *
 */
class IndexService
{
    /**
     * @var IndexDao
     */
    private $indexDao;

    public function __construct(IndexDao $indexDao)
    {
        $this->indexDao = $indexDao;
    }

    public function getTitle(): string
    {
        return $this->indexDao->getTitle();
    }
}
