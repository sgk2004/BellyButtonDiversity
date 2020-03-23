###### BellyButtonDiversity
An interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels.


![](images/bacteria.jpg)


![](images/dashboard.jpg)

###### JavaScript file
app.js

###### HTML file
index.html

###### JSON Data
Data/samples.json

1. Used the D3 library to read in samples.json.


2. Horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

  -sample_values as the values for the bar chart.

  -otu_ids as the labels for the bar chart.

  -otu_labels as the hovertext for the chart.
  
  
  
3. A bubble chart that displays each sample.

  -otu_ids for the x values.

  -sample_values for the y values.

  -sample_values for the marker size.

  -otu_ids for the marker colors.

  -otu_labels for the text values - Each otu_label consists of a taxonomy as follows: Kingdom (or Domain in the case of Archaea); Phylum;        Subphylum; Order; Family; Genus. Extract the last two names (Family and Genus) and use these for the hover text values.
  
  
 4. Displayed the sample metadata, i.e., an individual's demographic information.


 5. Displayed each key-value pair from the metadata JSON object somewhere on the page.
 
 
 6. Plots will be updated any time that a new sample is selected.
 
 
 7. Ploted the weekly washing frequency of the individual.
 
 Deployed the app to a free static page hosting service, GitHub Pages.
 
 ###### Website [Belly Button Biodiversity Dashboard](https://sgk2004.github.io/BellyButtonDiversity/)
 
 



