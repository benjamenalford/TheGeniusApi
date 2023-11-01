let songTable = d3.select("#songs")
let songTableBody = songTable.append("tbody");

d3.json("/api/songs").then(data => {
    // console.log(data);
    //create the header
    let headerRow = d3.select("#songs").select('thead').append('tr')
    Object.keys(data[0]).forEach(key => {
        if (!key.startsWith("_id"))
            headerRow.append('th').text(key)
    })

    data.forEach(element => {
        // console.log(element)
        let newRow = songTableBody.append("tr")
        Object.entries(element).forEach(([key, value]) => {
            console.log(key, value)
            if (!key.startsWith("_id")) {

                if (key == "url") {
                    newRow.append('td').append('a').text('Link').attr('href', value).attr('target', '_blank')
                } else if (key == 'header_image_thumbnail_url') {
                    newRow.append('td').append('img').attr('src', value).attr("class", "thumb");
                }
                else {
                    newRow.append('td').text(value)
                }
            }
        })
    });
})

var fill = d3.scaleOrdinal(d3.schemeCategory10);
d3.json("/api/songs").then(data => {
    let words = data.map(rows => rows.title)

    var layout = d3.layout.cloud()
        .size([500, 500])
        .words(words.map(function (d) {
            return { text: d, size: 10 + Math.random() * 90, test: "haha" };
        }))
        .padding(5)
        .rotate(function () { return ~~(Math.random() * 2) * 90; })
        .font("Impact")
        .fontSize(function (d) { return d.size; })
        .on("end", draw);

    layout.start();

    function draw(words) {
        d3.select("body").append("svg")
            .attr("width", layout.size()[0])
            .attr("height", layout.size()[1])
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function (d) { return d.size + "px"; })
            .style("font-family", "Impact")
            .style("fill", function (d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function (d) { return d.text; });
    }
})
