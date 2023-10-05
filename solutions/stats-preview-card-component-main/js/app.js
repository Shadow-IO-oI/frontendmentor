(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    class DynamicAdapt {
        constructor(type) {
            this.type = type;
        }
        init() {
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = [ ...document.querySelectorAll("[data-da]") ];
            this.nodes.forEach((node => {
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }));
            this.arraySort(this.оbjects);
            this.mediaQueries = this.оbjects.map((({breakpoint}) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)).filter(((item, index, self) => self.indexOf(item) === index));
            this.mediaQueries.forEach((media => {
                const mediaSplit = media.split(",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = this.оbjects.filter((({breakpoint}) => breakpoint === mediaBreakpoint));
                matchMedia.addEventListener("change", (() => {
                    this.mediaHandler(matchMedia, оbjectsFilter);
                }));
                this.mediaHandler(matchMedia, оbjectsFilter);
            }));
        }
        mediaHandler(matchMedia, оbjects) {
            if (matchMedia.matches) оbjects.forEach((оbject => {
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            })); else оbjects.forEach((({parent, element, index}) => {
                if (element.classList.contains(this.daClassname)) this.moveBack(parent, element, index);
            }));
        }
        moveTo(place, element, destination) {
            element.classList.add(this.daClassname);
            if ("last" === place || place >= destination.children.length) {
                destination.append(element);
                return;
            }
            if ("first" === place) {
                destination.prepend(element);
                return;
            }
            destination.children[place].before(element);
        }
        moveBack(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (void 0 !== parent.children[index]) parent.children[index].before(element); else parent.append(element);
        }
        indexInParent(parent, element) {
            return [ ...parent.children ].indexOf(element);
        }
        arraySort(arr) {
            if ("min" === this.type) arr.sort(((a, b) => {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if ("first" === a.place || "last" === b.place) return -1;
                    if ("last" === a.place || "first" === b.place) return 1;
                    return 0;
                }
                return a.breakpoint - b.breakpoint;
            })); else {
                arr.sort(((a, b) => {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if ("first" === a.place || "last" === b.place) return 1;
                        if ("last" === a.place || "first" === b.place) return -1;
                        return 0;
                    }
                    return b.breakpoint - a.breakpoint;
                }));
                return;
            }
        }
    }
    const da = new DynamicAdapt("max");
    da.init();
    const brick = document.querySelector(".brick");
    const previewContent = document.querySelector(".preview__content");
    const mainBlock = document.querySelector(".main-block");
    const previewLeft = document.querySelector(".preview__left");
    const page = document.querySelector(".page__brick");
    const mq = window.matchMedia("(min-width: 767.98px)");
    if (mq.matches) {
        brick.addEventListener("mouseover", (() => {
            mainBlock.style.transform = "translate(-20%, 0px)";
            mainBlock.style.animation = "not-active 0s alternate";
        }));
        brick.addEventListener("mouseout", (() => {
            mainBlock.style.transform = "translate(-35%, 0px)";
            mainBlock.style.animation = "main 1s alternate, not-active 5s alternate 3s infinite";
        }));
        previewContent.addEventListener("click", (() => {
            mainBlock.style.transform = "translate(0%, 0px)";
            mainBlock.style.animation = "none";
            previewLeft.style.transform = "translate(-100%, 0px)";
            page.style.setProperty("--before-width", "100vmin");
            page.style.setProperty("--shadow-position", "-80px");
            brick.addEventListener("mouseout", (() => {
                mainBlock.style.transform = "translate(0%, 0px)";
                mainBlock.style.animation = "none";
            }));
            brick.addEventListener("mouseover", (() => {
                mainBlock.style.transform = "translate(0%, 0px)";
                mainBlock.style.animation = "none";
            }));
        }));
    } else previewContent.addEventListener("click", (() => {
        mainBlock.style.transform = "translate(0%, 0px)";
        mainBlock.style.animation = "none";
        previewLeft.style.transform = "translate(0, 100%)";
    }));
    window.addEventListener("load", windowLoad);
    function windowLoad() {
        const htmlBlock = document.documentElement;
        const saveUserTheme = localStorage.getItem("user-theme");
        let userTheme;
        if (window.matchMedia) userTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e => {
            !saveUserTheme ? changeTheme() : null;
        }));
        const themeButton = document.querySelector(".header__change-theme");
        if (themeButton) themeButton.addEventListener("click", (function(e) {
            changeTheme(true);
        }));
        function setThemeClass() {
            if (saveUserTheme) htmlBlock.classList.add(saveUserTheme); else htmlBlock.classList.add(userTheme);
        }
        setThemeClass();
        function changeTheme(saveTheme = false) {
            let currentTheme = htmlBlock.classList.contains("light") ? "light" : "dark";
            let newTheme;
            if ("light" === currentTheme) newTheme = "dark"; else if ("dark" === currentTheme) newTheme = "light";
            htmlBlock.classList.remove(currentTheme);
            htmlBlock.classList.add(newTheme);
            saveTheme ? localStorage.setItem("user-theme", newTheme) : null;
        }
    }
    window["FLS"] = true;
    isWebp();
})();