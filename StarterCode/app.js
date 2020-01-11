var jsonFile = ('samples.json');
var names;
var samples;
var metadata;

// function getSampleNames(){
//   var selector = document.getElementById('selDataset');
//   d3.json(jsonFile).then(function(data) {
//     // console.log(data);
//     var names = data.names;
//     var samples = data.samples;
//     var metadata = data.metadata;
//     // console.log(metadata);
//       });
//   };

// getSampleNames();

// function newOption(newSample) {
//   // var selector = d3.select("#selDataset");
//   // changeOption(newSample);
//   metadataUpdate(newSample);
  // barUpdate(newSample);
  // bubbleUpdate(newSample);
// };

function metadataUpdate(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

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
  });
}

function optionChanged(sample) {
  // Fetch new data each time a new sample is selected
  // buildCharts(newSample);
  metadataUpdate(sample);
}

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
//     d3.json(jsonFile).then(function(data) {
//       var labels = []
//       var values = []
//       var hovers = []
//       for(i=0; i<10; i++){
//           var label = data.names;
//           labels.push(label);
//           var value = data.samples.sample_value;
//           values.push(value);
//           var hover = data[2];
//           hovers.push(hover);
//       };
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

// function bubbleUpdate(sample) {
//     d3.json(jsonFile).then(function(data) {
//       var otuIDs = data[2];
//       var sampleValues = data[1]
//       var otuDescriptions = [];
//       for(i=0; i<otuIDs.length; i++) {
//           otuDescriptions.push(response[2][otuIDs[i] - 1]);
//       };
//       var trace = {
//           x: otuIDs,
//           y: sampleValues,
//           mode: 'markers',
//           type: 'scatter',
//           marker: {
//               size: sampleValues,
//               color: otuIDs,
//               colorscale: "Rainbow"
//           },
//           text: otuDescriptions,
//         };
//       var data = [trace]
//       Plotly.newPlot("bubbleChart", data)
//   });
// };

function metadataUpdate(){
    d3.json(jsonFile).then(data => {
    console.log(data.metadata)
      var metaList = document.getElementById('sampleMetadata');
      metaList.innerHTML = '';
      var metaItems = [["ID","id"],["Ethnicity","ethnicity"],["Gender","gender"],["Age","age"],
          ["Weekly Wash Frequency","wfreq"],["Type","bbtype"]];
      console.log(metaList)
      for(i=0; i<metaItems.length; i++){
          var demoList = document.createElement('li');
          demoList.innerHTML = `${metaItems[i][0]}: ${data.metadata[0][metaItems[i][1]]}`;
          console.log(data.metadata[0])
          metaList.appendChild(demoList);
      };
  });
};

// function metadataUpdate(sample) {
//     d3.json(jsonFile).then(function(data) {
//     var metaList = document.getElementById('sampleMetadata');
//     }  
// }

//initialize
changeOption();