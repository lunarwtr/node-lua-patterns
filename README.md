

# node-lua-patterns

Expose LUA string pattern capabilities to nodejs

(Work in progress)

```nodejs
const [match, d, m, y] = strmatch("04/19/64", "(%d+)/(%d+)/(%d+)");
console.log(`date=${y}-${m}-${d}`);

const [, email] = strmatch("How are you today yourmail@abc.com", "^.-([A-Za-z0-9%.]+@[%a%d]+%.[%a%d]+).-$");
console.log(`email=${email}`);
```

## Links

* https://github.com/node-ffi/node-ffi/wiki/Node-FFI-Tutorial
* https://github.com/node-ffi-napi/node-ffi-napi/tree/master/example/factorial
* https://tootallnate.github.io/ref/#exports-reinterpret