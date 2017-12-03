//@externs jquery

import Controller from './controller';


function initController() {
    jQuery(() => {
        const controller = new Controller();
    });
}

window['initController'] = initController;
