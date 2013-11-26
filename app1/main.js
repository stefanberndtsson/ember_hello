function loadTemplate(url, name, callback) {
    console.log("DEBUG: Loading template");
    var contents = $.get(url, function(templateText) {
	Ember.Handlebars.bootstrap(templateText);
	if (callback) {
	    callback();
	}
    });
}

function init(rootElement) {
    console.log(rootElement);
    loadTemplate("app1/main.hb", "App1-main", function() {
	App1 = Ember.Application.create({
	    rootElement: '#'+rootElement
	});

	App1.ApplicationController = Ember.Controller.extend();
    
	App1.ApplicationView = Ember.View.extend({
	    templateName: 'App1-main'
	});

	App1.Router.map(function() {
	    this.route("about", { path: "/about" });
	    this.route("page", { path: "/page" });
	    this.route("hello", { path: "/hello" });
	});

	App1.AboutView = Ember.View.extend({
	    templateName: 'App1-about'
	});

	App1.PageView = Ember.View.extend({
	    templateName: 'App1-page'
	});

	App1.HelloView = Ember.View.extend({
	    templateName: 'App1-hello'
	});

	App1.IndexView = Ember.View.extend({
	    templateName: 'App1-home'
	});

	App1.HelloController = Ember.Controller.extend({
	    helloStr: "World"
	});
    });
}

var scripts = document.getElementsByTagName( 'script' );
var thisScriptTag = scripts[ scripts.length - 1 ];
init(thisScriptTag.dataset.rootElement);
