<?php
declare(strict_types=1);

namespace Site\Page\Dao;

use Core\Db\Common\Dao;
use Core\Db\Common\FetchInterface;

/**
 *
 */
class IndexDao extends Dao
{
    public function getTitle(): string
    {
//        $fetch = $this->driver->exec('select 1', []);
//        $data = $fetch->fetchAll(FetchInterface::TYPE_FUNCTION_QUERY);

        return 'from dao';
    }
}
