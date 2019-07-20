function init(){
  dbo.createCollection("classes", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      });
}
