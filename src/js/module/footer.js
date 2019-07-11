define(['tools'], () => {
    class Footer{
        constructor(){
            this.container = document.querySelector("footer");
            this.load();
        }
        load(){
            tools.ajaxGetPromise("http://localhost:1997/html/modules/footer.html",null,false).then(data => {
                this.container.innerHTML = data;
            })
        }
    }
    return new Footer();
})