var express = require("express"),
    twig = require("twig");

exports.applyConfiguration = function (app) {
    app.set("view engine", "twig");
    app.use(express.static("public"));
    app.set("port", process.env.PORT || 8000);
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
};
