module.exports.init = function (app) {
    // file path with ./filename
    var modules = [
      "./v1/routes"
    ];

    modules.forEach(function (obj) {
      require(obj).init(app);
    });
};