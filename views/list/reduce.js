function(keys, values, rereduce) {
    
    if (rereduce){
	log("values:" + toJSON(values))
	var timeArr = [];
	for (var i = 0; i < values.length; i ++) {
	    if (values[i].begin) {
		timeArr.push(values[i].begin);
	    }

	    if (values[i].end) {
		timeArr.push(values[i].end);
	    }
	} 

	var ymd = "1970/01/01 ";
	timeArr.sort(function(t1, t2){return new Date(ymd + t1).getTime() - new Date(ymd + t2).getTime()});
	return {"begin" : timeArr.shift(), "end" : timeArr.pop()}
    }

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
