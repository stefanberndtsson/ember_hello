function loadTemplate(url, callback) {
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
    loadTemplate("app1/main.hb", function() {
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
	    this.route("movies", { path: "/movie" });
	    this.route("movie", { path: "/movie/:id" });
	    this.route("persons", { path: "/person" });
	    this.route("person", { path: "/person/:id" });
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

	App1.HelloController = Ember.Controller.extend({
	    helloStr: "World"
	});

	App1.IndexView = Ember.View.extend({
	    templateName: 'App1-home'
	});

	App1.MovieView = Ember.View.extend({
	    templateName: 'App1-movie'
	});

	App1.MovieController = Ember.Controller.extend({
	    movie: {},
	});
	
	App1.MoviesRoute = Ember.Route.extend({
	    beforeModel: function() {
		this.transitionTo('movie', 613907);
	    }
	});

	App1.MovieRoute = Ember.Route.extend({
	    setupController: function(controller, params) {
		controller.set('movie', {});
		this.fetch(params.id, controller);
	    },
	    fetch: function(movie_id, controller) {
		$.ajax({
		    url: "http://nmdb.nocrew.org/movie/"+movie_id+".json?richness=reduced", 
		    cache: false,
		    type: "GET",
		    dataType: "json",
		    contentType: "application/json",
		    success: function(data) {
			controller.set('movie', data.movie);
			console.log("DEBUG: Fetched data...", data);
		    }
		});
	    }
	});

	App1.PersonView = Ember.View.extend({
	    templateName: 'App1-person'
	});

	App1.PersonController = Ember.Controller.extend({
	    person: {},
	    movies: []
	});

	App1.PersonsRoute = Ember.Route.extend({
	    beforeModel: function() {
		this.transitionTo('person', 613907);
	    }
	});

	App1.PersonRoute = Ember.Route.extend({
	    setupController: function(controller, params) {
		controller.set('person', {});
		controller.set('movies', []);
		this.fetch(params.id, controller);
	    },
	    fetch: function(person_id, controller) {
		$.ajax({
		    url: "http://nmdb.nocrew.org/person/"+person_id+".json",
		    cache: false,
		    type: "GET",
		    dataType: "json",
		    contentType: "application/json",
		    success: function(data) {
			controller.set('person', data.person);
			var movies = [];
			data.person.occupations.forEach(function(item) {
			    if(item.character && item.character.match(/(himself|herself|themselves)/i)) {
				return;
			    }
			    if(item.role.role == "actor" || item.role.role == "actress") {
				movies.push(item);
			    }
			});
			controller.set('movies', movies.sort(function(a,b) {
			    return b.movie.movie_sort_value - a.movie.movie_sort_value;
			}));
			console.log("DEBUG: Fetched data...", data);
		    }
		});
	    }
	});

	Ember.Handlebars.registerHelper('index', function(obj) {
	    return obj.data.view.contentIndex+1;
	});
    });
}

var scripts = document.getElementsByTagName( 'script' );
var thisScriptTag = scripts[ scripts.length - 1 ];
init(thisScriptTag.dataset.rootElement);
