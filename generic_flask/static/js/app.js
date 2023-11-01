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