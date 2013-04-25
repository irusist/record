function(doc) {
    if (doc.created_at) {
	var d = new Date(doc.created_at);
	emit({"date" : d.getFullYear() + '年' + d.getMonth() + '月' + d.getDate()  + '日', "name" : doc.name}, doc);
    }
}