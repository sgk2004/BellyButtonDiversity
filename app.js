
function optionChanged(selectedID){
   console.log(selectedID);

// Read the json file
d3.json("data/samples.json").then((data) => {
   // console.log(data); 
   d3.select("#selDataset").html("");    
    // // add ID to the dropdown
   data.metadata.forEach(item =>
        {
         // console.log(item.id);
        d3.select ("#selDataset").append('option').attr('value', item.id).text(item.id);
        });
    
   d3.select("#selDataset").node().value = selectedID;
   
   // Filter Metadata for each Sample selected from drop down
   var idMetadata = data.metadata.filter(item=> (item.id == selectedID));
      // {
      //    console.log("------------------------")
      //    console.log(item);
      //    console.log(item.id);
         
      // });
   console.log(idMetadata);
   
      //Display each key-value pair from the metadata JSON object into <div> class "panel panel-primary".
            var panelDisplay = d3.select("#sample-metadata");
            panelDisplay.html("");
            Object.entries(idMetadata[0]).forEach(item=> 
               {
                  // console.log(item);
                  panelDisplay.append("p").text(`${item[0]}: ${item[1]}`)
               });
      
   
   // Horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
   // Use sample_values as the values for the bar chart.
   // Use otu_ids as the labels for the bar chart.
   // Use otu_labels as the hovertext for the chart.
   var idSample = data.samples.filter(item => parseInt(item.id) == selectedID);
   // console.log(typeof parseInt(item.id));
   // console.log(idSample[0].sample_values);  
   // console.log(idSample[0].otu_ids);  
   // console.log(idSample[0].otu_labels);  

   var sampleValue = idSample[0].sample_values.slice(0,10);
   sampleValue= sampleValue.reverse();
   var otuID = idSample[0].otu_ids.slice(0,10);
   otuID = otuID.reverse();
   var otuLabels = idSample[0].otu_labels
   otuLabels = otuLabels.reverse();
   // console.log(sampleValue);
   // console.log(otuID);
   // console.log(otuLabels);
   
   var yAxis = otuID.map(item => 'OTU' + " " + item);
   
   // console.log(yAxis);
   
      const trace = {
      y: yAxis,
      x: sampleValue,
      type: 'bar',
      orientation: "h",
      text:  otuLabels,
      marker: {
         color: 'rgb(142,124,195)',
         line: {
            width: 3
        }
       }
      },
      layout = {
      title: 'Top 10 OTUs found in the individual',
      xaxis: {title: 'Sample Values'},
      yaxis: {title: 'OTU ids'}
      };
      Plotly.newPlot('bar', [trace], layout,  {responsive: true});            
      

// Bubble chart for each sample.
// Use otu_ids for the x values.
// Use sample_values for the y values.
// Use sample_values for the marker size.
// Use otu_ids for the marker colors.
// Use otu_labels for the text values 
var sampleValue1 =idSample[0].sample_values;
var otuID1= idSample[0].otu_ids;

var trace1 = {
   x: otuID1,
   y: sampleValue1,
   mode: 'markers',
   marker: {
     color: otuID1,
     
     size: sampleValue1
   }
 };
 
 var data = [trace1];
 
 var layout1 = {
   title: 'Bubble chart or each sample',
   showlegend: false,
   height: 800,
   width: 1800
   };
 
 Plotly.newPlot('bubble', data, layout1);

//Gauge Chart to plot the weekly washing frequency of the individual.   
const guageDisplay = d3.select("#gauge");
guageDisplay.html(""); 
const washFreq = idMetadata[0].wfreq;

var guageData = [
   {
     domain: { x: [0, 1], y: [0, 1] },
     value: washFreq,
     title: { text: "Belly Button Washing Frequency <br> Scrubs per week" },
     type: "indicator",
     mode: "gauge+number",
     
   //   text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
   //   textposition: 'inside',
   //   marker: {
   //    colors: ['','','','','','','','','','white'],
   //    labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
   //    hoverinfo: 'label'
   //  },
    
      gauge: {
      axis: { range: [0,9] },
      bar: { color: "d7b5d8" },
      steps: [
         { range: [0, 2], color: "#f2f0f7" },
         { range: [2, 4], color: "#cbc9e2" },
         { range: [4, 6], color: "#9e9ac8" },
         { range: [6, 8], color: "#756bb1" },
         { range: [8, 9], color: "#54278f" }
         
         
         
       ],
      threshold: {
      //    line: { color: "red", width: 4 },
      //    thickness: 0.75,
         value: washFreq
       }
     }
   }
 ];
 
 var gaugeLayout = {  width: 600, 
                  height: 400, 
                  margin: { t: 0, b: 0 }, 
                  // xaxis: {
                  //    // tickmode: "array", 
                  //    tickvals: [0,1,2,3,4,5,6,7,8,9],
                  //    ticktext: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6','6-7','7-8','8-9']}
                   };

 
 Plotly.newPlot('gauge', guageData, gaugeLayout); 

});
}

// Initial page load takes the id 940
optionChanged(940);
d3.select("#selDataset").on('change',() => {
optionChanged(d3.event.target.value);
});