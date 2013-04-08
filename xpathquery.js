/**
 * Created with JetBrains WebStorm.
 * User: Gao
 * Date: 13-4-8
 * Time: 21:24
 * To change this template use File | Settings | File Templates.
 */
(function(window,undefined){
    var win = window;
    var supportXPath = document.implementation.hasFeature('XPath', '3.0');
    var Select = function() {
        this.init();
        return this;
    };
    var proxy = function (func, context) {
        var context = context || this;
        return function() {
            func.call(context, arguments)
        }
    };
    var getXPath = function(element) {
        if (element.id !=='')
            return '/'+element.tagName+ '[@id="'+element.id+'"]';
        if (element===document.body)
            return element.tagName;
        var ix= 0;
        var siblings= element.parentNode.childNodes;
        for (var i= 0; i<siblings.length; i++) {
            var sibling= siblings[i];
            if (sibling===element)
                return getXPath(element.parentNode)+'/'+element.tagName+'['+(ix+1)+']';
            if (sibling.nodeType===1 && sibling.tagName===element.tagName)
                ix++;
        }
    }
    var showXPath = function(event) {
        var dom = this;
        alert(getXPath(dom));
        event.stopPropagation();
    }
    var sheet = document.createElement('style');
    var style = document.createTextNode('.Ming-XpathSelected {' +
            'border: 5px solid #000' +
            '-webkit-transform: rotate(5deg);' +
            'transform: rotate(5deg);' +
        '}');
    sheet.appendChild(style);
    document.getElementsByTagName('head')[0].appendChild(sheet);
    var select = {
        "init": function() {
            this.startMouse();
            var dom = document.getElementsByTagName('*');
            for (i in dom) {
                dom[i].style.margin = "5px";
                dom[i].style.border = "5px #fff outset";
                dom[i].style.padding = "5px";
            }
        },
        "startMouse": function () {
            window.addEventListener('mouseover', this.listenMouseOver);
            window.addEventListener('mouseout', this.listenMouseOut);
        },
        "stopMouse": function () {
            window.removeEventListener('mouseover', this.listenMouseOver);
            window.removeEventListener('mouseout', this.listenMouseOut);
        },
        "listenMouseOver": function(event) {
            var dom = event.target;
            // dom.classList.add('Ming-XpathSelected');
            dom.style.border = "5px solid #000";
            dom.addEventListener("dblclick", showXPath);
        },
        "listenMouseOut": function(event) {
            var dom = event.target;
            // dom.classList.remove('Ming-XpathSelected');
            dom.style.border = null
            dom.removeEventListener("dblclick", showXPath);
        }
    };
    select.init();
})(window)