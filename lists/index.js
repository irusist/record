function(head, req) {
    var ddoc = this;
    var Mustache = require("lib/mustache");
    var List = require("vendor/couchapp/lib/list");
    var path = require("vendor/couchapp/lib/path").init(req);

    var indexPath = path.list('index','recent-posts',{descending:true, limit:10});
    var homePath = path.list('index','list',{group:true, descending:true, limit:10});

    var username = req.query.name;
    var path_parts = req.path;
  // The provides function serves the format the client requests.
  // The first matching format is sent, so reordering functions changes 
  // thier priority. In this case HTML is the preferred format, so it comes first.
    provides("html", function() {
	var key = "";
    // render the html head using a template
	var stash = {
	    header : {
		index : indexPath,
		blogName : ddoc.blog.title,
		homePath : homePath
	    },
	    scripts : {},
	    db : req.path[0],
	    design : req.path[2],
	    newPostPath : path.show("edit"),
	    assets : path.asset(),
	    records : List.withRows(function(row) {
		var time = row.value;
		key = row.key;
		if (username && key.name != username) {
		    return null;
		}
		return {
		    name : key.name,
		    date : key.date,
		    begin : time.begin,
		    end : time.end,
		    link : path.list('post','post-page', {startkey : [row.id]}),
		};
	    }),
	    older : function() {
		return path.older(key);
	    },
	    "5" : path.limit(5),
	    "10" : path.limit(10),
	    "25" : path.limit(25)
	};
		
	return Mustache.to_html(ddoc.templates.index, stash, ddoc.templates.partials, List.send);
    });
}

























