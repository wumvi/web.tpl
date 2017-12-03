<?php
declare(strict_types=1);

namespace Site\Common;

use Core\Http\RootController;

class BaseController extends RootController
{

    protected function preCallAction(string $method): void
    {

    }

    public function preRender(
        \Twig_Environment $twig,
        \Twig_Loader_Filesystem $loader,
        string &$template,
        array &$variables
    ): void
    {

    }
}
