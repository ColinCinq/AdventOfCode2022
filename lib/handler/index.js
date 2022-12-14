Date.prototype.format = function (formatter) {
    if (!formatter) return
    date = this
    let z = {
        M: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds(),
    }
    formatter = formatter.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
        return ((v.length > 1 ? "0" : "") + z[v.slice(-1)]).slice(-2)
    })
    formatter = formatter.replace(/(D+)/g, function (v) {
        return date.toLocaleString(
            "fr-FR",
            v.length > 1 ? {weekday: "long"} : {weekday: "short"}
        )
    })
    formatter = formatter.replace(/(N+)/g, function (v) {
        return date.toLocaleString(
            "fr-FR",
            v.length > 1 ? {month: "long"} : {month: "short"}
        )
    })
    return formatter.replace(/(y+)/g, function (v) {
        return date.getFullYear().toString().slice(-v.length)
    })
}

module.exports = {
    renderIndex: function (req, res) {
        res.render("index.html.twig")
    },
    renderDaily: function (req, res) {
        const day = Number(req.params.day),
            input = req.body.input
        let date = new Date("2022/12/" + day)
        res.render("daily.html.twig", {
            day: day,
            full_date: date.format("D dd NN yyyy"),
            input: input,
        });
    },

    render404: function (req, res) {
        console.log(req.url)
        res.render("404.html.twig")
    },
};
