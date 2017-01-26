var footer = {
    activeRegion: null,
    activeTarget: null,
    activeLanguage: null,
    init: function(a) {
        this.container = $(a),
        this.container.on("click", "a.select-region", $.proxy(this.changeRegion, this)),
        this.container.on("click", "a.select-language", $.proxy(this.changeLanguage, this)),
        this.activeRegion = this.container.find(".region-ul .active"),
        this.activeLanguage = this.container.find(".language-ul li.active"),
        this.activeLanguageGroup = this.container.find(".language-ul .active"),
        this.currentRegion = this.container.find(".region-ul .current"),
        this.currentLanguage = this.container.find(".language-ul li.current"),
        this.btn = $(".change-button"),
        this.btn.addClass("disabled")
    },
    disableSelection: function() {
        this.btn.addClass("disabled"),
        this.activeRegion.removeClass("active"),
        this.activeLanguage.removeClass("active"),
        this.activeLanguageGroup.removeClass("active")
    },
    changeRegion: function(a) {
        a.preventDefault(),
        a.stopPropagation();
        var t = $(a.target);
        this.disableSelection(),
        this.btn.attr("href", "javascript:;"),
        this.activeRegion = t.parent(),
        this.activeLanguageGroup = t.parents(".region-language-selector").find("[data-region='" + t.attr("data-target") + "']");
        var e = this.activeLanguageGroup.find("li");
        this.activeLanguageGroup.addClass("active"),
        this.activeRegion.addClass("active"),
        this.activeRegion.hasClass("current") && 0 === e.find("active").length && this.currentLanguage.addClass("active"),
        1 === e.length && (e.addClass("active"),
        this.btn.removeClass("disabled"),
        this.btn.attr("href", e.find("a").attr("href")))
    },
    changeLanguage: function(a) {
        a.preventDefault(),
        a.stopPropagation();
        var t = $(a.target)
          , e = t.attr("href");
        this.activeLanguage.removeClass("active"),
        this.currentLanguage.removeClass("active"),
        this.btn.addClass("disabled"),
        this.btn.attr("href", "javascript:;"),
        this.activeLanguage = t.parent(),
        this.activeLanguage.addClass("active"),
        this.activeLanguage.hasClass("current") || (this.btn.attr("href", e),
        this.btn.removeClass("disabled"))
    }
};
$(function() {
    footer.init(".region-language-selector"),
    $("[data-toggle='collapsible']").on("click", function(a) {
        $(".region-language-collapsible").toggleClass("hidden")
    })
});
