function ami(modules, mainFunc) {
    var currentModule = 0;
    var context = {};

    if (!Array.isArray(modules)) {
        throw new Error('arg "modules" should be array');
    }
    if (typeof mainFunc !== 'function') {
        throw new Error('mainFunc not a function');
    }

    function next() {
            if (currentModule == modules.length) {
                mainFunc.call(null, context);
            } else {
                var thisModule = currentModule++;
                if(modules[thisModule].init === undefined) {
                    throw new Error('init() does not exist');
                } else {
                    modules[thisModule].init.call(null, context, next);
                }
            }
        }
    // bootstrap
    next();
}

module.exports = ami;
