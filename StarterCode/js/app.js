
//     for(i=0; i<metaItems.length; i++){
//         var demoList = document.createElement('li');
//         demoList.innerHTML = `${metaItems[i][0]}: ${data.metadata[0][metaItems[i][1]]}`;
//         console.log(data.metadata[0])
//         metaList.appendChild(demoList);
//     };
// });
// };



function metadataUpdate(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var panel = d3.select("#sample-metadata");
    console.log(panel)
    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  console.log(selector);

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    metadataUpdate(firstSample);
    chartUpdate(firstSample)
    // barUpdate(firstSample);
  });
}

function optionChanged(sample) {
  // Fetch new data each time a new sample is selected
  // buildCharts(newSample);
  metadataUpdate(sample);
};

// Initialize the dashboard
init();



// function changeOption() {
//     // grab the dropdown element
//     var selector = d3.select("#selDataset");
  
//     // Use the List of Sample Names to Populate the Select Options
//     d3.json(jsonFile).then((data) => {
//         data.names.forEach((sample) => {
//         selector
//           .append("option")
//           .text(sample)
//           .property("value", sample);
//       });
  
//       // Use the First Sample from the List to Build Initial Plots
//       var sampleOne = data[0];
//       // var newSample = data[i];
//       // barUpdate(sampleOne);
//       // bubbleUpdate(sampleOne);
//       metadataUpdate(sampleOne);
//     });
//   }

// function changeOption(sample){
//     var dropDown = d3.select('.selDataset')
//         .data()
//         .enter()
//         .append()
//   barUpdate(sample);
//   bubbleUpdate(sample);
//   metadataUpdate(sample);
// };



// function barUpdate(sample) {
//     d3.json("samples.json").then(function(data) {
//       // var labels = []
//       // var values = []
//       // var hovers = []
//       // for(i=0; i<data.length; i++){
//         var label = data.otu_labels;
//           // labels.push(label);
//         labels.slice(0,10);
//         var value = data.sample_values;
//           // values.push(value);
//         values.slice(0,10);
//         var hover = data.otu_ids;
//           // hovers.push(hover);
//         hovers.slice(0,10);
//           console.log(label)
//           console.log(value)
//           console.log(hover)

//       var trace = {
//           x: values,
//           y: `OTU ${names}`,
//           type: "bar",
//           text: hovers
//       };
//       var data = [trace]
//       var layout = {
//           title: 'Prominent OTUs',
//           orientation: 'h'
//           }  
  
//       Plotly.newPlot("barChart", data, layout)
//   });
// };

function chartUpdate(sample) {
    
  // use d3 to fetch the sample data for the plot
  // create a bubble chart with the data
  // create a horizontal bar chart
  // use slice() to grab the top 10 sample_values, otu_ids, and labels
  // console.log(sample)

  d3.json('samples.json').then(function (data) {
    console.log(data);

    
    console.log(sample)
    var otu_ids = data.samples.filter(d => d.id == sample)[0].otu_ids;
    var otu_labels = data.samples.filter(d => d.id == sample)[0].otu_labels;
    var sample_values = data.samples.filter(d => d.id == sample)[0].sample_values;

    // console.log(otu_ids);
    // console.log(otu_labels);
    // console.log(sample_values);

    // bubble chart
    var data = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: 'Earth'
      }
    }];      

    var layout = {
      margin: { t: 0 },
      hovermode: 'closest',
      xaxis: {title: 'OTU ID'},
    };

    Plotly.plot('bubbleChart', data, layout);

    // h-bar chart
    var otu_idsSliced = otu_ids.slice(0, 10).map(d => `OTU ${d}`).reverse();
    var sampleSliced = sample_values.slice(0,10).reverse();
    var trace = {
      type: "bar",
      x: sampleSliced,
      y: otu_idsSliced,
      hovertext: otu_labels,
      orientation: 'h',
      marker: {
        color: 'b(255,153,51,0.6)',
        width: 1
      },
      text: otu_labels
    };
      var data = [trace]
      var layout = {
      title: 'Top 10 Bacteria Cultures Found',
      margin: {t:30, l: 150}
    };
    Plotly.plot('barChart', data, layout)
  });
}


// const defaultURL = "/metadata/<sample>";
// d3.json(defaultURL).then(function (data) {
//   var data = [data];
//   var layout = { margin: { t: 30, b: 100 } };
//   Plotly.plot("bar", data, layout);
// });



// function metadataUpdate(sample) {
//     d3.json(jsonFile).then(function(data) {
//     var metaList = document.getElementById('sampleMetadata');
//     }  
// }