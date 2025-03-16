// import { TableOf } from "./TableOf";
// TableOf(123);

import { yarg } from "./config/plugins/args.plugin";
import { ServerApp } from "./presentation/server-app";




// console.log(yarg.b);


// (() => {
//     console.log('ejecutando')
// })();


(async () => {
    await main();
})();


async function main() {

    const { b: base, l: limit, s: showTable, n: name, d: destination } = yarg;

    ServerApp.run({ base, limit, showTable, name, destination });
}




