

(function() {
    var root = this;

    function easyExtend(_to, _from) {
        return existy(_from) ? Object.keys(_from).reduce(function(_to, key) {
            _to[key] = _from[key];
            return _to;
        }, _to || Object.create(null)) : _to;
    }

    function existy(obj) {
        return obj != null;
    }

    function filter(keys) {
        var type = typeof keys;
        if (!existy(keys)) return [];
        if (keys instanceof Array) return keys.slice();
        if (type === 'string') return keys.split('.');
        if (type === 'number') return [String(keys)];
        return console.error(new Error('[TryGet: 第 2 个参数若存在，则必须为字符串、数组或数字！]')), [];
    }

    function handler(obj, keys, defaultVal) {
        var key = keys.shift();
        return !existy(obj[key]) ? (defaultVal || void 0 ) : keys.length > 0 ? handler(obj[key], keys, defaultVal) : obj[key];
    }

    function tryGet(obj, keys, defaultVal) {
        return !existy(obj) 
            ? (defaultVal || void 0 )
            : handler(
                easyExtend(Object.create(null), obj), 
                filter(keys)
            );
    }

    function tryRun(obj, keys, args) {
        var keysArr = filter(keys)
        , bindObj = keysArr.length > 1 ? tryGet(obj, keysArr.slice(0, keysArr.length - 1)) : obj
        , fn = tryGet(obj, keysArr);
        return typeof fn === 'function' ? fn.apply(bindObj, args) : void 0;
    }

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = {
                tryGet: tryGet,
                tryRun: tryRun
            };
        }
        exports.tryGet = tryGet;
        exports.tryRun = tryRun;
    } else if (typeof define !== 'undefined') {
        define({
            tryGet: tryGet,
            tryRun: tryRun
        });
    } else {
        root.tryGet = tryGet;
        root.tryRun = tryRun;
    }
}.call(this));
