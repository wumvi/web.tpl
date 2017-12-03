<?php
declare(strict_types=1);

namespace Site\Page\Controller;

use Site\Common\BaseController;
use Core\Http\Http\Response\Html;
use Core\Http\Http\Response\Json;
use Site\Page\Service\IndexService;

/**
 *
 */
class IndexController extends BaseController
{
    public function indexAction(): Html
    {
        /** @var IndexService $pageService */
        // $pageService = $this->getDi()->make('page.service');

        $params = [
            'title' => 'title'// $pageService->getTitle(),
        ];

        return new Html('page/index.twig', $params, $this);
    }

    public function dataAction(): Json
    {
        return new Json(['ok']);
    }
}
