<div>
  <script type="text/x-handlebars" data-template-name="App1-main">
    <div class="container">
      <div class="row">
	<h1 class="well col-md-12">Hello World App</h1>
      </div>
      <div class="row">
	<ul class="nav nav-pills col-sm-2 col-md-1">
	  <li>{{#link-to 'index'}}Home{{/link-to}}</li>
	  <li>{{#link-to 'about'}}About{{/link-to}}</li>
	  <li>{{#link-to 'page'}}Page{{/link-to}}</li>
	  <li>{{#link-to 'hello'}}Hello{{/link-to}}</li>
	  <li>{{#link-to 'movies'}}Movie{{/link-to}}</li>
	</ul>
	<div class="col-sm-10">
	  <div class="container">
	    <div class="row">
	      {{outlet}}
	    </div>
	  </div>
	</div>
      </div>
    </div>
  </script>

  <script type="text/x-handlebars" data-template-name="App1-home">
    <div class="page-header">
      <h2>Foo</h2>
    </div>
    <p>This is the hello world app using ember. Select stuff to the left.</p>
    {{#link-to 'hello' classNames="btn btn-primary"}}Hello World{{/link-to}}
  </script>
  
  <script type="text/x-handlebars" data-template-name="App1-about">
    <div class="page-header">
      <h2>About</h2>
    </div>
    <p>About About About!!</p>
  </script>
  
  <script type="text/x-handlebars" data-template-name="App1-page">
    <div class="page-header">
      <h2>Page</h2>
    </div>
    <p>Page Page Page!!</p>
  </script>
  
  <script type="text/x-handlebars" data-template-name="App1-hello">
    <div class="page-header">
      <h2>Hello {{helloStr}}!</h2>
    </div>
    <p>The ultimate App!</p>
    <form role="form" class="form-inline">
      <div class="form-group">
	<label class="control-label">Edit me here</label>
	{{input valueBinding="helloStr" classNames="form-control"}}
      </div>
    </form>
  </script>
  
  <script type="text/x-handlebars" data-template-name="App1-movie">
    <div class="page-header"><h2>{{movie.full_title}}</h2></div>
    <div>
      {{#each movie.genres}}
      <span class="label label-default">{{genre}}</span>
      {{/each}}
    </div>
    <table class="table">
      <thead>
	<tr>
	  <th></th>
	  <th>Cast</th>
	  <th>Character</th>
	</tr>
      </thead>
      <tbody>
	{{#each movie.cast_members}}
	<tr>
	  <th>{{sort_value}}</th>
	  <td>{{#link-to 'person' person_id}}{{person_name}}{{/link-to}}</td>
	  <td>{{character}}</td>
	</tr>
	{{/each}}
      </tbody>
    </table>
  </script>

  <script type="text/x-handlebars" data-template-name="App1-person">
    <div class="page-header"><h2>{{person.first_name}} {{person.last_name}}</h2></div>
    <table class="table">
      <thead>
	<tr>
	  <th></th>
	  <th>Movie</th>
	  <th>Character</th>
	</tr>
      </thead>
      <tbody>
	{{#each movies}}
	<tr>
	  <th>{{index}}</th>
	  <td>{{#link-to 'movie' movie.id}}{{movie.full_title}}{{/link-to}}</td>
	  <td>{{character}}</td>
	</tr>
	{{/each}}
      </tbody>
    </table>
  </script>
</div>
