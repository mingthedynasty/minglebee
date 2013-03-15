var AppRouter = Backbone.Router.extend(
{
	routes: 
	{
		"play": "showPlayProject",
		"work": "showWorkProject",
		"":  "defaultRoute"    // index.html
	}
})