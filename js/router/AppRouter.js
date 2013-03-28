var AppRouter = Backbone.Router.extend(
{
	routes: 
	{
		"play/:index": "showPlayProject",
		"work/:index": "showWorkProject",
		"":  "defaultRoute"    // index.html
	}
})