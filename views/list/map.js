function(doc) {
    if (doc.created_at) {
	var d = new Date(doc.created_at);
	emit({"name": doc.name, "date":d.getFullYear() + '年' + d.getMonth() + '月' + d.getDate()  + '日'},   doc);
    }
}