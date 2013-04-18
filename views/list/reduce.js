function(keys, values, rereduce) {
    function show(d) {
	var dd = new Date(d);
	return dd.getHours() + ':' + dd.getMinutes() + ':' + dd.getSeconds();
    };

    var begin;
    var end;

    values.sort(function(v1, v2){return new Date(v1.created_at).getTime() - new Date(v2.created_at).getTime()});

    if (values.length > 0) {
	begin = show(values[0].created_at);
	if (values.length > 1) {
	    end = show(values[values.length -1].created_at);
	}

    }
    return {"begin" : begin, "end" : end}
}