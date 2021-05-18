module.exports.init = function (app) {
    // file path with ./filename
    var modules = [
      "./user",
      "./lead"
    ];

    modules.forEach(function (obj) {
      require(obj).init(app);
    });
};
    
  