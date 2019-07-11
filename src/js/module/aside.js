define(['tools','jquery'], () => {
    class Aside{
        constructor(){
            this.container = $("aside");
            this.load();
        }
        load(){
            tools.ajaxGetPromise("http://localhost:1997/html/modules/aside.html",null,false).then(data => {
                this.container.html(data);
            })
        }
    }
    return new Aside();
})