// es5
function Bus() {
    this.eventObject = {};
    Bus.prototype.$on = function(name, fn) {
        this.eventObject[name] = this.eventObject[name] || [];
        this.eventObject[name].push(fn);
    }
    Bus.prototype.$emit = function(name, args) {
        if (this.eventObject[name]) {
            this.eventObject[name].forEach(element => {
                element(args);
            });
        }
    }
}

// es6
// class Bus {
//     constructor() {
//         this.callback = {}
//     }
//     $on(name, fn) {
//         this.callback[name] = this.callback[name] || [];
//         this.callback[name].push(fn);
//     }
//     $emit(name, args) {
//         if(this.callback[name]) {
//             this.callback[name].forEach(element => element(args));
//         }
//     }
// }
export default new Bus();