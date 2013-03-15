$(function()
{
	var appRouter = new AppRouter();
	var appModel = new AppModel({router: appRouter});

	var appView = new AppView({model: appModel});

	Backbone.history.start();
})